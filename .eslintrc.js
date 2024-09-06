module.exports = {
  root: true,
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'unused-imports'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  parserOptions: {
    project: true,
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['gen-eoa.js', '.eslintrc.js', '*.config.js', '*.config.ts', '**/*.spec.ts'],
}
