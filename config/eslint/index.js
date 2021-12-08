module.exports = {
  extends: ['react-app', 'react-app/jest', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Disabled cause it doesn't currently work as of 01/02/2021
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
  },
};
