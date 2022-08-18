/* eslint import/no-commonjs:off */

const { tmpdir } = require("os");

const { getWebpackConfig } = require("@krakenjs/webpack-config-grumbler");

const WEBPACK_CONFIG_TEST = getWebpackConfig({
  entry: "./test/module.js",
  libraryTarget: "window",

  path: tmpdir(),
  test: true,
  debug: true,
});

module.exports = WEBPACK_CONFIG_TEST;
