/* @flow */
/* eslint import/no-commonjs: "off", max-lines: "off" */

module.exports = {

    'parser': '@babel/eslint-parser',

    'plugins': [
        'flowtype',
        'compat',
        'unicorn',
        'eslint-comments',
        'promise',
        'security',
        'import',
        'const-immutable',
        'react'
    ],

    'env': {
        'browser': true,
        'node':    true,
        'amd':     false,
        'mocha':   true,
        'es6':     true
    },

    'settings': {
        'import/extensions': [ '.js', '.jsx' ],
        'import/resolver':   {
            'node': {
                'extensions': [ '.js', '.jsx' ]
            }
        },
        'react': {
            'version': '16.0'
        }
    },

    'parserOptions': {
        'ecmaVersion':       2017,
        'requireConfigFile': false,
        'sourceType':        'module',

        'ecmaFeatures': {
            'jsx': true
        }
    },

    'globals': {
        '$Values':        true,
        '$ReadOnlyArray': true,
        '$PropertyType':  true,
        '$TupleMap':      true,
        '$ObjMap':        true
    },

    'rules': {
        'comma-dangle':                     'error',
        'no-cond-assign':                   'error',
        'no-console':                       'error',
        'no-constant-condition':            'error',
        'no-control-regex':                 'error',
        'no-debugger':                      'error',
        'no-dupe-args':                     'error',
        'no-dupe-keys':                     'error',
        'no-duplicate-case':                'error',
        'no-empty-character-class':         'error',
        'no-empty':                         'error',
        'no-ex-assign':                     'error',
        'no-extra-boolean-cast':            'error',
        'no-extra-parens':                  'off',
        'no-extra-semi':                    'error',
        'no-func-assign':                   'error',
        'no-inner-declarations':            [ 'error', 'functions' ],
        'no-invalid-regexp':                'error',
        'no-irregular-whitespace':          'error',
        'no-negated-in-lhs':                'error',
        'no-obj-calls':                     'error',
        'no-regex-spaces':                  'error',
        'no-sparse-arrays':                 'error',
        'no-unexpected-multiline':          'error',
        'no-unreachable':                   'error',
        'quote-props':                      [ 'error', 'consistent', { 'numbers': true } ],
        'use-isnan':                        'error',
        'valid-jsdoc':                      'off',
        'valid-typeof':                     'error',
        'no-misleading-character-class':    'error',
        'require-atomic-updates':           'error',
        'require-unicode-regexp':           'off',
        'accessor-pairs':                   'off',
        'array-callback-return':            'error',
        'block-scoped-var':                 'error',
        'complexity':                       [ 'error', 20 ],
        'consistent-return':                'off',
        'curly':                            [ 'error', 'all' ],
        'default-case':                     'error',
        'dot-location':                     'off',
        'dot-notation':                     'error',
        'eqeqeq':                           'error',
        'guard-for-in':                     'error',
        'no-alert':                         'error',
        'no-caller':                        'error',
        'no-case-declarations':             'error',
        'no-div-regex':                     'error',
        'no-else-return':                   'off',
        'no-empty-function':                'error',
        'no-empty-pattern':                 'error',
        'no-eq-null':                       'error',
        'no-eval':                          'error',
        'no-extend-native':                 'error',
        'no-extra-bind':                    'error',
        'no-extra-label':                   'error',
        'no-fallthrough':                   'error',
        'no-floating-decimal':              'error',
        'no-implicit-coercion':             'error',
        'no-implicit-globals':              'error',
        'no-implied-eval':                  'error',
        'no-invalid-this':                  'off',
        'no-iterator':                      'error',
        'no-labels':                        'error',
        'no-lone-blocks':                   'error',
        'no-loop-func':                     'off',
        'no-magic-numbers':                 'off',
        'no-multi-spaces':                  'off',
        'no-multi-str':                     'error',
        'no-native-reassign':               'error',
        'no-new-func':                      'error',
        'no-new-wrappers':                  'error',
        'no-new':                           'error',
        'no-octal-escape':                  'error',
        'no-octal':                         'error',
        'no-param-reassign':                'off',
        'no-process-env':                   'off',
        'no-proto':                         'error',
        'no-redeclare':                     'error',
        'no-return-assign':                 'error',
        'no-script-url':                    'error',
        'no-self-assign':                   'error',
        'no-self-compare':                  'error',
        'no-sequences':                     'error',
        'no-throw-literal':                 'error',
        'no-unmodified-loop-condition':     'error',
        'no-unused-expressions':            'error',
        'no-unused-labels':                 'error',
        'no-useless-call':                  'error',
        'no-useless-concat':                'error',
        'no-void':                          'error',
        'no-warning-comments':              'error',
        'no-with':                          'error',
        'radix':                            'error',
        'vars-on-top':                      'off',
        'wrap-iife':                        'error',
        'yoda':                             'error',
        'function-paren-newline':           [ 'error', 'consistent' ],
        'implicit-arrow-linebreak':         'off',
        'no-async-promise-executor':        'error',
        'no-dupe-class-members':            'off',
        'strict':                           [ 'error', 'global' ],
        'init-declarations':                'off',
        'no-catch-shadow':                  'error',
        'no-delete-var':                    'error',
        'no-label-var':                     'error',
        'no-restricted-globals':            'off',
        'no-shadow-restricted-names':       'error',
        'no-shadow':                        'error',
        'no-undef-init':                    'error',
        'no-undef':                         'error',
        'no-undefined':                     'off',
        'no-unused-vars':                   'error',
        'no-use-before-define':             'error',
        'callback-return':                  'off',
        'global-require':                   'off',
        'handle-callback-err':              'error',
        'no-mixed-requires':                'error',
        'no-new-require':                   'error',
        'no-path-concat':                   'error',
        'no-process-exit':                  'error',
        'no-restricted-modules':            'off',
        'no-sync':                          'error',
        'array-bracket-spacing':            [ 'error', 'always' ],
        'block-spacing':                    'error',
        'brace-style':                      'off',
        'camelcase':                        'off',
        'comma-spacing':                    [ 'error', { 'before': false, 'after': true } ],
        'comma-style':                      [ 'error', 'last' ],
        'computed-property-spacing':        'off',
        'consistent-this':                  [ 'error', 'self' ],
        'eol-last':                         'error',
        'func-names':                       [ 'error', 'as-needed' ],
        'func-style':                       [ 'off', 'declaration' ],
        'id-blacklist':                     'off',
        'id-length':                        'off',
        'id-match':                         'off',
        'indent':                           ["error", 4, { "ignoredNodes": ["JSXElement *", "JSXElement"]}],
        'jsx-quotes':                       'off',
        'key-spacing':                      [ 'error', { 'afterColon': true, 'mode': 'minimum', 'align': { 'beforeColon': false, 'afterColon': true, 'on': 'value', 'mode': 'minimum' } } ],
        'keyword-spacing':                  'error',
        'linebreak-style':                  [ 'error', 'unix' ],
        'lines-around-comment':             'off',
        'max-depth':                        [ 'error', 5 ],
        'max-len':                          [ 'off', 120, 4 ],
        'max-nested-callbacks':             [ 'error', 4 ],
        'max-params':                       [ 'error', 5 ],
        'max-statements':                   'off',
        'new-cap':                          'off',
        'new-parens':                       'error',
        'newline-after-var':                'off',
        'newline-before-return':            'off',
        'newline-per-chained-call':         'off',
        'no-array-constructor':             'error',
        'no-bitwise':                       'error',
        'no-continue':                      'off',
        'no-inline-comments':               'off',
        'no-lonely-if':                     'off',
        'no-mixed-spaces-and-tabs':         [ 'error', true ],
        'no-multiple-empty-lines':          'error',
        'no-negated-condition':             'off',
        'no-nested-ternary':                'error',
        'no-new-object':                    'error',
        'no-plusplus':                      [ 'error', { 'allowForLoopAfterthoughts': true } ],
        'no-restricted-syntax':             'off',
        'no-spaced-func':                   'error',
        'no-ternary':                       'off',
        'no-trailing-spaces':               [ 'error', { 'skipBlankLines': true } ],
        'no-underscore-dangle':             'off',
        'no-unneeded-ternary':              'off',
        'no-whitespace-before-property':    'error',
        'object-curly-spacing':             [ 'error', 'always' ],
        'one-var':                          'off',
        'one-var-declaration-per-line':     [ 'error', 'always' ],
        'operator-assignment':              [ 'error', 'always' ],
        'operator-linebreak':               'off',
        'padded-blocks':                    'off',
        'quotes':                           [ 'error', 'single', { 'allowTemplateLiterals': true } ],
        'require-jsdoc':                    'off',
        'semi-spacing':                     'error',
        'semi':                             'error',
        'sort-imports':                     'off',
        'sort-vars':                        'off',
        'space-before-blocks':              [ 'error', 'always' ],
        'space-before-function-paren':      'off',
        'space-in-parens':                  [ 'error', 'never' ],
        'space-infix-ops':                  'error',
        'space-unary-ops':                  [ 'error', { 'words': true, 'nonwords': false } ],
        'spaced-comment':                   'error',
        'wrap-regex':                       'error',
        'lines-between-class-members':      'off',
        'max-classes-per-file':             'off',
        'max-lines-per-function':           'off',
        'multiline-comment-style':          'off',
        'prefer-object-spread':             'error',
        'arrow-body-style':                 'off',
        'arrow-parens':                     'off',
        'arrow-spacing':                    'error',
        'constructor-super':                'error',
        'generator-star-spacing':           'off',
        'no-class-assign':                  'error',
        'no-confusing-arrow':               'error',
        'no-const-assign':                  'error',
        'no-new-symbol':                    'error',
        'no-restricted-imports':            'off',
        'no-this-before-super':             'error',
        'no-useless-constructor':           'error',
        'no-var':                           'error',
        'object-shorthand':                 'error',
        'prefer-arrow-callback':            'error',
        'prefer-const':                     [ 'error', { 'destructuring': 'all' } ],
        'prefer-rest-params':               'off',
        'prefer-reflect':                   'off',
        'prefer-spread':                    'off',
        'prefer-template':                  'error',
        'require-yield':                    'error',
        'template-curly-spacing':           [ 'error', 'always' ],
        'yield-star-spacing':               'off',
        'array-bracket-newline':            'off',
        'array-element-newline':            'off',
        'capitalized-comments':             'off',
        'class-methods-use-this':           'off',
        'for-direction':                    'off',
        'func-call-spacing':                'off',
        'func-name-matching':               'off',
        'getter-return':                    'off',
        'line-comment-position':            'off',
        'max-lines':                        [ 'error', 500 ],
        'max-statements-per-line':          [ 'error', { 'max': 1 } ],
        'multiline-ternary':                'off',
        'no-await-in-loop':                 'off',
        'no-buffer-constructor':            'off',
        'no-compare-neg-zero':              'error',
        'no-duplicate-imports':             'error',
        'no-global-assign':                 'error',
        'no-mixed-operators':               'error',
        'no-multi-assign':                  'off',
        'no-prototype-builtins':            'off',
        'no-restricted-properties':         'off',
        'no-return-await':                  'off',
        'no-tabs':                          'error',
        'no-template-curly-in-string':      'error',
        'no-unsafe-finally':                'error',
        'no-unsafe-negation':               'error',
        'no-useless-computed-key':          'error',
        'no-useless-escape':                'error',
        'no-useless-rename':                'error',
        'no-useless-return':                'error',
        'nonblock-statement-body-position': 'error',
        'object-curly-newline':             'off',
        'object-property-newline':          'off',
        'padding-line-between-statements':  'off',
        'prefer-destructuring':             'off',
        'prefer-numeric-literals':          'error',
        'prefer-promise-reject-errors':     'error',
        'require-await':                    'error',
        'rest-spread-spacing':              'error',
        'semi-style':                       'error',
        'sort-keys':                        'off',
        'switch-colon-spacing':             'off',
        'symbol-description':               'off',
        'template-tag-spacing':             'off',
        'unicode-bom':                      'off',
        'default-param-last':               'error',
        'function-call-argument-newline':   [ 'error', 'consistent' ],
        'grouped-accessor-pairs':           'error',
        'no-constructor-return':            'error',
        'no-dupe-else-if':                  'error',
        'no-import-assign':                 'error',
        'no-setter-return':                 'error',
        'no-useless-catch':                 'error',
        'prefer-exponentiation-operator':   'off',
        'prefer-named-capture-group':       'off',
        'prefer-regex-literals':            'error',


        'flowtype/boolean-style':                    [ 'error', 'boolean' ],
        'flowtype/define-flow-type':                 'off',
        'flowtype/delimiter-dangle':                 [ 'error', 'never' ],
        'flowtype/generic-spacing':                  [ 'error', 'never' ],
        'flowtype/no-primitive-constructor-types':   'error',
        'flowtype/no-weak-types':                    [ 'error', { 'any': true, 'Object': false, 'Function': false } ],
        'flowtype/object-type-delimiter':            [ 'error', 'comma' ],
        'flowtype/require-parameter-type':           [ 'off', { 'excludeArrowFunctions': true } ],
        'flowtype/require-return-type':              [ 'error', 'always', { 'annotateUndefined': 'ignore', 'excludeArrowFunctions': true } ],
        'flowtype/require-valid-file-annotation':    [ 'error', 'always', { 'annotationStyle': 'block' } ],
        'flowtype/semi':                             [ 'error', 'always' ],
        'flowtype/space-after-type-colon':           [ 'error', 'always', { 'allowLineBreak': true } ],
        'flowtype/space-before-generic-bracket':     [ 'error', 'never' ],
        'flowtype/space-before-type-colon':          [ 'error', 'always' ],
        'flowtype/type-id-match':                    [ 'off', '^([A-Z][a-z0-9]+)+$' ],
        'flowtype/union-intersection-spacing':       [ 'error', 'always' ],
        'flowtype/use-flow-type':                    'error',
        'flowtype/valid-syntax':                     'error',
        'flowtype/no-dupe-keys':                     'error',
        'flowtype/no-types-missing-file-annotation': 'error',
        'flowtype/require-variable-type':            'off',
        'flowtype/sort-keys':                        'off',
        'flowtype/no-unused-expressions':            'error',
        'flowtype/array-style-complex-type':         'error',
        'flowtype/array-style-simple-type':          'off',
        'flowtype/newline-after-flow-annotation':    'off',
        'flowtype/no-existential-type':              'off',
        'flowtype/no-flow-fix-me-comments':          'off',
        'flowtype/no-mutable-array':                 'error',
        'flowtype/require-exact-type':               'error',
        'flowtype/require-types-at-top':             'off',
        'flowtype/type-import-style':                'off',
        'flowtype/arrow-parens':                     'off',
        'flowtype/no-mixed':                         'off',
        'flowtype/require-compound-type-alias':      'off',
        'flowtype/require-indexer-name':             'off',
        'flowtype/require-inexact-type':             'off',
        'flowtype/require-readonly-react-props':     'off',
        'flowtype/spread-exact-type':                'off',


        'compat/compat': 'off',

        'unicorn/catch-error-name':                  'off',
        'unicorn/explicit-length-check':             'off',
        'unicorn/filename-case':                     'off',
        'unicorn/no-abusive-eslint-disable':         'error',
        'unicorn/no-process-exit':                   'error',
        'unicorn/throw-new-error':                   'error',
        'unicorn/number-literal-case':               'error',
        'unicorn/escape-case':                       'off',
        'unicorn/no-array-instanceof':               'error',
        'unicorn/no-new-buffer':                     'error',
        'unicorn/no-hex-escape':                     'error',
        'unicorn/custom-error-definition':           'error',
        'unicorn/prefer-starts-ends-with':           'off',
        'unicorn/prefer-type-error':                 'error',
        'unicorn/no-fn-reference-in-iterator':       'off',
        'unicorn/import-index':                      'off',
        'unicorn/new-for-builtins':                  'off',
        'unicorn/regex-shorthand':                   'off',
        'unicorn/error-message':                     'error',
        'unicorn/no-unsafe-regex':                   'off',
        'unicorn/prefer-add-event-listener':         'error',
        'unicorn/prefer-exponentiation-operator':    'off',
        'unicorn/prefer-spread':                     'error',
        'unicorn/consistent-function-scoping':       'off',
        'unicorn/expiring-todo-comments':            'error',
        'unicorn/no-console-spaces':                 'error',
        'unicorn/no-for-loop':                       'off',
        'unicorn/no-keyword-prefix':                 'off',
        'unicorn/no-nested-ternary':                 'off',
        'unicorn/no-unreadable-array-destructuring': 'error',
        'unicorn/no-unused-properties':              'error',
        'unicorn/no-zero-fractions':                 'error',
        'unicorn/prefer-dataset':                    'off',
        'unicorn/prefer-event-key':                  'error',
        'unicorn/prefer-flat-map':                   'off',
        'unicorn/prefer-includes':                   'off',
        'unicorn/prefer-modern-dom-apis':            'off',
        'unicorn/prefer-negative-index':             'error',
        'unicorn/prefer-node-append':                'off',
        'unicorn/prefer-node-remove':                'off',
        'unicorn/prefer-query-selector':             'off',
        'unicorn/prefer-reflect-apply':              'off',
        'unicorn/prefer-string-slice':               'error',
        'unicorn/prefer-text-content':               'error',
        'unicorn/prefer-trim-start-end':             'off',
        'unicorn/prevent-abbreviations':             'off',

        'eslint-comments/disable-enable-pair':   'error',
        'eslint-comments/no-duplicate-disable':  'error',
        'eslint-comments/no-unlimited-disable':  'error',
        'eslint-comments/no-unused-disable':     'error',
        'eslint-comments/no-unused-enable':      'error',
        'eslint-comments/no-use':                'off',
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-restricted-disable': 'off',
        'eslint-comments/require-description':   'off',

        'promise/always-return':             'off',
        'promise/no-return-wrap':            'error',
        'promise/param-names':               'error',
        'promise/catch-or-return':           'off',
        'promise/no-native':                 'off',
        'promise/no-nesting':                'off',
        'promise/no-promise-in-callback':    'error',
        'promise/no-callback-in-promise':    'off',
        'promise/avoid-new':                 'off',
        'promise/prefer-await-to-callbacks': 'off',
        'promise/prefer-await-to-then':      'off',
        'promise/no-new-statics':            'error',
        'promise/no-return-in-finally':      'off',
        'promise/valid-params':              'error',

        'security/detect-unsafe-regex':                   'error',
        'security/detect-non-literal-regexp':             'error',
        'security/detect-non-literal-require':            'error',
        'security/detect-non-literal-fs-filename':        'off',
        'security/detect-eval-with-expression':           'error',
        'security/detect-pseudoRandomBytes':              'error',
        'security/detect-possible-timing-attacks':        'off',
        'security/detect-no-csrf-before-method-override': 'error',
        'security/detect-buffer-noassert':                'error',
        'security/detect-child-process':                  'error',
        'security/detect-disable-mustache-escape':        'error',
        'security/detect-object-injection':               'off',
        'security/detect-new-buffer':                     'error',

        'import/default':                     'error',
        'import/export':                      'error',
        'import/extensions':                  'error',
        'import/first':                       'error',
        'import/max-dependencies':            'off',
        'import/named':                       'error',
        'import/namespace':                   'error',
        'import/newline-after-import':        'error',
        'import/no-absolute-path':            'error',
        'import/no-amd':                      'error',
        'import/no-anonymous-default-export': 'off',
        'import/no-commonjs':                 'error',
        'import/no-deprecated':               'error',
        'import/no-duplicates':               'error',
        'import/no-dynamic-require':          'off',
        'import/no-extraneous-dependencies':  'off',
        'import/no-internal-modules':         'off',
        'import/no-mutable-exports':          'off',
        'import/no-named-as-default':         'error',
        'import/no-named-as-default-member':  'error',
        'import/no-named-default':            'error',
        'import/no-namespace':                'error',
        'import/no-nodejs-modules':           'off',
        'import/no-restricted-paths':         'error',
        'import/no-unassigned-import':        [ 'error', { 'allow': [ 'test/**' ] } ],
        'import/no-unresolved':               'error',
        'import/no-webpack-loader-syntax':    'error',
        'import/order':                       [ 'error', { 'newlines-between': 'always' } ],
        'import/prefer-default-export':       'off',
        'import/unambiguous':                 'off',
        'import/dynamic-import-chunkname':    'off',
        'import/exports-last':                'off',
        'import/group-exports':               'off',
        'import/no-cycle':                    'error',
        'import/no-default-export':           'error',
        'import/no-self-import':              'error',
        'import/no-useless-path-segments':    'error',
        'import/no-named-export':             'off',
        'import/no-relative-parent-imports':  'off',
        'import/no-unused-modules':           'error',

        'const-immutable/no-mutation': 'off',

        'react/jsx-boolean-value':             'off',
        'react/jsx-closing-bracket-location':  'off',
        'react/jsx-closing-tag-location':      'error',
        'react/jsx-curly-spacing':             [ 'error', { 'when': 'always', 'allowMultiline': false } ],
        'react/jsx-equals-spacing':            [ 'error', 'never' ],
        'react/jsx-filename-extension':        'error',
        'react/jsx-first-prop-new-line':       [ 'error', 'multiline-multiprop' ],
        'react/jsx-handler-names':             'off',
        'react/jsx-indent':                    [ 'error', 4 ],
        'react/jsx-indent-props':              [ 'error', 4 ],
        'react/jsx-key':                       'off',
        'react/jsx-max-props-per-line':        'off',
        'react/jsx-no-bind':                   'off',
        'react/jsx-no-comment-textnodes':      'error',
        'react/jsx-no-duplicate-props':        'error',
        'react/jsx-no-literals':               'off',
        'react/jsx-no-target-blank':           'off',
        'react/jsx-no-undef':                  'error',
        'react/jsx-curly-brace-presence':      'off',
        'react/jsx-pascal-case':               'off',
        'react/jsx-sort-props':                'off',
        'react/jsx-tag-spacing':               'error',
        'react/jsx-uses-react':                'error',
        'react/jsx-uses-vars':                 'error',
        'react/jsx-wrap-multilines':           'error',
        'react/jsx-child-element-spacing':     'error',
        'react/jsx-max-depth':                 [ 'error', { 'max': 8 } ],
        'react/jsx-one-expression-per-line':   'off',
        'react/jsx-sort-default-props':        'off',
        'react/function-component-definition': 'off',
        'react/jsx-curly-newline':             [ 'error', 'consistent' ],
        'react/jsx-fragments':                 'off',
        'react/jsx-no-script-url':             'error',
        'react/jsx-no-useless-fragment':       'error',
        'react/jsx-props-no-multi-spaces':     'error',
        'react/jsx-props-no-spreading':        'off',
        'react/no-adjacent-inline-elements':   'off',
        'react/no-unsafe':                     'error',
        'react/prefer-read-only-props':        'off',
        'react/state-in-constructor':          'off',
        'react/static-property-placement':     'off',


        'react/boolean-prop-naming':                  'off',
        'react/button-has-type':                      'error',
        'react/default-props-match-prop-types':       'error',
        'react/destructuring-assignment':             'error',
        'react/display-name':                         'error',
        'react/forbid-component-props':               'error',
        'react/forbid-dom-props':                     'off',
        'react/forbid-elements':                      'off',
        'react/forbid-foreign-prop-types':            'error',
        'react/forbid-prop-types':                    'off',
        'react/no-access-state-in-setstate':          'error',
        'react/no-array-index-key':                   'error',
        'react/no-children-prop':                     'off',
        'react/no-danger':                            'error',
        'react/no-danger-with-children':              'error',
        'react/no-deprecated':                        'error',
        'react/no-did-mount-set-state':               'error',
        'react/no-did-update-set-state':              'error',
        'react/no-direct-mutation-state':             'error',
        'react/no-find-dom-node':                     'error',
        'react/no-is-mounted':                        'error',
        'react/no-multi-comp':                        'off',
        'react/no-redundant-should-component-update': 'error',
        'react/no-render-return-value':               'error',
        'react/no-set-state':                         'off',
        'react/no-string-refs':                       'error',
        'react/no-this-in-sfc':                       'error',
        'react/no-typos':                             'error',
        'react/no-unescaped-entities':                'error',
        'react/no-unknown-property':                  'off',
        'react/no-unused-prop-types':                 'error',
        'react/no-unused-state':                      'error',
        'react/no-will-update-set-state':             'error',
        'react/prefer-es6-class':                     'error',
        'react/prefer-stateless-function':            'off',
        'react/prop-types':                           'error',
        'react/react-in-jsx-scope':                   'error',
        'react/require-default-props':                'error',
        'react/require-optimization':                 'off',
        'react/require-render-return':                'error',
        'react/self-closing-comp':                    'error',
        'react/sort-comp':                            'off',
        'react/sort-prop-types':                      'off',
        'react/style-prop-object':                    'error',
        'react/void-dom-elements-no-children':        'error'
    }

};
