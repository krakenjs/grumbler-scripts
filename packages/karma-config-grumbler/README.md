## @krakenjs/karma-config-grumbler

### Installation

```
npm install -D @krakenjs/karma-config-grumbler
```

### Usage

1. Create a `karma.conf.js` file at the root of your project.
2. Add the following contents to your `karma.conf.js` file:

   ```js
   import { getKarmaConfig } from "@krakenjs/karma-config-grumbler";
   import { getWebpackConfig } from "@krakenjs/webpack-config-grumbler";

   export default (karma) =>
     karma.set(
       getKarmaConfig(karma, {
         basePath: __dirname,
         webpack: getWebpackConfig(),
       })
     );
   ```
