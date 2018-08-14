/* @flow */

module.exports = {
    'extends': './.eslintrc.js',

    rules: {
        'import/no-dynamic-require': 'error',
        'no-restricted-globals': [ 'error', 'Promise', 'atob', 'btoa' ],
        'promise/no-native': 'error',
        'import/no-nodejs-modules': 'error',
        'compat/compat': 'error',
        'no-process-env': 'error'
    },

    'globals': {
        'window': true,
        'document': true,
        'Promise': false,
        'performance': true,
        'assert': true,

        '__TEST__': true,
        '__WEB__': true,
        '__ENV__': true,
        '__MIN__': true,
        '__DEBUG__': true,
        '__FILE_NAME__': true
    },
};