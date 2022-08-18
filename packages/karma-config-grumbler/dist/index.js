"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.getKarmaConfig = getKarmaConfig;

var _yargs = require("yargs");

var _webpackConfigGrumbler = require("@krakenjs/webpack-config-grumbler");

/* eslint flowtype/require-return-type: off */
function getKarmaConfig(karma, cfg) {
  const {
    testDir = "test",
    windowDir = `${testDir}/windows`,
    entry = `${testDir}/index.js`,
  } = cfg;
  process.env.NODE_ENV = "test";
  const debug = Boolean(_yargs.argv.debug);
  const quick = Boolean(_yargs.argv.quick);
  const captureConsole = Boolean(_yargs.argv.console);
  const keepOpen = Boolean(_yargs.argv["keep-open"]) || debug;
  const autoWatch = Boolean(keepOpen);
  const coverage = _yargs.argv.coverage !== false && !quick && !keepOpen;
  const logLevel =
    _yargs.argv["log-level"] ||
    _yargs.argv.loglevel ||
    (keepOpen ? "info" : "");
  const headless = !keepOpen;
  const devTools = Boolean(_yargs.argv.devTools);
  const browsers = _yargs.argv.browser;
  const karmaConfig = {
    files: [
      {
        pattern: entry,
        included: true,
        served: true,
      },
      {
        pattern: `${testDir}/**/*.js`,
        included: false,
        served: true,
      },
      {
        pattern: `${testDir}/**/*.jsx`,
        included: false,
        served: true,
      },
      {
        pattern: `${testDir}/**/*.htm`,
        included: false,
        served: true,
      },
    ],
    preprocessors: {
      [entry]: ["webpack", "sourcemap"],
      [`${testDir}/*.js`]: ["webpack", "sourcemap"],
      [`${testDir}/*.jsx`]: ["webpack", "sourcemap"],
      [`${windowDir}/**/*.js`]: ["webpack", "sourcemap"],
      [`${windowDir}/**/*.jsx`]: ["webpack", "sourcemap"],
      [`src/**/*.js`]: ["coverage", "sourcemap"],
      [`${testDir}/**/*.ts`]: ["webpack", "sourcemap"],
      [`${testDir}/**/*.tsx`]: ["webpack", "sourcemap"],
      [`${windowDir}/**/*.ts`]: ["webpack", "sourcemap"],
      [`${windowDir}/**/*.tsx`]: ["webpack", "sourcemap"],
      [`src/**/*.ts`]: ["coverage", "sourcemap"],
      [`src/**/*.tsx`]: ["coverage", "sourcemap"],
    },
    customLaunchers: {
      xChrome: {
        base: "Chrome",
        flags: [
          "--no-sandbox",
          "--disable-gpu",
          "--remote-debugging-port=9222",
          "--remote-debugging-address=0.0.0.0",
          "--enable-precise-memory-info",
          '--js-flags="--expose-gc"',
        ],
        debug,
      },
    },
    reporters: [quick ? "progress" : "spec"],
    autoWatch,
    logLevel: debug ? karma.LOG_DEBUG : logLevel || karma.LOG_WARN,
    basePath: __dirname,
    frameworks: ["mocha"],
    client: {
      captureConsole,
      mocha: {
        timeout: process.env.TRAVIS ? 60 * 1000 : 10 * 1000,
        bail: true,
      },
    },
    port: 9876,
    colors: true,
    webpackMiddleware: {
      noInfo: !debug,
      stats: !debug,
    },
    browserNoActivityTimeout: 60 * 60 * 1000,
    browserDisconnectTimeout: 30 * 1000,
    browserDisconnectTolerance: 2,
    captureTimeout: 120000,
    reportSlowerThan: 10000,
    browserConsoleLogOptions: {
      level: debug ? "debug" : "error",
      format: "%b %T: %m",
      terminal: true,
    },
    singleRun: !keepOpen,
    ...cfg,
  };

  if (browsers) {
    karmaConfig.browsers = browsers.split(",");
  } else {
    karmaConfig.browsers = ["xChrome"];
  }

  if (coverage) {
    karmaConfig.reporters.push("coverage");
    karmaConfig.coverageReporter = {
      instrumenterOptions: {
        istanbul: {
          noCompact: true,
        },
      },
      reporters: [
        {
          type: "text",
        },
        {
          type: "lcov",
          dir: "coverage/",
          subdir: ".",
        },
      ],
    };
  }

  if (headless) {
    karmaConfig.customLaunchers.xChrome.flags.push("--headless");
  }

  if (devTools) {
    karmaConfig.customLaunchers.xChrome.flags.push(
      "--auto-open-devtools-for-tabs"
    );
  }

  if (!karmaConfig.webpack) {
    karmaConfig.webpack = (0, _webpackConfigGrumbler.getWebpackConfig)();
  }

  return karmaConfig;
} // eslint-disable-next-line import/no-default-export

var _default = (karma) =>
  karma.set(
    getKarmaConfig(karma, {
      basePath: process.cwd(),
    })
  );

exports.default = _default;
