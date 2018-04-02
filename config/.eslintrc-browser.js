/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc.js',

    rules: {
        'import/no-dynamic-require': 'error',
        'no-restricted-globals': [ 'error', 'Promise', 'atob', 'btoa' ],
        'promise/no-native': 'error',
        'import/no-nodejs-modules': 'error',
        'compat/compat': 'error',
        'no-process-env': 'error'
    }
};