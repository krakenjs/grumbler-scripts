# Typescript

If you aren't yet on v5 see the [upgrade guide](./UPGRADE.md).

_NOTE_: This is experimental and not yet supported.

## Setup Typescript Config in your project

1. Install Typescript linter dependencies. At the time of writing these are using v5.2.0

```shell
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

2. Switch to typescript eslint config.

```
// .eslintrc.js
module.exports = {
    'extends': './node_modules/@krakenjs/grumbler-scripts/config/.eslintrc-typescript.js',
};
```

3. Enable typescript support in babel

```
// babel.config.js
module.exports = {
    'extends': '@krakenjs/grumbler-scripts/config/.babelrc-browser',
    'presets': [ '@krakenjs/grumbler-scripts/config/flow-ts-babel-preset' ]
};
```

4. Set your entry file in karma config

```
/* eslint import/no-default-export: off */

import { getKarmaConfig } from '@krakenjs/grumbler-scripts/config/karma.conf';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(karma : any) {

    const karmaConfig = getKarmaConfig(karma, {
        entry:    'test/index.ts',
        basePath: __dirname,
        webpack:  WEBPACK_CONFIG_TEST
    });

    karma.set(karmaConfig);
}
```

5. Set your entry file in webpack config

```
// webpack.config.js
export const WEBPACK_CONFIG_TEST : WebpackConfig = getWebpackConfig({
    entry:      './src/index.ts',
    modulename: MODULE_NAME,
    options:    {
        devtool: 'inline-source-map'
    },
    vars: {
        __TEST__: true
    }
});
```

6. Add a tsconfig.json

```
{
    "extends": "@krakenjs/typescript-config-grumbler/tsconfig.json"
}
```

7. Setup your new scripts in package.json

```
// package.json
"scripts": {
    "build": "npm run test && npm run babel && npm run webpack && npm run build:tsc",
    "build:tsc": "tsc src/* --outDir dist --declaration --emitDeclarationOnly",
    "webpack": "cross-env NODE_ENV=production babel-node --plugins=transform-es2015-modules-commonjs ./node_modules/.bin/webpack --progress --output-path dist",
    "babel": "cross-env NODE_ENV=production babel src/ --out-dir dist/module --extensions .ts,.tsx",
    "karma": "cross-env NODE_ENV=test babel-node --trace-deprecation --presets '@babel/preset-env' ./node_modules/.bin/karma start",
    "tsc": "tsc",
    "test": "npm run lint && npm run tsc --no-emit && npm run karma",
    "lint": "eslint --ext ts,tsx,js,jsx src/ test/ --fix",
  },
```
