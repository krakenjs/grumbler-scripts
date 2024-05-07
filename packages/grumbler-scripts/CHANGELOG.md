### 7.0.4 (2022-06-30)

## 8.1.7

### Patch Changes

- Updated dependencies [c108d40]
  - @krakenjs/eslint-config-grumbler@8.2.0

## 8.1.6

### Patch Changes

- Updated dependencies [de4b7a3]
  - @krakenjs/babel-config-grumbler@8.1.2
  - @krakenjs/webpack-config-grumbler@8.1.2
  - @krakenjs/karma-config-grumbler@8.1.2

## 8.1.5

### Patch Changes

- Updated dependencies [409e2fb]
  - @krakenjs/eslint-config-grumbler@8.1.3

## 8.1.4

### Patch Changes

- Updated dependencies [3cb3ad2]
  - @krakenjs/eslint-config-grumbler@8.1.2

## 8.1.3

### Patch Changes

- Updated dependencies [7c0502e]
  - @krakenjs/typescript-config-grumbler@8.1.3

## 8.1.2

### Patch Changes

- Updated dependencies [93a918f]
  - @krakenjs/typescript-config-grumbler@8.1.2

## 8.1.1

### Patch Changes

- 903a199: Update member-ordering eslint rule to default
- Updated dependencies [903a199]
  - @krakenjs/eslint-config-grumbler@8.1.1
  - @krakenjs/babel-config-grumbler@8.1.1
  - @krakenjs/karma-config-grumbler@8.1.1
  - @krakenjs/typescript-config-grumbler@8.1.1
  - @krakenjs/webpack-config-grumbler@8.1.1

## 8.1.0

### Minor Changes

- b8942fd: Add TS types for webpack, and remove comments in babel

### Patch Changes

- Updated dependencies [b8942fd]
  - @krakenjs/webpack-config-grumbler@8.1.0
  - @krakenjs/babel-config-grumbler@8.1.0
  - @krakenjs/eslint-config-grumbler@8.1.0
  - @krakenjs/karma-config-grumbler@8.1.0
  - @krakenjs/typescript-config-grumbler@8.1.0

## 8.0.7

### Patch Changes

- 78074bf: Revert versions of more packages to match grumbler-scripts@7
- Updated dependencies [78074bf]
  - @krakenjs/babel-config-grumbler@8.0.7
  - @krakenjs/webpack-config-grumbler@8.0.7
  - @krakenjs/eslint-config-grumbler@8.0.7
  - @krakenjs/karma-config-grumbler@8.0.7
  - @krakenjs/typescript-config-grumbler@8.0.7

## 8.0.6

### Patch Changes

- fe92b50: Downgrade css-loader to 3.4.2 to avoid visual drifts
- Updated dependencies [fe92b50]
  - @krakenjs/webpack-config-grumbler@8.0.6
  - @krakenjs/babel-config-grumbler@8.0.6
  - @krakenjs/eslint-config-grumbler@8.0.6
  - @krakenjs/karma-config-grumbler@8.0.6
  - @krakenjs/typescript-config-grumbler@8.0.6

## 8.0.5

### Patch Changes

- 4e3cc63: Add typescript-eslint plugins to eslint dependencies
- Updated dependencies [4e3cc63]
  - @krakenjs/babel-config-grumbler@8.0.5
  - @krakenjs/eslint-config-grumbler@8.0.5
  - @krakenjs/karma-config-grumbler@8.0.5
  - @krakenjs/typescript-config-grumbler@8.0.5
  - @krakenjs/webpack-config-grumbler@8.0.5

## 8.0.4

### Patch Changes

