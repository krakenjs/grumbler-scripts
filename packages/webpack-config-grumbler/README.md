## @krakenjs/webpack-config-grumbler

### Installation

```
npm install -D @krakenjs/webpack-config-grumbler
```

### Usage

1. Create a `webpack.config.js` file at the root of your project.
2. Add the following contents to your `webpack.config.js` file:

   ```js
   import { getWebpackConfig } from "@krakenjs/webpack-config-grumbler";

   const FILE_NAME = "mylibrary";
   const MODULE_NAME = "mylibrary";

   export const WEBPACK_CONFIG = getWebpackConfig({
     filename: `${FILE_NAME}.min.js`,
     modulename: MODULE_NAME,
     minify: true,
   });

   export default [WEBPACK_CONFIG];
   ```
