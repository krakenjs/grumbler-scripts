/* @flow */

const preset = (): mixed => ({
    presets: ['@babel/preset-flow'],
    overrides: [
        {
            test: ['**/*.ts', '**/*.tsx'],
            presets: ['@babel/preset-typescript'],
        },
    ],
});

// eslint-disable-next-line import/no-default-export
export default preset;
