---
"@krakenjs/babel-config-grumbler": patch
"@krakenjs/eslint-config-grumbler": patch
"@krakenjs/grumbler-scripts": patch
"@krakenjs/karma-config-grumbler": patch
"@krakenjs/webpack-config-grumbler": patch
"@krakenjs/typescript-config-grumbler": patch
---

Ensure webpack loaders are required from @krakenjs/webpack-config-grumbler as they will not be guaranteed to be hoisted in complex projects
