/* @flow */

export const ENV = {
  LOCAL: ("local": "local"),
  STAGE: ("stage": "stage"),
  SANDBOX: ("sandbox": "sandbox"),
  PRODUCTION: ("production": "production"),
  TEST: ("test": "test"),
  DEMO: ("demo": "demo"),
};

declare var __TEST__: boolean;
declare var __WEB__: boolean;
declare var __MIN__: boolean;
declare var __DEBUG__: boolean;
declare var __ENV__: $Values<typeof ENV>;
declare var __TREE_SHAKE__: boolean;

declare var __WINDOW__: any; // eslint-disable-line flowtype/no-weak-types
declare var __GLOBAL__: any; // eslint-disable-line flowtype/no-weak-types

declare var __LOCAL__: boolean;
declare var __STAGE__: boolean;
declare var __SANDBOX__: boolean;
declare var __PRODUCTION__: boolean;

declare var __UID__: string;

export type WebpackConfigOptions = {|
  context?: string,
  entry?: string | $ReadOnlyArray<string>,
  filename?: string,
  modulename?: string,
  minify?: boolean,
  test?: boolean,
  options?: Object,
  vars?: mixed,
  alias?: { [string]: string },
  libraryTarget?: string,
  web?: boolean,
  debug?: boolean,
  env?: string,
  path?: string,
  sourcemaps?: boolean,
  cache?: boolean,
  analyze?: boolean,
  dynamic?: boolean,
  babelConfig?: string,
  publicPath?: string,
|};

export type WebpackConfig = {||};
