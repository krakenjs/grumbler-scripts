/* @flow */

export type WebpackConfigOptions = {|
    context? : string,
    entry? : string | $ReadOnlyArray<string>,
    filename? : string,
    modulename? : string,
    minify? : boolean,
    test? : boolean,
    options? : Object,
    vars? : mixed,
    alias? : { [string] : string },
    libraryTarget? : string,
    web? : boolean,
    debug? : boolean,
    env? : string,
    path? : string,
    sourcemaps? : boolean,
    cache? : boolean,
    analyze? : boolean,
    dynamic? : boolean,
    babelConfig? : string
|};

export type WebpackConfig = {||};
