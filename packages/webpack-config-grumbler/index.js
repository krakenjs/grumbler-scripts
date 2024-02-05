/* eslint import/no-nodejs-modules: off, complexity: off, flowtype/require-return-type: off */

import { join, resolve, dirname } from "path";
import { tmpdir } from "os";
import { existsSync, mkdirSync, promises } from "fs";

import rimraf from "rimraf";
import semver from "semver";
import webpack from "webpack";
import nodeCleanup from "node-cleanup";
// only need terser installed if customizing as its oob in v5
// https://github.com/webpack-contrib/terser-webpack-plugin
// TODO: verify configs
import TerserPlugin from "terser-webpack-plugin";
// bundle analyzer seems fine
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
// leaving rmfr one alone for fear of esm but seems duplicative
import rmrf from "rmfr";
// dont upgrade process-exists as sindre switched to esm and we run with babel in cjs still :/
import processExists from "process-exists";

let cacheDirsCreated = false;

const setupCacheDirs = ({ dynamic = false } = {}) => {
  const tmpDir = tmpdir();

  const HARD_SOURCE_CACHE_FOLDER = "cache-hard-source";
  const BABEL_CACHE_FOLDER = "cache-babel";
  const CACHE_LOADER_FOLDER = "cache-loader";

  const folders = [
    HARD_SOURCE_CACHE_FOLDER,
    BABEL_CACHE_FOLDER,
    CACHE_LOADER_FOLDER,
  ];

  const id = dynamic ? process.pid.toString() : "static";

  const HARD_SOURCE_CACHE_DIR = join(tmpDir, `cache-hard-source-${id}`);
  const BABEL_CACHE_DIR = join(tmpDir, `cache-babel-${id}`);
  const CACHE_LOADER_DIR = join(tmpDir, `cache-loader-${id}`);

  const dirs = [HARD_SOURCE_CACHE_DIR, BABEL_CACHE_DIR, CACHE_LOADER_DIR];

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
        for (const folder of await promises.readdir(tmpDir)) {
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
              typeof pid !== "number" ||
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
    hardSource: HARD_SOURCE_CACHE_DIR,
    babel: BABEL_CACHE_DIR,
    cacheLoader: CACHE_LOADER_DIR,
  };
};

/**
 * @typedef {Object} JSONifyPrimitivesOptions - creates a new type named 'SpecialType'
 * @property {boolean} autoWindowGlobal
 */

/**
 * default state
 * @returns object
 */
const getJSONifyPrimitivesOptionsDefault = () => {
  return {};
};

/**
 *
 * @param {unknown} item
 * @param {JSONifyPrimitivesOptions=} opts
 * @returns object
 */
