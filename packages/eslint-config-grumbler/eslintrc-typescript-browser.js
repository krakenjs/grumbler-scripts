/* @flow */

// eslint-disable-next-line import/no-commonjs
module.exports = {
  extends: "./eslintrc-typescript",

  rules: {
    "no-process-env": "error",
  },

  env: {
    browser: true,
    es6: true,
  },

  globals: {
    window: true,
    document: true,
    performance: true,
    assert: true,

    __TEST__: true,
    __WEB__: true,
    __ENV__: true,
    __MIN__: true,
    __DEBUG__: true,
    __FILE_NAME__: true,
    __TREE_SHAKE__: true,
    __WINDOW__: true,
    __GLOBAL__: true,
    __LOCAL__: true,
    __STAGE__: true,
    __SANDBOX__: true,
    __PRODUCTION__: true,
    __UID__: true,
  },
};
