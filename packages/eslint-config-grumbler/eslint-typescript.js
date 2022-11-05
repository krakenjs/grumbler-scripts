/* @flow */

/**
 * Credit to https://github.com/xojs/eslint-config-xo-typescript.
 * eslint-config-xo-typescript is copy pasted here for now and we will be moving to
 * that package officially shortly. For now this is a slightly tweaked version of it.
 *
 * TODO: internally we need to scope our eslint-config-xo package to an internal scope
 * so we can install xo from public npm
 */

// eslint-disable-next-line import/no-commonjs
module.exports = {
  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    "plugin:security/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],

  plugins: ["@typescript-eslint", "react"],

  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    "import/parsers": {
      [require.resolve("@typescript-eslint/parser")]: [".ts", ".tsx"],
    },
    react: {
      version: "16.0",
    },
  },

  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array-simple",
      },
    ],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        minimumDescriptionLength: 4,
      },
    ],
    "@typescript-eslint/ban-tslint-comment": "error",
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: false,
        types: {
          String: {
            message: "Use `string` instead.",
            fixWith: "string",
          },
          Number: {
            message: "Use `number` instead.",
            fixWith: "number",
          },
          Boolean: {
            message: "Use `boolean` instead.",
            fixWith: "boolean",
          },
          Symbol: {
            message: "Use `symbol` instead.",
            fixWith: "symbol",
          },
          BigInt: {
            message: "Use `bigint` instead.",
            fixWith: "bigint",
          },
          Object: {
            message:
              "The `Object` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead. See https://github.com/typescript-eslint/typescript-eslint/pull/848",
            fixWith: "Record<string, unknown>",
          },
          "{}": {
            message:
              "The `{}` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead.",
            fixWith: "Record<string, unknown>",
          },
          object: {
            message:
              "The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848",
            fixWith: "Record<string, unknown>",
          },
          Function: "Use a specific function type instead, like `() => void`.",
          null: {
            message:
              "Use `undefined` instead. See: https://github.com/sindresorhus/meta/issues/7",
            fixWith: "undefined",
          },
          "[]": "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
          "[[]]":
            "Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
          "[[[]]]": "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
          "[[[[]]]]": "ur drunk 🤡",
          "[[[[[]]]]]": "🦄💥",
        },
      },
    ],
    "@typescript-eslint/class-literal-property-style": ["error", "getters"],
    "@typescript-eslint/consistent-generic-constructors": [
      "error",
      "constructor",
    ],
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "brace-style": "off",
    "@typescript-eslint/brace-style": [
      "error",
      "1tbs",
      {
        allowSingleLine: false,
      },
    ],
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": "error",
    "dot-notation": "off",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-exports": [
      "error",
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    "@typescript-eslint/consistent-type-imports": "error",

    "func-call-spacing": "off",
    "@typescript-eslint/func-call-spacing": ["error", "never"],
    "keyword-spacing": "off",
    "@typescript-eslint/keyword-spacing": "error",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      {
        // Workaround to allow class fields to not have lines between them.
        // TODO: Get ESLint to add an option to ignore class fields.
        exceptAfterSingleLine: true,
      },
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: [
          "signature",

          "public-static-field",
          "public-static-method",

          "protected-static-field",
          "protected-static-method",

          "private-static-field",
          "private-static-method",

          "static-field",
          "static-method",

          "public-decorated-field",
          "public-instance-field",
          "public-abstract-field",
          "public-field",

          "protected-decorated-field",
          "protected-instance-field",
          "protected-abstract-field",
          "protected-field",

          "private-decorated-field",
          "private-instance-field",
          "private-abstract-field",
          "private-field",

          "instance-field",
          "abstract-field",
          "decorated-field",
          "field",

          "public-constructor",
          "protected-constructor",
          "private-constructor",
          "constructor",

          "public-decorated-method",
          "public-instance-method",
          "public-abstract-method",
          "public-method",

          "protected-decorated-method",
          "protected-instance-method",
          "protected-abstract-method",
          "protected-method",

          "private-decorated-method",
          "private-instance-method",
          "private-abstract-method",
          "private-method",

          "instance-method",
          "abstract-method",
          "decorated-method",
          "method",
        ],
      },
    ],

    // Disabled for now as it causes too many weird TypeScript issues. I'm not sure whether the problems are caused by bugs in TS or problems in my types.
    // TODO: Try to re-enable this again in 2023.
    // '@typescript-eslint/method-signature-style': 'error',

    // We use `@typescript-eslint/naming-convention` in favor of `camelcase`.
    camelcase: "off",
    "@typescript-eslint/no-base-to-string": "error",
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "error",
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        allowSingleExtends: true,
      },
    ],

    "@typescript-eslint/no-extra-non-null-assertion": "error",

    "no-extra-parens": "off",
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": "error",
    "no-loop-func": "off",
    "@typescript-eslint/no-loop-func": "error",
    "no-loss-of-precision": "off",
    "@typescript-eslint/no-loss-of-precision": "error",
    "@typescript-eslint/no-extraneous-class": [
      "error",
      {
        allowConstructorOnly: false,
        allowEmpty: false,
        allowStaticOnly: false,
        allowWithDecorator: true,
      },
    ],
    "no-void": [
      "error",
      {
        allowAsStatement: true, // To allow `ignoreVoid` in `@typescript-eslint/no-floating-promises`
      },
    ],
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreVoid: true, // Prepend a function call with `void` to mark it as not needing to be await'ed, which silences this rule.
        ignoreIIFE: true,
      },
    ],
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-implicit-any-catch": "error",
    "@typescript-eslint/no-inferrable-types": "error",

    // Disabled for now as it has too many false-positives.
    // '@typescript-eslint/no-invalid-void-type': 'error',

    "@typescript-eslint/no-meaningless-void-operator": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksConditionals: true,

        // TODO: I really want this to be `true`, but it makes it inconvenient to use
        // async functions as event handlers... I need to find a good way to handle that.
        // https://github.com/sindresorhus/refined-github/pull/2391#discussion_r318990466
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "error",
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      [
        "error",
        "domain",
        "freelist",
        "smalloc",
        "punycode",
        "sys",
        "querystring",
        "colors",
      ],
    ],
    "@typescript-eslint/no-redundant-type-constituents": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        allowDestructuring: true,
      },
    ],
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": [
      "error",
      {
        // This should ideally be `false`, but it makes rethrowing errors inconvenient. There should be a separate `allowRethrowingUnknown` option.
        allowThrowingUnknown: true,
        allowThrowingAny: false,
      },
    ],
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

    // `no-unnecessary-condition` is essentially a stricter version of `no-constant-condition`, but that isn't currently enabled
    "no-constant-condition": "error",

    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",

    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",

    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-useless-empty-export": "error",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "error",
    "no-unused-vars": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "padding-line-between-statements": "off",
    "@typescript-eslint/padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "multiline-block-like",
        next: "*",
      },
    ],
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/non-nullable-type-assertion-style": "error",
    "@typescript-eslint/parameter-properties": [
      "error",
      {
        prefer: "parameter-property",
      },
    ],
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-literal-enum-member": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/prefer-nullish-coalescing": [
      "error",
      {
        ignoreTernaryTests: false,
        ignoreConditionalTests: false,
        ignoreMixedLogicalExpressions: false,
      },
    ],
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/restrict-plus-operands": [
      "error",
      {
        checkCompoundAssignments: true,
        allowAny: false,
      },
    ],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
      },
    ],
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/require-array-sort-compare": [
      "error",
      {
        ignoreStringArrays: true,
      },
    ],

    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-infix-ops": "off",
    "@typescript-eslint/space-infix-ops": "error",
    semi: "off",
    "@typescript-eslint/semi": ["error", "always"],
    "space-before-blocks": "off",
    "@typescript-eslint/space-before-blocks": ["error", "always"],

    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/triple-slash-reference": [
      "error",
      {
        path: "never",
        types: "never",
        lib: "never",
      },
    ],
    "@typescript-eslint/type-annotation-spacing": "error",

    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/prefer-return-this-type": "error",
    "@typescript-eslint/unified-signatures": [
      "error",
      {
        ignoreDifferentlyNamedParameters: true,
      },
    ],

    // Disabled per typescript-eslint recommendation: https://github.com/typescript-eslint/typescript-eslint/blob/e26e43ffba96f6d46198b22f1c8dd5c814db2652/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    "no-undef": "off",

    // TypeScript might have features not supported in a specific Node.js version.
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-unsupported-features/es-builtins": "off",

    // The rule is buggy with TS and it's not needed as TS already enforces valid imports and references at compile-time.
    "import/namespace": "off",

    // `import/no-duplicates` works better with TypeScript.
    "no-duplicate-imports": "off",

    // react rules from https://github.com/xojs/eslint-config-xo-react/blob/4a345ab8bb6e71fe26c232e0578405bf22523870/index.js
    "react/boolean-prop-naming": [
      "error",
      {
        validateNested: true,
      },
    ],
    "react/button-has-type": "error",
    "react/jsx-child-element-spacing": "error",
    "react/default-props-match-prop-types": "error",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/hook-use-state": "error",
    "react/iframe-missing-sandbox": "error",
    "react/no-access-state-in-setstate": "error",
    "react/no-array-index-key": "error",
    "react/no-arrow-function-lifecycle": "error",
    "react/no-children-prop": "error",
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "react/no-deprecated": "error",
    "react/no-did-update-set-state": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-find-dom-node": "error",
    "react/no-invalid-html-attribute": "error",
    "react/no-is-mounted": "error",
    "react/no-namespace": "error",
    "react/no-redundant-should-component-update": "error",
    "react/no-render-return-value": "error",
    "react/no-typos": "error",
    "react/no-string-refs": [
      "error",
      {
        noTemplateLiterals: true,
      },
    ],
    "react/no-this-in-sfc": "error",
    "react/no-unescaped-entities": "error",
    "react/no-unknown-property": "error",
    "react/no-unsafe": "error",
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/prefer-read-only-props": "error",
    "react/prop-types": "error",
    "react/react-in-jsx-scope": "error",
    "react/require-default-props": [
      "error",
      {
        forbidDefaultForRequired: true,
        ignoreFunctionalComponents: true,
      },
    ],
    "react/self-closing-comp": "error",
    "react/state-in-constructor": ["error", "never"],
    "react/static-property-placement": "error",
    "react/style-prop-object": [
      "error",
      {
        allow: [
          // This allows react-intl’s `<FormattedNumber value={0.42} style='percent'/>`.
          "FormattedNumber",
        ],
      },
    ],
    "react/void-dom-elements-no-children": "error",
    "react/jsx-boolean-value": "error",
    "react/jsx-closing-bracket-location": [
      "error",
      {
        nonEmpty: "tag-aligned",
        selfClosing: false,
      },
    ],
    "react/jsx-closing-tag-location": "error",
    "react/jsx-first-prop-new-line": "error",
    "react/jsx-key": [
      "error",
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    "react/jsx-max-props-per-line": [
      "error",
      {
        maximum: 3,
        when: "multiline",
      },
    ],
    "react/jsx-no-bind": [
      "error",
      {
        allowArrowFunctions: true,
      },
    ],
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-constructed-context-values": "error",
    "react/jsx-no-duplicate-props": [
      "error",
      {
        ignoreCase: true,
      },
    ],
    "react/jsx-no-script-url": "error",
    "react/jsx-no-target-blank": [
      "error",
      {
        warnOnSpreadAttributes: true,
        forms: true,
      },
    ],
    "react/jsx-no-undef": "error",
    "react/jsx-no-useless-fragment": "error",
    // Disabled for now as it produces too many errors
    // 'react/jsx-one-expression-per-line': ['error', {allow: 'single-child'}],
    "react/jsx-curly-brace-presence": [
      "error",
      {
        props: "never",
        children: "never",
        propElementValues: "always",
      },
    ],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-pascal-case": "error",
    "react/jsx-props-no-multi-spaces": "error",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-wrap-multilines": [
      "error",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "ignore",
        logical: "ignore",
        prop: "ignore",
      },
    ],
  },
};
