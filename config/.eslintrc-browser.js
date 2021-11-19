/* @flow */

module.exports = {
    'extends': './.eslintrc.js',

    rules: {
        'import/no-dynamic-require': 'error',
        'no-restricted-globals': [ 'error', 'Promise' ],
        'promise/no-native': 'error',
        'import/no-nodejs-modules': 'error',
        'compat/compat': 'error',
        'no-process-env': 'error',
        'dont-use-includes': 'error'
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
        '__FILE_NAME__': true,
        '__TREE_SHAKE__': true,
        '__WINDOW__': true,
        '__GLOBAL__': true,
        '__LOCAL__': true,
        '__STAGE__': true,
        '__SANDBOX__': true,
        '__PRODUCTION__': true,
        '__UID__': true
    },
};
