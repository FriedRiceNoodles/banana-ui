/* eslint-env node */

module.exports = {
  plugins: ['@typescript-eslint', 'wc', 'lit', 'lit-a11y', 'chai-expect', 'chai-friendly', 'import', 'sort-imports-es6-autofix'],
  extends: ['eslint:recommended', 'plugin:wc/recommended', 'plugin:wc/best-practice', 'plugin:lit/recommended', 'plugin:lit-a11y/recommended'],
  env: {
    es2021: true,
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      files: ['*.ts', '*.tsx'],
      rules: {
        'wc/guard-super-call': 'off',
      },
    },
    {
      extends: ['plugin:chai-expect/recommended', 'plugin:chai-friendly/recommended'],
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
  ],
};
