/* @flow */
/* eslint import/no-nodejs-modules: off, complexity: off */

import { join, resolve, dirname } from 'path';
import { tmpdir } from 'os';
import { existsSync, mkdirSync } from 'fs';

import rimraf from 'rimraf';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const HARD_SOURCE_CACHE_DIR = join(tmpdir(), 'cache-hard-source');
const BABEL_CACHE_DIR = join(tmpdir(), 'cache-babel');
const TERSER_CACHE_DIR = join(tmpdir(), 'cache-terser');
const CACHE_LOADER_DIR = join(tmpdir(), 'cache-loader');

for (const path of [ HARD_SOURCE_CACHE_DIR, BABEL_CACHE_DIR, TERSER_CACHE_DIR, CACHE_LOADER_DIR ]) {
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
    filename? : string,
    modulename? : string,
    minify? : boolean,
    test? : boolean,
    options? : Object,
    vars? : mixed,
    alias? : { [string] : string },
    libraryTarget? : string,
    web? : boolean,
    debug? : boolean,
    env? : string,
    path? : string,
    sourcemaps? : boolean,
    cache? : boolean
|};

export function getWebpackConfig({
    // $FlowFixMe
    entry = './src/index.js',
    filename,
    modulename,
    libraryTarget = 'umd',
    web = true,
    test = (process.env.NODE_ENV === 'test'),
    debug = test,
    minify = !debug,
    options = {},
    vars = {},
    alias = {},
    path = resolve('./dist'),
    env = (test ? 'test' : 'production'),
    sourcemaps = true,
    cache = false
} : WebpackConfigOptions = {}) : Object {
    
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
    const enableMinifier = (web && !test);
    const enableCheckCircularDeps = test;
    const enableCaching = cache && !test;

    const mode = (debug || test)
        ? 'development'
        : 'production';

    let plugins = [
        new webpack.DefinePlugin(jsonifyPrimitives(vars)),
        new webpack.IgnorePlugin(/(types|declarations)/)
    ];

    let optimization;

    if (enableMinifier) {
        optimization = {
            minimizer: [
                new TerserPlugin({
                    test:          /\.js$/,
                    terserOptions: {
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
                    cache:     enableCaching && TERSER_CACHE_DIR
                })
            ]
        };
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
    } else {
        options.devtool = '';
    }

    const globalObject = `(typeof self !== 'undefined' ? self : this)`;

    const rules = [];

    if (enableCaching) {
        rules.push({
            test:    /\.jsx?$/,
            loader:  'cache-loader',
            options: {
                cacheDirectory: CACHE_LOADER_DIR
            }
        });
    }

    rules.push({
        test:   /sinon\.js$/,
        loader: 'imports?define=>false,require=>false'
    });

    rules.push({
        test:    /\.jsx?$/,
        exclude: /(dist)/,
        loader:  'babel-loader',
        options: {
            cacheDirectory: enableCaching && BABEL_CACHE_DIR,
            extends:        join(__dirname, './.babelrc-browser')
        }
    });
    
    rules.push({
        test:   /\.(html?|css|json|svg)$/,
        loader: 'raw-loader'
    });
    
    return {

        mode,
        entry,

        output: {
            path,
            filename,
            libraryTarget,
            globalObject,
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
            rules
        },

        bail: true,

        optimization,
        plugins,

        ...options
    };
}
