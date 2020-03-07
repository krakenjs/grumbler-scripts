/* @flow */
/* eslint import/no-nodejs-modules: off, complexity: off */

import { join, resolve, dirname } from 'path';
import { tmpdir } from 'os';
import { existsSync, mkdirSync } from 'fs';

import semver from 'semver';
import rimraf from 'rimraf';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const HARD_SOURCE_CACHE_DIR = join(tmpdir(), 'cache-hard-source');
const BABEL_CACHE_DIR = join(tmpdir(), 'cache-babel');
const TERSER_CACHE_DIR = join(tmpdir(), 'cache-terser');
const CACHE_LOADER_DIR = join(tmpdir(), 'cache-loader');

for (const path of [ HARD_SOURCE_CACHE_DIR, BABEL_CACHE_DIR, TERSER_CACHE_DIR, CACHE_LOADER_DIR ]) {
    if (existsSync(path)) {
        rimraf.sync(path);
    }
    if (!existsSync(path)) {
        mkdirSync(path);
    }
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
        // $FlowFixMe
        return item();
    } else {
        throw new TypeError(`Unrecognized type: ${ typeof item }`);
    }
}

export function getCurrentVersion(pkg : {| version : string |}) : string {
    return pkg.version.replace(/[^\d]+/g, '_');
}

export function getNextVersion(pkg : {| version : string |}, level? : string = 'patch') : string {
    return getCurrentVersion({ version: semver.inc(pkg.version, level) });
}

type WebpackConfigOptions = {|
    context? : string,
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
    cache? : boolean,
    analyze? : boolean
|};

export function getWebpackConfig({
    context = process.cwd(),
    // $FlowFixMe
    entry = './src/index.js',
    filename,
    modulename,
    libraryTarget = 'umd',
    web = true,
    test = (process.env.NODE_ENV === 'test'),
    debug = test,
    minify = !test && !debug,
    options = {},
    vars = {},
    alias = {},
    path = resolve('./dist'),
    env = (test ? 'test' : 'production'),
    sourcemaps = true,
    cache = false,
    analyze = false,
    optimize = (env !== 'local')
} : WebpackConfigOptions = {}) : Object {

    const enableSourceMap = sourcemaps && web && !test;
    const enableInlineSourceMap = enableSourceMap && (test || debug);
    const enableCheckCircularDeps = test;
    const enableCaching = cache && !test;
    const enableTreeShake = web && !test && !debug;
    const enableBeautify = debug || test || !minify;
    const enableStyling = true;

    if (filename && !filename.endsWith('.js')) {
        if (minify && !filename.endsWith('.min')) {
            filename = `${ filename }.min`;
        }
        filename = `${ filename }.js`;
    }
    
    vars = {
        ...vars,
        __MIN__:        minify,
        __TEST__:       test,
        __WEB__:        web,
        __FILE_NAME__:  filename,
        __DEBUG__:      debug,
        __ENV__:        env,
        __TREE_SHAKE__: enableTreeShake,
        __LOCAL__:      env === 'local',
        __STAGE__:      env === 'stage',
        __SANDBOX__:    env === 'sandbox',
        __PRODUCTION__: env === 'production',
        __WINDOW__:     () => 'global',
        __GLOBAL__:     () => 'global',
        global:         (web ? (() => 'window') : (() => 'global'))
    };

    const mode = (debug || test)
        ? 'development'
        : 'production';

    let plugins = [
        new webpack.DefinePlugin(jsonifyPrimitives(vars))
    ];

    const optimization = optimize ? {
        minimize:           true,
        namedModules:       debug,
        concatenateModules: true,
        minimizer:          [
            new TerserPlugin({
                test:          /\.js$/,
                terserOptions: {
                    warnings: false,
                    compress: {
                        pure_getters:  true,
                        unsafe_proto:  true,
                        passes:        3,
                        join_vars:     minify,
                        sequences:     minify,
                        drop_debugger: !debug
                    },
                    output: {
                        beautify: enableBeautify
                    },
                    mangle: minify ? true : false
                },
                parallel:  true,
                sourceMap: enableSourceMap,
                cache:     enableCaching && TERSER_CACHE_DIR
            })
        ]
    } : {};

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

    if (analyze) {
        plugins = [
            ...plugins,
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                defaultSizes: 'gzip',
                openAnalyzer: false
            })
        ];
    }

    const globalObject = `(typeof self !== 'undefined' ? self : this)`;

    const rules = [];

    if (enableStyling) {
        rules.push({
            test: /\.scss$/i,
            use:  [
                'isomorphic-style-loader',
                {
                    loader:  'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'scoped-css-loader',
                'sass-loader'
            ]
        });
    }

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

    const output : Object = {
        path,
        filename,
        globalObject,
        umdNamedDefine: true,
        library:        modulename,
        pathinfo:       false
    };

    if (libraryTarget) {
        output.libraryTarget = libraryTarget;
    }
    
    return {

        context,
        mode,
        entry,

        output,

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

        stats: {
            optimizationBailout: true
        },

        optimization,
        plugins,

        ...options
    };
}
