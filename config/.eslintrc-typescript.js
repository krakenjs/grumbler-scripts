/* @flow */

module.exports = {
    extends: './.eslintrc.js',

    parser: '@typescript-eslint/parser',

    parserOptions: {
        project: ['./tsconfig.json'],
    },

    plugins: ['@typescript-eslint'],

    settings: {
        'import/resolver': {
            typescript: {},
        },
    },

    rules: {
        'no-void': 'off',

        'flowtype/boolean-style': 'off',
        'flowtype/define-flow-type': 'off',
        'flowtype/delimiter-dangle': 'off',
        'flowtype/generic-spacing': 'off',
        'flowtype/no-primitive-constructor-types': 'off',
        'flowtype/no-weak-types': 'off',
        'flowtype/object-type-delimiter': 'off',
        'flowtype/require-parameter-type': 'off',
        'flowtype/require-return-type': 'off',
        'flowtype/require-valid-file-annotation': 'off',
        'flowtype/semi': 'off',
        'flowtype/space-after-type-colon': 'off',
        'flowtype/space-before-generic-bracket': 'off',
        'flowtype/space-before-type-colon': 'off',
        'flowtype/type-id-match': 'off',
        'flowtype/union-intersection-spacing': 'off',
        'flowtype/use-flow-type': 'off',
        'flowtype/valid-syntax': 'off',
        'flowtype/no-dupe-keys': 'off',
        'flowtype/no-types-missing-file-annotation': 'off',
        'flowtype/require-variable-type': 'off',
        'flowtype/sort-keys': 'off',
        'flowtype/no-unused-expressions': 'off',
        'flowtype/array-style-complex-type': 'off',
        'flowtype/array-style-simple-type': 'off',
        'flowtype/newline-after-flow-annotation': 'off',
        'flowtype/no-existential-type': 'off',
        'flowtype/no-flow-fix-me-comments': 'off',
        'flowtype/no-mutable-array': 'off',
        'flowtype/require-exact-type': 'off',
        'flowtype/require-types-at-top': 'off',
        'flowtype/type-import-style': 'off',
        'flowtype/arrow-parens': 'off',
        'flowtype/no-mixed': 'off',
        'flowtype/require-compound-type-alias': 'off',
        'flowtype/require-indexer-name': 'off',
        'flowtype/require-inexact-type': 'off',
        'flowtype/require-readonly-react-props': 'off',
        'flowtype/spread-exact-type': 'off',

        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': ['error', { default: 'generic' }],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-tslint-comment': 'off',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/class-literal-property-style': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports', disallowTypeAnnotations: true },
        ],
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            { multiline: { delimiter: 'comma' }, singleline: { delimiter: 'comma' } },
        ],
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-confusing-void-expression': 'error',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implicit-any-catch': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-type-alias': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unnecessary-qualifier': 'off',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/prefer-literal-enum-member': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/prefer-reduce-type-parameter': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/sort-type-union-intersection-members': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'off',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': ['error', { before: true, after: true }],
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/unbound-method': 'error',
        '@typescript-eslint/unified-signatures': 'error',

        'no-array-constructor': 'off',
        'no-unused-vars': 'off',
        'require-await': 'off',
        'no-shadow': 'off',
        'no-duplicate-imports': 'off',
        'no-use-before-define': 'off',
        semi: 'off',
        'brace-style': 'off',
        'comma-dangle': 'off',
        'comma-spacing': 'off',
        'default-param-last': 'off',
        'dot-notation': 'off',
        'func-call-spacing': 'off',
        indent: 'off',
        'init-declarations': 'off',
        'keyword-spacing': 'off',
        'lines-between-class-members': 'off',
        'no-dupe-class-members': 'off',
        'no-empty-function': 'off',
        'no-extra-parens': 'off',
        'no-extra-semi': 'off',
        'no-implied-eval': 'off',
        'no-invalid-this': 'off',
        'no-loop-func': 'off',
        'no-loss-of-precision': 'off',
        'no-magic-numbers': 'off',
        'no-redeclare': 'off',
        'no-throw-literal': 'off',
        'no-unused-expressions': 'off',
        'no-useless-constructor': 'off',
        'object-curly-spacing': 'off',
        'padding-line-between-statements': 'off',
        quotes: 'off',
        'return-await': 'off',
        'space-before-function-paren': 'off',
        'space-infix-ops': 'off',

        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-duplicate-imports': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/comma-dangle': 'error',
        '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/func-call-spacing': 'off',
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/init-declarations': 'off',
        '@typescript-eslint/keyword-spacing': 'error',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': 'off',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/no-extra-semi': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-invalid-this': 'off',
        '@typescript-eslint/no-loop-func': 'off',
        '@typescript-eslint/no-loss-of-precision': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/padding-line-between-statements': 'off',
        '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }],
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/space-infix-ops': 'error',
    },
};
