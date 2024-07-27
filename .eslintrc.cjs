module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'react-hooks/exhaustive-deps': 'error',
    'eqeqeq': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': 'warn',
    'indent': ['error', 2],
    'max-len': ['warn', { code: 100 }],
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'camelcase': 'warn',
  },
}
