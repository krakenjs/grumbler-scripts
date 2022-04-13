# Upgrade Guides

## Upgrade v3 to v5

Note: An erroneous v4 was published in Jan 2021 so we are skipping v4.

V4 is intended to be the final release of `grumbler-scripts` which supports the [flow](https://flow.org/) type checker. As part of the transition plan we wanted to update all the dependencies one final time before transitioning. As such v4 will have major version bumps of eslint, karma and their related packages.

Breaking:

1. You must ensure you are using Node v12 or greater

2. If you were using a `.babelrc` file for babel configuration please move to `babel.config.json` or any of the other reccomended formats.

```
mv .babelrc babel.config.json
```