function jsonifyPrimitives(item, opts = getJSONifyPrimitivesOptionsDefault()) {
  const { autoWindowGlobal = false } = opts;

  if (autoWindowGlobal) {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Must pass object to use autoWindowGlobal option`);
    }

    if (item.hasOwnProperty("__literal__")) {
      return item.__literal__;
    }

    const result = {};

    for (const key of Object.keys(item)) {
      const val = item[key];

      if (typeof val === "function") {
        result[key] = val();
      } else {
        result[key] = `(
                    (typeof window !== 'undefined' && ${JSON.stringify(
                      key
                    )} in window)
                        ? window[${JSON.stringify(key)}]
                        : ${JSON.stringify(val) || "undefined"}
                )`;
      }
    }

    return result;
  }

  if (Array.isArray(item)) {
    return JSON.stringify(item);
  } else if (
    typeof item === "string" ||
    typeof item === "number" ||
    typeof item === "boolean" ||
    item === null ||
    item === undefined
  ) {
    return JSON.stringify(item);
  } else if (typeof item === "function") {
    // $FlowFixMe
    return item();
  } else if (typeof item === "object" && item !== null) {
    if (item.hasOwnProperty("__literal__")) {
      return item.__literal__;
    }
    const result = {};
    for (const key of Object.keys(item)) {
      result[key] = jsonifyPrimitives(item[key]);
    }
    return result;
  } else {
    throw new TypeError(`Unrecognized type: ${typeof item}`);
  }
}

/**
 *
 * @returns string
 */
function uniqueID() {
  const chars = "0123456789abcdef";

  const randomID = "xxxxxxxxxx".replace(/./g, () => {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  });

  return randomID;
}

/**
 *
 * @param {{version: string}} pkg
 * @param {*} string
 * @param {string}
 * @returns
 */
export function getCurrentVersion(pkg) {
  return pkg.version.replace(/[^\d]+/g, "_");
}

/**
 *
 * @param {{version: string}} pkg
 * @param {level=} string
 * @returns string
 */
export function getNextVersion(pkg, level = "patch") {
  return getCurrentVersion({ version: semver.inc(pkg.version, level) });
}

export function getWebpackConfig({
  context = process.cwd(),
  entry = "./src/index.js",
  filename,
  modulename,
  libraryTarget = "umd",
  web = true,
  test = process.env.NODE_ENV === "test",
  debug = test,
  minify = !test && !debug,
  options = {},
  vars = {},
  alias = {},
  path = resolve("./dist"),
  env = test ? "test" : "production",
  sourcemaps = minify,
  cache = false,
  analyze = false,
  dynamic = false,
  optimize = env !== "local",
  babelConfig = "@krakenjs/babel-config-grumbler/babelrc-browser",
  publicPath,
} = {}) {
  const enableSourceMap = sourcemaps && web && !test;
  const enableInlineSourceMap = enableSourceMap && (test || debug);
  const enableCaching = cache && !test;
  const enableTreeShake = web && !test && !debug;
  const enableBeautify = debug || test || !minify;
  const enableStyling = true;

  if (filename && !filename.endsWith(".js")) {
    if (minify && !filename.endsWith(".min")) {
      filename = `${filename}.min`;
    }
    filename = `${filename}.js`;
  }

  vars = {
    ...vars,
    __MIN__: minify,
    __TEST__: test,
    __WEB__: web,
    __FILE_NAME__: filename,
    __DEBUG__: debug,
    __ENV__: env,
    __TREE_SHAKE__: enableTreeShake,
    __LOCAL__: env === "local",
    __STAGE__: env === "stage",
    __SANDBOX__: env === "sandbox",
    __PRODUCTION__: env === "production",
    __WINDOW__: () => "global",
    __GLOBAL__: () => "global",
    __UID__: uniqueID(),
    global: web ? () => "window" : () => "global",
  };

  const mode = debug || test ? "development" : "production";

  const cacheDirs = setupCacheDirs({ dynamic });

  let plugins = [
    new webpack.DefinePlugin(
      jsonifyPrimitives(vars, {
        // only use for client-side tests
        autoWindowGlobal: test && web,
      })
    ),
  ];

  const optimization = optimize
    ? {
        minimize: true,
        moduleIds: debug ? "named" : false,
        concatenateModules: true,
        minimizer: [
          new TerserPlugin({
            test: /\.js$/,
            parallel: true,
            terserOptions: {
              warnings: false,
              compress: {
                pure_getters: true,
                unsafe_proto: true,
                passes: 3,
                join_vars: minify,
                sequences: minify,
                drop_debugger: !debug,
              },
              output: {
                beautify: enableBeautify,
              },
              mangle: minify ? true : false,
            },
          }),
        ],
      }
    : {};

  // if (enableCaching && !dynamic) {
  // plugins = [
  // ...plugins,
  // new HardSourceWebpackPlugin({
  // cacheDirectory: cacheDirs.hardSource,
  // }),
  // ];
  // }

  if (enableInlineSourceMap) {
    options.devtool = "inline-source-map";
  } else if (enableSourceMap) {
    options.devtool = "source-map";
  }

  if (analyze) {
    plugins = [
      ...plugins,
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        defaultSizes: "gzip",
        openAnalyzer: false,
      }),
    ];
  }

  const globalObject = `(typeof self !== 'undefined' ? self : this)`;

  const rules = [];

  if (enableStyling) {
    rules.push({
      test: /\.scss$/i,
      use: [
        "isomorphic-style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
          },
        },
        "scoped-css-loader",
        "sass-loader",
      ],
    });
  }

  let cacheConfig = false;

  if (enableCaching) {
    cacheConfig = {
      type: "filesystem",
      cacheDirectory: cacheDirs.cacheLoader,
      buildDependencies: {
        config: [__filename],
      },
    };
    // cache-loader deprecated
    // rules.push({
    // test: /\.m?(j|t)sx?$/,
    // loader: "cache-loader",
    // options: {
    // cacheDirectory: cacheDirs.cacheLoader,
    // },
    // });
  }

  rules.push({
    test: /\.m?(j|t)sx?$/,
    exclude: /(dist)/,
    // TODO: it appears we need to run `npm install -D babel-loader` in sdk-client when i upgraded to v9.1.3. confusing but still works.
    loader: "babel-loader",
    options: {
      cacheDirectory: enableCaching && cacheDirs.babel,
      extends: babelConfig,
    },
  });

  // TODO: move to assets module
  // https://webpack.js.org/guides/asset-modules/
  rules.push({
    test: /\.(html?|css|json|svg)$/,
    // loader: "raw-loader",
    loader: "asset/source",
  });

  const output = {
    path,
    filename,
    globalObject,
    umdNamedDefine: true,
    library: modulename,
    pathinfo: false,
    publicPath,
  };

  if (libraryTarget) {
    output.libraryTarget = libraryTarget;
  }

  return {
    context,
    mode,
    entry,

    cache: cacheConfig,

    output,

    node: {
      global: false,
      __filename: false,
      __dirname: false,
    },

    resolve: {
      alias: {
        ...alias,
        "@babel/runtime": join(
          dirname(require.resolve("@babel/runtime/helpers/extends")),
          ".."
        ),
      },
      extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"],
      modules: [__dirname, "node_modules"],
    },

    module: {
      rules,
    },

    bail: true,

    stats: {
      optimizationBailout: true,
    },

    optimization,
    plugins,

    ...options,
  };
}
