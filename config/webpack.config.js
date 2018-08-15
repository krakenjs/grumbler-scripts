/* @flow */
/* eslint import/no-nodejs-modules: off */

import { join, resolve } from 'path';
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

for (let path of [ HARD_SOURCE_CACHE_DIR, BABEL_CACHE_DIR, UGLIGY_CACHE_DIR ]) {
    if (existsSync(path)) {
        rimraf.sync(path);
    }
    mkdirSync(path);
}

type JSONPrimitive = string | boolean | number;
type JSONObject = { [string] : JSONPrimitive | JSONObject } | Array<JSONPrimitive | JSONObject>;
type JSONType = JSONObject | JSONPrimitive;

function jsonifyPrimitives(item : JSONType) : JSONType {
    if (Array.isArray(item)) {
        return JSON.stringify(item);
    } else if (typeof item === 'object' && item !== null) {
        let result = {};
        for (let key of Object.keys(item)) {
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

type WebpackConfigOptions = {
    entry? : string | Array<string>,
    filename : string,
    modulename : string,
    minify? : boolean,
    test? : boolean,
    options? : Object,
    vars? : { [string] : mixed },
    alias? : { [string] : string },
    libraryTarget? : string,
    web? : boolean,
    debug? : boolean,
    env : string
};

export function getWebpackConfig({
    entry,
    filename,
    modulename,
    libraryTarget = 'umd',
    minify = false,
    web = true,
    debug = false,
    test = (process.env.NODE_ENV === 'test'),
    options = {},
    vars = {},
    alias = {},
    env = (test ? 'test' : 'production')
} : WebpackConfigOptions = {}) : Object {

    entry = entry || './src/index.js';

    vars = {
        ...vars,
        __MIN__:       minify,
        __TEST__:      test,
        __WEB__:       web,
        __FILE_NAME__: filename,
        __DEBUG__:     debug,
        __ENV__:       env
    };

    if (test || debug) {
        options.devtool = 'inline-source-map';
    }

    let plugins = [
        new webpack.DefinePlugin(jsonifyPrimitives(vars))
    ];

    if (web && !test) {
        plugins = [
            ...plugins,
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
                sourceMap: true,
                cache:     UGLIGY_CACHE_DIR
            })
        ];
    }

    if (web) {
        plugins = [
            ...plugins,
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            })
        ];
    }

    if (!minify) {
        plugins = [
            ...plugins,
            new webpack.NamedModulesPlugin()
        ];
    }

    if (test) {
        plugins = [
            ...plugins,
            new CircularDependencyPlugin({
                exclude:     /node_modules/,
                failOnError: true
            })
        ];
    } else {
        plugins = [
            ...plugins,
            new HardSourceWebpackPlugin({
                cacheDirectory: HARD_SOURCE_CACHE_DIR
            })
        ];
    }

    if (!test && !debug) {
        plugins = [
            ...plugins,
            new webpack.optimize.ModuleConcatenationPlugin()
        ];
    }
    
    return {

        entry,

        output: {
            path:           resolve('./dist'),
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
                sinon: 'sinon/pkg/sinon.js'
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
                        cacheDirectory: BABEL_CACHE_DIR
                    }
                },
                {
                    test:   /\.(html?|css|json|svg)$/,
                    loader: 'raw-loader'
                }
            ]
        },

        bail: true,

        devtool: 'source-map',

        plugins,

        ...options
    };
}
