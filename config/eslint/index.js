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
  root: true,
  rules: {
    // Disabled cause it doesn't currently work as of 01/02/2021
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
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
