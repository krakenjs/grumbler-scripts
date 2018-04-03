Grumbler Scripts
----------------

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
    "release": "npm run release:patch",
    "release:patch": "./node_modules/grumbler-scripts/publish.sh patch",
    "release:minor": "./node_modules/grumbler-scripts/publish.sh minor",
    "release:major": "./node_modules/grumbler-scripts/publish.sh major",
    "clean": "rimraf dist coverage",
    "reinstall": "rimraf flow-typed && rimraf node_modules && npm install && flow-typed install"
}
```

## ESLint

### `.eslintrc.js`

#### Node

```javascript
/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc-node.js'
};
```

#### Browser

```javascript
/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc-browser.js'
};
```

## Babel

### `.babelrc`

#### Node

```json
{
    "extends": "grumbler-scripts/config/.babelrc-node"
}
```

#### Browser

```json
{
    "extends": "grumbler-scripts/config/.babelrc-browser"
}
```

## Webpack

### `webpack.config.js`

```javascript
/* @flow */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

const FILE_NAME = 'mylibrary';
const MODULE_NAME = 'mylibrary';

export let WEBPACK_CONFIG = getWebpackConfig({
    filename:   `${ FILE_NAME }.min.js`,
    modulename: MODULE_NAME,
    minify:     true
});

export default [ WEBPACK_CONFIG ];
```

## Karma

### `karma.conf.js`

```javascript
/* @flow */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

export default (karma : Object) =>
    karma.set(getKarmaConfig(karma, {
        basePath: __dirname,
        webpack:  getWebpackConfig()
    }));
```