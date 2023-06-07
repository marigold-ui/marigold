module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier',
    'plugin:tailwindcss/recommended',
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
};
