import type webpack from "webpack";

type WebpackConfigOptions = {
  context?: string;
  entry?: string | readonly string[];
  filename?: string;
  modulename?: string;
  minify?: boolean;
  test?: boolean;
  options?: Object;
  vars?: Record<string, unknown>;
  alias?: Record<string, string>;
  libraryTarget?: string;
  web?: boolean;
  debug?: boolean;
  env?: string;
  path?: string;
  sourcemaps?: boolean;
  cache?: boolean;
  analyze?: boolean;
  dynamic?: boolean;
  babelConfig?: string;
  publicPath?: string;
};

declare const getWebpackConfig: (
  arg0: WebpackConfigOptions
) => webpack.Configuration;

declare const getNextVersion: (
  pkg: { version: string; [key: string]: unknown },
  level?: string
) => string;
