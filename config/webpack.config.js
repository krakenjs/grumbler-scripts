/* @flow */
/* eslint import/no-nodejs-modules: off, complexity: off */

import { join, resolve, dirname } from 'path';
import { tmpdir } from 'os';
import { existsSync, mkdirSync } from 'fs';

import rimraf from 'rimraf';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const HARD_SOURCE_CACHE_DIR = join(tmpdir(), 'cache-hard-source');
const BABEL_CACHE_DIR = join(tmpdir(), 'cache-babel');
const UGLIGY_CACHE_DIR = join(tmpdir(), 'cache-uglify');

for (const path of [ HARD_SOURCE_CACHE_DIR, BABEL_CACHE_DIR, UGLIGY_CACHE_DIR ]) {
    if (existsSync(path)) {
        rimraf.sync(path);
    }
    mkdirSync(path);
}

function jsonifyPrimitives(item : mixed) : mixed {
    if (Array.isArray(item)) {
        return JSON.stringify(item);
    } else if (typeof item === 'object' && item !== null) {
        if (item.hasOwnProperty('__literal__')) {
            return item.__literal__;
        }
        const result = {};
        for (const key of Object.keys(item)) {
            result[key] = jsonifyPrimitives(item[key]);
        }
        return result;
    } else if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean' || item === null || item === undefined) {
        return JSON.stringify(item);
    } else if (typeof item === 'function') {
        return item();
    } else {
        throw new TypeError(`Unrecognized type: ${ typeof item }`);
    }
}

type WebpackConfigOptions = {|
    entry? : string | $ReadOnlyArray<string>,
    filename : string,
    modulename? : string,
    minify? : boolean,
    test? : boolean,
    options? : Object,
    vars? : mixed,
    alias? : { [string] : string },
    libraryTarget? : string,
    web? : boolean,
    debug? : boolean,
    env : string,
    path? : string,
    sourcemaps? : boolean,
    cache? : boolean
|};

export function getWebpackConfig({
    entry,
    filename,
    modulename,
    libraryTarget = 'umd',
    debug = false,
    web = true,
    minify = !debug,
    test = (process.env.NODE_ENV === 'test'),
    options = {},
    vars = {},
    alias = {},
    path = resolve('./dist'),
    env = (test ? 'test' : 'production'),
    sourcemaps = true,
    cache = false
} : WebpackConfigOptions = {}) : Object {

    entry = entry || './src/index.js';

    vars = {
        ...vars,
        __MIN__:        minify,
        __TEST__:       test,
        __WEB__:        web,
        __FILE_NAME__:  filename,
        __DEBUG__:      debug,
        __ENV__:        env,
        __TREE_SHAKE__: web && !test && !debug,
        __LOCAL__:      env === 'local',
        __STAGE__:      env === 'stage',
        __SANDBOX__:    env === 'sandbox',
        __PRODUCTION__: env === 'production',
        __WINDOW__:     () => 'global',
        __GLOBAL__:     () => 'global',
        global:         (web ? (() => 'window') : (() => 'global'))
    };

    const enableSourceMap = sourcemaps && web && !test;
    const enableInlineSourceMap = enableSourceMap && (test || debug);
    const enableUglify = (web && !test);
    const enableCheckCircularDeps = test;
    const enableCaching = cache && !test;

    const mode = (debug || test)
        ? 'development'
        : 'production';

    let plugins = [
        new webpack.DefinePlugin(jsonifyPrimitives(vars))
    ];

    let optimization;

    if (enableUglify) {
        optimization = {
            minimizer: [
                new UglifyJSPlugin({
                    test:          /\.js$/,
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            sequences: minify,
                            passes:    3
                        },
                        output: {
                            beautify: !minify
                        },
                        mangle: minify
                    },
                    parallel:  true,
                    sourceMap: enableSourceMap,
                    cache:     enableCaching && UGLIGY_CACHE_DIR
                })
            ]
        };
    }

    if (enableSourceMap) {
        plugins = [
            ...plugins,
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            })
        ];
    }

    if (enableCheckCircularDeps) {
        plugins = [
            ...plugins,
            new CircularDependencyPlugin({
                exclude:     /node_modules/,
                failOnError: true
            })
        ];
    }
    
    if (enableCaching) {
        plugins = [
            ...plugins,
            new HardSourceWebpackPlugin({
                cacheDirectory: HARD_SOURCE_CACHE_DIR
            })
        ];
    }

    if (enableInlineSourceMap) {
        options.devtool = 'inline-source-map';
    } else if (enableSourceMap) {
        options.devtool = 'source-map';
    }
    
    return {

        mode,
        entry,

        output: {
            path,
            filename,
            libraryTarget,
            umdNamedDefine: true,
            library:        modulename,
            pathinfo:       false
        },

        node: {
            console:      false,
            global:       false,
            process:      false,
            __filename:   false,
            __dirname:    false,
            Buffer:       false,
            setImmediate: false
        },

        resolve: {
            alias: {
                ...alias,
                'sinon':            'sinon/pkg/sinon.js',
                '@babel/runtime': join(dirname(require.resolve('@babel/runtime/helpers/extends')), '..')
            },
            extensions: [ '.js', '.jsx' ],
            modules:    [
                __dirname,
                'node_modules'
            ]
        },

        module: {
            rules: [
                {
                    test:   /sinon\.js$/,
                    loader: 'imports?define=>false,require=>false'
                },
                {
                    test:    /\.jsx?$/,
                    exclude: /(dist)/,
                    loader:  'babel-loader',
                    options: {
                        cacheDirectory: enableCaching && BABEL_CACHE_DIR,
                        extends:        join(__dirname, './.babelrc-browser')
                    }
                },
                {
                    test:   /\.(html?|css|json|svg)$/,
                    loader: 'raw-loader'
                }
            ]
        },

        bail: true,

        optimization,
        plugins,

        ...options
    };
}