- 713430f: Consist filenames for babel configs. All files are `babelrc-*`
- 713430f: Update webpack dependencies to remove flow-bin and include webpack-dev-middleware
- 713430f: Ensure webpack loaders are required from @krakenjs/webpack-config-grumbler as they will not be guaranteed to be hoisted in complex projects
- Updated dependencies [713430f]
- Updated dependencies [713430f]
- Updated dependencies [713430f]
  - @krakenjs/babel-config-grumbler@8.0.4
  - @krakenjs/eslint-config-grumbler@8.0.4
  - @krakenjs/karma-config-grumbler@8.0.4
  - @krakenjs/webpack-config-grumbler@8.0.4
  - @krakenjs/typescript-config-grumbler@8.0.4

## 8.0.3

### Patch Changes

- 8f0ca8c: Fix typo in grumbler-scripts eslint-browser.test.js file reference
- Updated dependencies [8f0ca8c]
  - @krakenjs/babel-config-grumbler@8.0.3
  - @krakenjs/eslint-config-grumbler@8.0.3
  - @krakenjs/karma-config-grumbler@8.0.3
  - @krakenjs/typescript-config-grumbler@8.0.3
  - @krakenjs/webpack-config-grumbler@8.0.3

## 8.0.2

### Patch Changes

- 2cc47d5: fix: update eslint file names in grumbler-scripts main
- Updated dependencies [2cc47d5]
  - @krakenjs/babel-config-grumbler@8.0.2
  - @krakenjs/eslint-config-grumbler@8.0.2
  - @krakenjs/karma-config-grumbler@8.0.2
  - @krakenjs/typescript-config-grumbler@8.0.2
  - @krakenjs/webpack-config-grumbler@8.0.2

## 8.0.1

### Patch Changes

- 92c23cc: Update eslint files to be properly named `eslintrc-*.js` and fix react eslint rules that collide with prettier
- Updated dependencies [92c23cc]
  - @krakenjs/babel-config-grumbler@8.0.1
  - @krakenjs/eslint-config-grumbler@8.0.1
  - @krakenjs/karma-config-grumbler@8.0.1
  - @krakenjs/typescript-config-grumbler@8.0.1
  - @krakenjs/webpack-config-grumbler@8.0.1

## 8.0.0

### Major Changes

