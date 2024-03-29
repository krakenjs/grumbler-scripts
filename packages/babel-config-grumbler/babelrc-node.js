// eslint-disable-next-line import/no-commonjs
module.exports = {
  comments: false,
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "14.0",
        },
        loose: true,
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
  ],

  env: {
    test: {
      plugins: [["istanbul", { only: "./src" }]],
    },
  },
};
