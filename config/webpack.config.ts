/* eslint import/no-nodejs-modules: off, complexity: off */
import { join, resolve, dirname } from 'path';
import { tmpdir } from 'os';
import { existsSync, mkdirSync } from 'fs';

import rimraf from 'rimraf';
import semver from 'semver';
import webpack from 'webpack';
import nodeCleanup from 'node-cleanup';
// @ts-ignore - need to update to ts version
import TerserPlugin from 'terser-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { readdir } from 'fs-extra';
import rmrf from 'rmfr';
import processExists from 'process-exists';

import type { WebpackConfigOptions, WebpackConfig } from './types';

let cacheDirsCreated = false;

const setupCacheDirs = ({ dynamic = false } = {}) => {
    const tmpDir = tmpdir();
    const HARD_SOURCE_CACHE_FOLDER = 'cache-hard-source';
    const BABEL_CACHE_FOLDER = 'cache-babel';
    const TERSER_CACHE_FOLDER = 'cache-terser';
    const CACHE_LOADER_FOLDER = 'cache-loader';
    const folders = [
        HARD_SOURCE_CACHE_FOLDER,
        BABEL_CACHE_FOLDER,
        TERSER_CACHE_FOLDER,
        CACHE_LOADER_FOLDER
    ];
    const id = dynamic ? process.pid.toString() : 'static';
    const HARD_SOURCE_CACHE_DIR = join(tmpDir, `cache-hard-source-${ id }`);
    const BABEL_CACHE_DIR = join(tmpDir, `cache-babel-${ id }`);
    const TERSER_CACHE_DIR = join(tmpDir, `cache-terser-${ id }`);
    const CACHE_LOADER_DIR = join(tmpDir, `cache-loader-${ id }`);
    const dirs = [
        HARD_SOURCE_CACHE_DIR,
        BABEL_CACHE_DIR,
        TERSER_CACHE_DIR,
        CACHE_LOADER_DIR
    ];

    const create = () => {
        if (cacheDirsCreated) {
            return;
        }

        for (const path of dirs) {
            if (!existsSync(path)) {
                mkdirSync(path);
            }
        }

        if (dynamic) {
            nodeCleanup(() => {
                for (const path of dirs) {
                    if (existsSync(path)) {
                        try {
                            rimraf.sync(path);
                        } catch (err) {
                            // pass
                        }
                    }
                }
            });
        }

        (async () => {
            try {
                for (const folder of await readdir(tmpDir)) {
                    const match = folder.match(/^[\w-]+-(\d+)$/);

                    if (!match) {
                        continue;
                    }

                    for (const cacheFolder of folders) {
                        if (folder.indexOf(cacheFolder) !== 0) {
                            continue;
                        }

                        const pid = parseInt(match[1], 10);

                        if (
                            typeof pid !== 'number' ||
                            pid === process.pid ||
                            (await processExists(pid))
                        ) {
                            continue;
                        }

                        try {
                            await rmrf(join(tmpDir, folder));
                        } catch (err) {
                            // eslint-disable-next-line no-console
                            console.error(err);
                        }
                    }
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err);
            }
        })();

        cacheDirsCreated = true;
    };

    create();
    return {
        hardSource:  HARD_SOURCE_CACHE_DIR,
        babel:       BABEL_CACHE_DIR,
        terser:      TERSER_CACHE_DIR,
        cacheLoader: CACHE_LOADER_DIR
    };
};

type JSONifyPrimitivesOptions = {
    autoWindowGlobal : boolean;
};

const getJSONifyPrimitivesOptionsDefault = () : JSONifyPrimitivesOptions => {
    // @ts-ignore - wat is this doing
    return {};
};

function jsonifyPrimitives(
    item : Record<string, unknown>,
    opts : JSONifyPrimitivesOptions = getJSONifyPrimitivesOptionsDefault()
) : Record<string, any> {
    const { autoWindowGlobal = false } = opts;

    if (autoWindowGlobal) {
        if (typeof item !== 'object' || item === null) {
            throw new Error(`Must pass object to use autoWindowGlobal option`);
        }

        if (item.hasOwnProperty('__literal__')) {
            // @ts-ignore - verify what this property is for/does
            return item.__literal__;
        }

        const result = {};

        for (const key of Object.keys(item)) {
            const val = item[key];

            if (typeof val === 'function') {
                // @ts-ignore - verify what this property is for/does
                result[key] = val();
            } else {
                // @ts-ignore - verify what this property is for/does
                result[key] = `(
                    (typeof window !== 'undefined' && ${ JSON.stringify(
        key
    ) } in window)
                        ? window[${ JSON.stringify(key) }]
                        : ${ JSON.stringify(val) || 'undefined' }
                )`;
            }
        }

        return result;
    }

    if (Array.isArray(item)) {
        // @ts-ignore - stringify expects a string like
        return JSON.stringify(item);
    } else if (
        typeof item === 'string' ||
        typeof item === 'number' ||
        typeof item === 'boolean' ||
        item === null ||
        item === undefined
    ) {
        // @ts-ignore - stringify expects a string like
        return JSON.stringify(item);
    } else if (typeof item === 'function') {
        // @ts-ignore - type narrowing not functioning. should be resolved in tsc@5
        return item();
    } else if (typeof item === 'object' && item !== null) {
        if (item.hasOwnProperty('__literal__')) {
            // @ts-ignore - verify what this property is for/does
            return item.__literal__;
        }

        const result = {};

        for (const key of Object.keys(item)) {
            // @ts-ignore - verify this function
            result[key] = jsonifyPrimitives(item[key]);
        }

        return result;
    } else {
        throw new TypeError(`Unrecognized type: ${ typeof item }`);
    }
}

