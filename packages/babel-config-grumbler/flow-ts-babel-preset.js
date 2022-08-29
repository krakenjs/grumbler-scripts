const preset = () => ({
  presets: ["@babel/preset-flow"],
  overrides: [
    {
      test: ["**/*.ts", "**/*.tsx"],
      presets: ["@babel/preset-typescript"],
    },
  ],
});

// eslint-disable-next-line import/no-commonjs
module.exports = preset;
