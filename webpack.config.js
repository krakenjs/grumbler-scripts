/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import { tmpdir } from "os";

import { getWebpackConfig } from "./config/webpack.config";
import type { WebpackConfig } from "./config/types";

export const WEBPACK_CONFIG_TEST: WebpackConfig = getWebpackConfig({
  entry: "./test/module.js",
  libraryTarget: "window",

  path: tmpdir(),
  test: true,
  debug: true,
});

export default WEBPACK_CONFIG_TEST;
