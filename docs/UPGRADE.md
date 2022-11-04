# Upgrade Guides

## Upgrade v7 to v8

- Flow support is slowly being deprecated. We still at this time let `babel` and `webpack` handle files with flow types but we have removed shared flow configs and types.
- If you are using the base package you should be able to upgrade fluidly but you will lose flow type support for the miscellaneous globals we had in the `config/` directory.
- You may need to manually install `jest@27`, `babel-jest@27`, and `cross-env@latest` packages as they are no longer automatically included
- We know expose configs as independent packages as well so users can cherry-pick based on their needs.

## Upgrade to v7

- Deprecated flow-runtime, so if thats in use it is no longer supported.
- Replaced deprecated `node-sass` with the dart based package `sass`. Should be no breaking changes for most users.
- Removed style based linting rules in favor of [Prettier](https://prettier.io). We recommend leveraging the default settings.

## Upgrade to v6

Babel now targets Node 14, upgraded from Node 10.

## Upgrade v3 to v5

Note: An erroneous v4 was published in Jan 2021 so we are skipping v4.

V4 is intended to be the final release of `grumbler-scripts` which supports the [flow](https://flow.org/) type checker. As part of the transition plan we wanted to update all the dependencies one final time before transitioning. As such v4 will have major version bumps of eslint, karma and their related packages.

Breaking:

1. You must ensure you are using Node v12 or greater

2. If you were using a `.babelrc` file for babel configuration please move to `babel.config.json` or any of the other reccomended formats.

```
mv .babelrc babel.config.json
```
