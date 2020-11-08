module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'object-curly-newline': ['error', { consistent: true }],
    'max-len': 'off',
    'func-names': 'off',
    'no-empty-pattern': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'vue/attributes-order': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'no-alert': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
