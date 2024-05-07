## @krakenjs/eslint-config-grumbler

This package assumes you are already using [Prettier](https://prettier.io/).

### Installation

```
npm install -D @krakenjs/eslint-config-grumbler
```

### Config Files

- `eslintrc-browser` - browser-based rules + FlowType
- `eslintrc-typescript-browser` - browser-based rules + TypeScript
- `eslintrc-typescript` - TypeScript rules
- `eslintrc-node` - node.js rules

### Usage

1. Create a `.eslintrc.js` file at the root of your package.

2. Identify the type of eslint config to use: node or browser.

3a. For node packages add the following contents to your `.eslintrc.js`:

```
module.exports = {
    extends: "@krakenjs/eslint-config-grumbler/eslint-node",
};
```

3b. For browser packages add the following contents to your `.babelrc`:

```
module.exports = {
    extends: "@krakenjs/eslint-config-grumbler/eslint-browser",
};
```

4. Ensure you have a browserlist configuration in your `package.json`

```
 "browserslist": [
   "IE >= 9",
   "chrome >= 27",
   "firefox >= 30",
   "safari >= 5",
   "opera >= 23"
],
```