- 40ee200: # v8

  We have noticed many of our packages only use webpack, babel, and eslint from `grumbler-scripts`. This means they are pulling all the dependencies of karma/eslint/etc when they arent required. We also have often mentioned we wanted to potentially move to a different linting style after we move to TypeScript. This PR sets us up so `grumbler-scripts` becomes a collection of config packages but still exposes a convenient wrapper `@krakenjs/grumbler-scripts`. The `@krakenjs/grumbler-scripts` is a drop in replacement for v7 so should maintain backwards compatibility.

  - Minimum Node version is now v16 officially
  - Remove `jest`, `babel-jest`, and `cross-env` from dependencies.
  - Allow warning comments now such as `// TODO:`
  - Increase `max-lines` limit to 1000
  - Rewrite TypeScript Eslint rules to match [xo](https://github.com/xojs/xo)
  - Change jsx settings in `tsconfig.json` from `preserve` to `react`
  - Package major upgrades listed in #Package Upgrades below

  - Move from semantic-release to changesets
  - Split out configs into their own packages and utilize npm workspaces
  - Add `package-lock.json` for deterministic installs

  All packages upgraded to latest version that supports webpack@4. Some
  have more updates but dropped webpack@4 support in those updates.
  circular-dependency-plugin ^5.0.2 → ^5.2.2
  css-loader ^3.4.2 → ^5.2.7
  isomorphic-style-loader ^5.1.0 → ^5.3.2
  raw-loader ^4.0.0 → ^4.0.2
  sass ^1.51.0 → ^1.55.0
  semver ^7.1.1 → ^7.3.8
  terser-webpack-plugin ^2.3.2 → ^4.2.3
  text-loader [removed]
  webpack-cli ^3.3.12 → ^4.10.0
  webpack-dev-server ^3.1.14 → ^4.11.1

  ## Babel:

  @babel/eslint-parser ^7.18.2 → ^7.19.1
  @babel/node ^7.0.0 → ^7.20.0
  @babel/plugin-proposal-class-properties ^7.10.4 → ^7.18.6
  @babel/plugin-proposal-decorators ^7.10.5 → ^7.20.0
  @babel/plugin-transform-runtime ^7.11.0 → ^7.19.6
  @babel/preset-flow ^7.10.4 → ^7.18.6
  @babel/preset-typescript 7.16.7 → 7.18.6
  @babel/register ^7.10.5 → ^7.18.9
  @babel/runtime 7.12.13 → 7.20.0
  babel-plugin-add-module-exports ^1.0.0 → ^1.0.4
  babel-plugin-istanbul ^6.0.0 → ^6.1.1
  babel-plugin-react-scoped-css ^1.0.0 → ^1.1.1

  eslint ^8.1.0 → ^8.26.0
  eslint-import-resolver-typescript 2.7.1 → 3.5.2
  eslint-plugin-compat ^4.0.0 → ^4.0.2
  eslint-plugin-import ~2.25.2 → ~2.26.0
  eslint-plugin-promise ^6.0.0 → ^6.1.1
  eslint-plugin-react 7.27.0 → 7.31.10
  eslint-plugin-security ^1.4.0 → ^1.5.0

  - Webpack v5 or potentially investigating esbuild
  - Revisiting of the eslint rules especially as they pertain to TypeScript
  - Removing the build step for esm to cjs in webpack and karma config packages
  - Revisiting the idea of consumer packages installing dependencies vs including them in these packages

### Patch Changes

- Updated dependencies [40ee200]
  - @krakenjs/babel-config-grumbler@8.0.0
  - @krakenjs/eslint-config-grumbler@8.0.0
  - @krakenjs/karma-config-grumbler@8.0.0
  - @krakenjs/typescript-config-grumbler@8.0.0
  - @krakenjs/webpack-config-grumbler@8.0.0

## 8.0.0-next.6

### Patch Changes

- skip version
- Updated dependencies
  - @krakenjs/babel-config-grumbler@8.0.0-next.6
  - @krakenjs/eslint-config-grumbler@8.0.0-next.6
  - @krakenjs/karma-config-grumbler@8.0.0-next.6
  - @krakenjs/typescript-config-grumbler@8.0.0-next.6
  - @krakenjs/webpack-config-grumbler@8.0.0-next.6

## 8.0.0-next.5

### Patch Changes

- cjsify and etc
- Updated dependencies
  - @krakenjs/babel-config-grumbler@8.0.0-next.5
  - @krakenjs/eslint-config-grumbler@8.0.0-next.5
  - @krakenjs/karma-config-grumbler@8.0.0-next.5
  - @krakenjs/typescript-config-grumbler@8.0.0-next.5
  - @krakenjs/webpack-config-grumbler@8.0.0-next.5

## 8.0.0-next.4

### Patch Changes

- Update dependencies across the board
- f20a91c: Update tsconfig to handle jsx syntax from @krakenjs/jsx-pragmatic
- Updated dependencies
- Updated dependencies [f20a91c]
  - @krakenjs/babel-config-grumbler@8.0.0-next.4
  - @krakenjs/eslint-config-grumbler@8.0.0-next.4
  - @krakenjs/karma-config-grumbler@8.0.0-next.4
  - @krakenjs/typescript-config-grumbler@8.0.0-next.4
  - @krakenjs/webpack-config-grumbler@8.0.0-next.4

## 8.0.0-next.3

### Patch Changes

- ea1491e: patch bump for webpack deps
- Updated dependencies [ea1491e]
  - @krakenjs/babel-config-grumbler@8.0.0-next.3
  - @krakenjs/eslint-config-grumbler@8.0.0-next.3
  - @krakenjs/karma-config-grumbler@8.0.0-next.3
  - @krakenjs/typescript-config-grumbler@8.0.0-next.3
  - @krakenjs/webpack-config-grumbler@8.0.0-next.3

## 8.0.0-next.2

### Patch Changes

- dc0ad37: Update eslint rules
- Updated dependencies [dc0ad37]
  - @krakenjs/babel-config-grumbler@8.0.0-next.2
  - @krakenjs/eslint-config-grumbler@8.0.0-next.2
  - @krakenjs/karma-config-grumbler@8.0.0-next.2
  - @krakenjs/typescript-config-grumbler@8.0.0-next.2
  - @krakenjs/webpack-config-grumbler@8.0.0-next.2

## 8.0.0-next.1

### Patch Changes

- Update babel preset to use commonjs
- Updated dependencies
  - @krakenjs/babel-config-grumbler@8.0.0-next.1
  - @krakenjs/eslint-config-grumbler@8.0.0-next.1
  - @krakenjs/flow-config-grumbler@8.0.0-next.1
  - @krakenjs/karma-config-grumbler@8.0.0-next.1
  - @krakenjs/typescript-config-grumbler@8.0.0-next.1
  - @krakenjs/webpack-config-grumbler@8.0.0-next.1

## 8.0.0-next.0

### Major Changes

- 4cc9d5b: 8.0.0-alpha

  - Move to a monorepo structure using npm workspaces
  - Remove flow from build steps
  - Update actions and publishing for use with changesets

### Patch Changes

- Updated dependencies [4cc9d5b]
  - @krakenjs/babel-config-grumbler@8.0.0-next.0
  - @krakenjs/eslint-config-grumbler@8.0.0-next.0
  - @krakenjs/flow-config-grumbler@8.0.0-next.0
  - @krakenjs/karma-config-grumbler@8.0.0-next.0
  - @krakenjs/typescript-config-grumbler@8.0.0-next.0
  - @krakenjs/webpack-config-grumbler@8.0.0-next.0

### Bug Fixes

- update eslint rules with less typescript style ones ([84f58ac](https://github.com/krakenjs/grumbler-scripts/commit/84f58aca2901ea9d956628208e796225523572cc))

### 7.0.3 (2022-06-29)

- update typescript eslint for prettier ([6defee3](https://github.com/krakenjs/grumbler/commit/6defee351ea70d26733b56cf6654bbecfc911d7f))

### 7.0.2 (2022-06-27)

### Bug Fixes

- update eslint packages ([#35](https://github.com/krakenjs/grumbler/issues/35)) ([48f8112](https://github.com/krakenjs/grumbler/commit/48f8112e46c94a5241efc437e4de182559a370cc))

### 7.0.1 (2022-06-01)

- switch to dart sass ([#34](https://github.com/krakenjs/grumbler/issues/34)) ([a6bc4b1](https://github.com/krakenjs/grumbler/commit/a6bc4b162aa8069fbcc97b6218bd038137b15054))

## 7.0.0 (2022-04-21)

### ⚠ BREAKING CHANGES

- deprecate flow-runtime and remove unused packages (#32)

- deprecate flow-runtime and remove unused packages ([#32](https://github.com/krakenjs/grumbler/issues/32)) ([e0d8223](https://github.com/krakenjs/grumbler/commit/e0d822330f2a36f2ac37b6536bf7ff93f863e59a))

### 6.0.2 (2022-03-21)

- pin typescript-eslint to resolve internal issues ([#29](https://github.com/krakenjs/grumbler/issues/29)) ([f9b7f84](https://github.com/krakenjs/grumbler/commit/f9b7f849f0e2d83013343c80d877e6b054c84f9f))

### 6.0.1 (2022-03-08)

- [@krakenjs](https://github.com/krakenjs), standard-release, gh-action to publish ([#28](https://github.com/krakenjs/grumbler/issues/28)) ([9b764db](https://github.com/krakenjs/grumbler/commit/9b764dbe846e7029144f7d16a351d0cfad4f45cc))
