/* @flow */
/* eslint import/no-nodejs-modules: off */

import { join, resolve } from 'path';
import { tmpdir } from 'os';
import { existsSync, mkdirSync } from 'fs';

import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const HARD_SOURCE_CACHE_DIR = join(tmpdir(), 'cache-hard-source');
const BABEL_CACHE_DIR = join(tmpdir(), 'cache-babel');
const UGLIGY_CACHE_DIR = join(tmpdir(), 'cache-uglify');

for (let path of [ HARD_SOURCE_CACHE_DIR, BABEL_CACHE_DIR, UGLIGY_CACHE_DIR ]) {
    if (!existsSync(path)) {
        mkdirSync(path);
    }
}

type JSONPrimitive = string | boolean | number;
type JSONObject = { [string] : JSONPrimitive | JSONObject } | Array<JSONPrimitive | JSONObject>;
type JSONType = JSONObject | JSONPrimitive;

function jsonifyPrimitives(item : JSONType) : JSONType {
    if (Array.isArray(item)) {
        return item.map(jsonifyPrimitives);
    } else if (typeof item === 'object' && item !== null) {
        let result = {};
        for (let key of Object.keys(item)) {
            result[key] = jsonifyPrimitives(item[key]);
        }
        return result;
    } else if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean' || item === null || item === undefined) {
        return JSON.stringify(item);
    } else {
        throw new TypeError(`Unrecognized type: ${ typeof item }`);
    }
}

const DEFAULT_VARS = {
    __TEST__: false,
    __MIN__:  false
};

type WebpackConfigOptions = {
    filename : string,
    modulename : string,
    minify? : boolean,
    test? : boolean,
    options? : Object,
    vars? : { [string] : mixed },
    alias? : { [string] : string }
};

export function getWebpackConfig({ filename, modulename, minify = false, test = (process.env.NODE_ENV === 'test'), options = {}, vars = {}, alias = {} } : WebpackConfigOptions = {}) : Object {

    vars = {
        ...DEFAULT_VARS,
        ...vars
    };

    if (minify) {
        vars.__MIN__ = true;
    } else {
        vars.__MIN__ = false;
    }

    if (test) {
        options.devtool = 'inline-source-map';
        vars.__TEST__ = true;
    } else {
        vars.__TEST__ = false;
    }

    vars.__FILE_NAME__ = filename;

    let plugins = [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        new webpack.DefinePlugin(jsonifyPrimitives(vars)),
        new UglifyJSPlugin({
            test:          /\.js$/,
            uglifyOptions: {
                warnings: false,
                compress: {
                    sequences: minify
                },
                output: {
                    beautify: !minify
                },
                mangle: minify
            },
            parallel:  true,
            sourceMap: true,
            cache:     UGLIGY_CACHE_DIR
        }),
        new CircularDependencyPlugin({
            exclude:     /node_modules/,
            failOnError: true
        })
    ];

    if (!minify) {
        plugins = [
            ...plugins,
            new webpack.NamedModulesPlugin()
        ];
    }

    if (!test) {
        plugins = [
            ...plugins,
            new HardSourceWebpackPlugin({
                cacheDirectory: HARD_SOURCE_CACHE_DIR
            })
        ];
    }
    
    return {

        entry: './src/index.js',

        output: {
            path:           resolve('./dist'),
            filename,
            libraryTarget:  'umd',
            umdNamedDefine: true,
            library:        modulename,
            pathinfo:       false
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
