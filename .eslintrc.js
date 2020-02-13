module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint'
    ],
    extends: [
        // 'eslint:recommended',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        "comma-dangle": ["error", "never"],
        "spaced-comment": ["error", "always", { "markers": ["/"] }],
        "import/prefer-default-export": 0,
        "no-param-reassign": ["error", { "props": false }],
        "@typescript-eslint/indent": ["error", 4],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-expressions": ["error", { "allowShortCircuit": true }],
        "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "[iI]gnored" }]
    }
};
