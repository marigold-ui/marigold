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
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'error',
  },
  parserOptions: {
    babelOptions: {
      parserOpts: {
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
