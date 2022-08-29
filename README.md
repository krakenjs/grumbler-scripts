## Grumbler Scripts Monorepo

This is a collection of configuration scripts one can use for their projects.

### Packages Available

Below is a list of available packages to install. To provide a one stop shop we will continue to support `@krakenjs/grumbler-scripts` which is a combination of all the packages. Feel free to use that parent package or install configs as you need.

Each package has its own installation instructions in it's respective README.

- [@krakenjs/babel-config-grumbler](./packages/babel-config-grumbler/README.md)
- [@krakenjs/eslint-config-grumbler](./packages/eslint-config-grumbler/README.md)
- [@krakenjs/flow-config-grumbler](./packages/flow-config-grumbler/README.md)
- [@krakenjs/grumbler-scripts](./packages/grumbler-scripts/README.md)
- [@krakenjs/karma-config-grumbler](./packages/karma-config-grumbler/README.md)
- [@krakenjs/typescript-config-grumbler](./packages/typescript-config-grumbler/README.md)
- [@krakenjs/webpack-config-grumbler](./packages/webpack-config-grumbler/README.md)

### Contributing

#### Tools used

- [changesets](https://github.com/changesets/changesets) for tracking version changes
- [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces/) for monorepo package management
- [prettier](https://prettier.io) for code formatting

#### Steps to make a change

1. Install dependencies:

   ```
   npm install
   ```

2. Make proposed changes
3. Run tests

   ```
   npm test
   ```

4. Add a changeset for versioning

   ```
   npm run changeset:add
   ```

5. Open a new PR

### Releasing

#### Releasing a new latest

To release a new version please leverage Github Actions. There is a release action that can be run to create a new release.

#### Release a new alpha

TODO: document alpha releases
