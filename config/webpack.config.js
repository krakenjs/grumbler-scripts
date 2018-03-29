/* @flow */
/* eslint import/no-nodejs-modules: off */

import path from 'path';
import qs from 'querystring';

import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

const DEFAULT_VARS = {
    __TEST__: false,
    __MIN__:  false
};

type WebpackConfigOptions = {
    filename : string,
    modulename : string,
    minify? : boolean,
    options? : Object,
    vars? : { [string] : mixed },
    alias? : { [string] : string }
};

export function getWebpackConfig({ filename, modulename, minify = false, options = {}, vars = {}, alias = {} } : WebpackConfigOptions = {}) : Object {

    vars = {
        ...DEFAULT_VARS,
        ...vars
    };

    const PREPROCESSOR_OPTS = {
        'ifdef-triple-slash': 'false',
        ...vars
    };

    // eslint-disable-next-line no-process-env
    if (process.env.NODE_ENV === 'test') {
        options.devtool = 'inline-source-map';
        vars.__TEST__ = true;
    }

    for (let key of Object.keys(vars)) {
        vars[key] = JSON.stringify(vars[key]);
    }

    return {

        entry: './src/index.js',

        output: {
            path:           path.resolve('./dist'),
            filename,
            libraryTarget:  'umd',
            umdNamedDefine: true,
            library:        modulename,
            pathinfo:       false
        },

        resolve: {
            alias,
            extensions: [ '.js', '.jsx' ],
            modules:    [
                __dirname,
                'node_modules'
            ]
        },

        module: {
            rules: [
                {
                    test:    /\.js$/,
                    loader: `ifdef-loader?${ qs.stringify(PREPROCESSOR_OPTS) }`
                },
                {
                    test:   /sinon\.js$/,
                    loader: 'imports?define=>false,require=>false'
                },
                {
                    test:    /\.jsx?$/,
                    exclude: /(dist)/,
                    loader:  'babel-loader'
                },
                {
                    test:   /\.(html?|css|json|svg)$/,
                    loader: 'raw-loader'
                }
            ]
        },

        bail: true,

        devtool: 'source-map',

        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            }),
            new webpack.DefinePlugin({
                __TEST__: false,
                ...vars
            }),
            new webpack.NamedModulesPlugin(),
            new UglifyJSPlugin({
                test:     /\.js$/,
                beautify: !minify,
                minimize: minify,
                compress: {
                    warnings:  false,
                    sequences: minify
                },
                mangle:    minify,
                sourceMap: true
            }),
            new CircularDependencyPlugin({
                exclude:     /node_modules/,
                failOnError: true
            })
        ],

        ...options
    };
}
