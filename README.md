## Grumbler Scripts

```
npm install @krakenjs/grumbler-scripts
```

Shared scripts for grumbler based modules.

## Package.json scripts

```json
"scripts": {
    "lint": "eslint src/ test/ *.js",
    "flow-typed": "flow-typed install",
    "flow": "flow",
    "flow:build": "flow gen-flow-files ./src/index.js --out-dir ./dist/module",
    "karma": "cross-env NODE_ENV=test babel-node --plugins=transform-es2015-modules-commonjs ./node_modules/.bin/karma start",
    "babel": "babel src/ --out-dir dist/module",
    "webpack": "babel-node --plugins=transform-es2015-modules-commonjs ./node_modules/.bin/webpack --progress",
    "test": "npm run lint && npm run flow-typed && npm run flow && npm run karma",
    "build": "npm run test && npm run babel && npm run webpack && npm run flow:build",
    "clean": "rimraf dist coverage",
    "reinstall": "rimraf flow-typed && rimraf node_modules && npm install && flow-typed install"
}
```

## ESLint

### `.eslintrc.js`

## Prettier

Eslint rules have no style preferences as we assume usage of [Prettier](https://prettier.io/). It is reccomended to use githooks to enforce style through Prettier. You can see documentation for how to do that [here](https://prettier.io/docs/en/install.html#git-hooks)

We recommend running on precommit hooks as well as running `prettier --check .` on CI to ensure no one is skipping the githooks.

#### Node

```javascript
/* @flow */

module.exports = {
    extends: './node_modules/@krakenjs/grumbler-scripts/config/.eslintrc-node.js',
};
```

#### Browser

```javascript
/* @flow */

module.exports = {
    extends: './node_modules/@krakenjs/grumbler-scripts/config/.eslintrc-browser.js',
};
```

## Babel

### `.babelrc`

#### Node

```json
{
    "extends": "@krakenjs/grumbler-scripts/config/.babelrc-node"
}
```

#### Browser

```json
{
    "extends": "@krakenjs/grumbler-scripts/config/.babelrc-browser"
}
```

## Webpack

### `webpack.config.js`

```javascript
/* @flow */

import { getWebpackConfig } from '@krakenjs/grumbler-scripts/config/webpack.config';

const FILE_NAME = 'mylibrary';
const MODULE_NAME = 'mylibrary';

export let WEBPACK_CONFIG = getWebpackConfig({
    filename: `${FILE_NAME}.min.js`,
    modulename: MODULE_NAME,
    minify: true,
});

export default [WEBPACK_CONFIG];
```

## Karma

### `karma.conf.js`

```javascript
/* @flow */

import { getKarmaConfig } from '@krakenjs/grumbler-scripts/config/karma.conf';
import { getWebpackConfig } from '@krakenjs/grumbler-scripts/config/webpack.config';

export default (karma: Object) =>
    karma.set(
        getKarmaConfig(karma, {
            basePath: __dirname,
            webpack: getWebpackConfig(),
        })
    );
```