function uniqueID() : string {
    const chars = '0123456789abcdef';
    const randomID = 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
    return randomID;
}

export function getCurrentVersion(pkg : { version : string }) : string {
    return pkg.version.replace(/[^\d]+/g, '_');
}
export function getNextVersion(
    pkg : {
        version : string;
    },
    level = 'patch'
) : string {
    return getCurrentVersion({
        // @ts-ignore - potentially lib type issue
        version: semver.inc(pkg.version, level)
    });
}
export function getWebpackConfig({
    context = process.cwd(),
    entry = './src/index.ts',
    filename,
    modulename,
    libraryTarget = 'umd',
    web = true,
    test = process.env.NODE_ENV === 'test',
    debug = test,
    minify = !test && !debug,
    options = {},
    vars = {},
    alias = {},
    path = resolve('./dist'),
    env = test ? 'test' : 'production',
    sourcemaps = minify,
    cache = false,
    analyze = false,
    dynamic = false,
    // @ts-ignore - property does not exist error
    optimize = env !== 'local',
    babelConfig = join(__dirname, './.babelrc-browser')
} : WebpackConfigOptions = {}) : WebpackConfig {
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
        // @ts-ignore - refine parameter types
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
        __UID__:        uniqueID(),
        global:         web ? () => 'window' : () => 'global'
    };
    const mode = debug || test ? 'development' : 'production';
    const cacheDirs = setupCacheDirs({
        dynamic
    });
    let plugins = [
        new webpack.DefinePlugin(
            // @ts-ignore what is this function
            jsonifyPrimitives(vars, {
                // only use for client-side tests
                autoWindowGlobal: test && web
            })
        )
    ];
    const optimization = optimize
        ? {
            minimize:           true,
            namedModules:       debug,
            concatenateModules: true,
            minimizer:          [
                new TerserPlugin({
                    test:          /\.js$/,
                    terserOptions: {
                        // @ts-ignore - check if this property exists
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
                    // @ts-ignore - check if this property exists
                    sourceMap: enableSourceMap,
                    cache:     enableCaching && cacheDirs.terser
                })
            ]
        }
        : {};

    if (enableCheckCircularDeps) {
        // @ts-ignore - investigate before merge
        plugins = [
            ...plugins,
            new CircularDependencyPlugin({
                exclude:     /node_modules/,
                failOnError: true
            })
        ];
    }

    if (enableCaching && !dynamic) {
        // @ts-ignore - investigate before merge
        plugins = [
            ...plugins,
            new HardSourceWebpackPlugin({
                cacheDirectory: cacheDirs.hardSource
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
            // @ts-ignore - investigate before merge
            ...plugins,
            // @ts-ignore - investigate before merge
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
            test:    /\.m?jsx?$/,
            loader:  'cache-loader',
            options: {
                cacheDirectory: cacheDirs.cacheLoader
            }
        });
    }

    rules.push({
        test:    /.(m?jsx?|tsx?)$/,
        exclude: /(dist)/,
        loader:  'babel-loader',
        options: {
            cacheDirectory: enableCaching && cacheDirs.babel,
            extends:        babelConfig
        }
    });
    rules.push({
        test:   /\.(html?|css|json|svg)$/,
        loader: 'raw-loader'
    });

    const output : Record<string, any> = {
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
                '@babel/runtime': join(
                    dirname(require.resolve('@babel/runtime/helpers/extends')),
                    '..'
                )
            },
            extensions: [ '.js', '.jsx', '.mjs', '.ts', '.tsx' ],
            modules:    [ __dirname, 'node_modules' ]
        },
        module: {
            rules
        },
        bail:  true,
        stats: {
            optimizationBailout: true
        },
        optimization,
        plugins,
        ...options
    };
}
