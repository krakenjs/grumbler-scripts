// eslint-disable-next-line import/no-commonjs
module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          ie: 11,
          chrome: 27,
          firefox: 30,
          safari: 7,
          opera: 23,
        },
        loose: true,
        modules: false,
        exclude: ["transform-regenerator"],
      },
    ],
    "@babel/preset-react",
    "@babel/preset-flow",
  ],

  plugins: [
    ["@babel/plugin-syntax-dynamic-import", { loose: true }],
    ["@babel/plugin-proposal-decorators", { loose: true, legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-transform-for-of", { assumeArray: true }],
    [
      "@babel/plugin-transform-runtime",
      { corejs: false, helpers: true, regenerator: false, useESModules: true },
    ],
    ["babel-plugin-react-scoped-css", { include: ".scoped.(sa|sc|c)ss$" }],
  ],

  env: {
    test: {
      plugins: [["istanbul", { only: "./src" }]],
    },
  },
};
