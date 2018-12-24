/* @flow */

import { argv } from 'yargs';

import { getWebpackConfig } from './webpack.config';

export function getKarmaConfig(karma : Object, cfg : Object = {}) : Object {

    process.env.NODE_ENV = 'test';

    const debug          = Boolean(argv.debug);
    const quick          = Boolean(argv.quick);
    const captureConsole = Boolean(argv.console);
    const keepOpen       = Boolean(argv['keep-open']) || debug;
    const autoWatch      = Boolean(keepOpen);
    const coverage       = argv.coverage !== false && !quick && !keepOpen;
    const logLevel       = argv['log-level'] || argv.loglevel || (keepOpen ? 'info' : '');
    const headless       = !keepOpen;
    const devTools       = Boolean(argv.devTools);

    // $FlowFixMe
    const browsers : string = argv.browser;

    const karmaConfig : Object = {

        files: [
            {
                pattern:  'test/index.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/**/*.js',
                included: false,
                served:   true
            },

            {
                pattern:  'test/**/*.jsx',
                included: false,
                served:   true
            },

            {
                pattern:  'test/**/*.htm',
                included: false,
                served:   true
            }
        ],

        preprocessors: {
            'test/*.js':             [ 'webpack',  'sourcemap' ],
            'test/*.jsx':            [ 'webpack',  'sourcemap' ],
            'test/windows/**/*.js':  [ 'webpack',  'sourcemap' ],
            'test/windows/**/*.jsx': [ 'webpack',  'sourcemap' ],
            'src/**/*.js':           [ 'coverage', 'sourcemap' ]
        },

        customLaunchers: {

            xChrome: {
                base:  'Chrome',
                flags: [
                    '--no-sandbox',
                    '--disable-gpu',
                    '--remote-debugging-port=9222',
                    '--remote-debugging-address=0.0.0.0',
                    '--enable-precise-memory-info',
                    '--js-flags="--expose-gc"'
                ],
                debug
            }
        },

        reporters: [
            quick ? 'progress' : 'spec'
        ],

        autoWatch,
        logLevel: debug ? karma.LOG_DEBUG : logLevel || karma.LOG_WARN,

        basePath: __dirname,

        frameworks: [
            'mocha',
            'sinon-chai'
        ],

        client: {
            captureConsole,

            mocha: {
                timeout: process.env.TRAVIS ? 60 * 1000 : 10 * 1000,
                bail:    true
            }
        },

        port: 9876,

        colors: true,

        webpackMiddleware: {
            noInfo: !debug,
            stats:  !debug
        },

        browserNoActivityTimeout:   60 * 60 * 1000,
        browserDisconnectTimeout:   30 * 1000,
        browserDisconnectTolerance: 2,
        captureTimeout:             120000,
        reportSlowerThan:           10000,

        browserConsoleLogOptions: {
            level:    debug ? 'debug' : 'error',
            format:   '%b %T: %m',
            terminal: true
        },

        singleRun: !keepOpen,
        
        ...cfg
    };

    if (browsers) {
        karmaConfig.browsers = browsers.split(',');
    } else {
        karmaConfig.browsers = [ 'xChrome' ];
    }

    if (coverage) {
        karmaConfig.reporters.push('coverage');

        karmaConfig.coverageReporter = {
            instrumenterOptions: {
                istanbul: {
                    noCompact: true
                }
            },
            reporters: [
                {
                    type: 'text'
                },
                {
                    type:   'html',
                    dir:    'coverage/',
                    subdir: '.'
                }
            ]
        };
    }
    

    if (headless) {
        karmaConfig.customLaunchers.xChrome.flags.push('--headless');
    }

    if (devTools) {
        karmaConfig.customLaunchers.xChrome.flags.push('--auto-open-devtools-for-tabs');
    }

    if (!karmaConfig.webpack) {
        karmaConfig.webpack = getWebpackConfig();
    }

    return karmaConfig;
}

// eslint-disable-next-line import/no-default-export
export default (karma : Object) =>
    karma.set(getKarmaConfig(karma, {
        basePath: process.cwd()
    }));
