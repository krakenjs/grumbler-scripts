# Upgrade Guides

## Upgrade v3 to v4

V4 is intended to be the final release of `grumbler-scripts` which supports the [flow](https://flow.org/) type checker. As part of the transition plan we wanted to update all the dependencies one final time before transitioning. As such v4 will have major version bumps of eslint and it's related packages.


New:
- eslint has been updated to v8 and the `babel-eslint` parser has been moved to `@babel/eslint-parse`.

Steps to update:

1. If you were using a `.babelrc` file for babel configuration please move to `babel.config.json` or any of the other reccomended formats.

```
mv .babelrc babel.config.json
```
