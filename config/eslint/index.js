module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Disabled cause it doesn't currently work as of 01/02/2021
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    // Turned off because we use custom-classnames for our design tokens
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'error',
  },
  parserOptions: {
    babelOptions: {
      parserOpts: {
        // Allow imports like `import pkg from './package.json' assert { type: 'json' };`
        plugins: ['importAssertions'],
      },
    },
  },
  ignorePatterns: ['docs/.contentlayer/generated/ContentPage/_index.mjs'],
  overrides: [
    {
      files: [
        'config/**/*.js',
        'docs/.contentlayer/**/*.mjs',
        'docs/scripts/**/*.mjs',
        'themes/**/*.js',
      ],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-empty': 'off',
        'no-redeclare': 'off',
      },
    },
  ],
};
