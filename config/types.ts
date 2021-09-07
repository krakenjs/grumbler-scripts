export type WebpackConfigOptions = {
    context ?: string;
    entry ?: string | ReadonlyArray<string>;
    filename ?: string;
    modulename ?: string;
    minify ?: boolean;
    test ?: boolean;
    options ?: Record<string, any>;
    vars ?: unknown;
    alias ?: Record<string, string>;
    libraryTarget ?: string;
    web ?: boolean;
    debug ?: boolean;
    env ?: string;
    path ?: string;
    sourcemaps ?: boolean;
    cache ?: boolean;
    analyze ?: boolean;
    dynamic ?: boolean;
    babelConfig ?: string;
};

export type WebpackConfig = Record<string, unknown>;
