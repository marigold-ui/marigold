module.exports = {
  extends: [
    'react-app',
    'plugin:jest/recommended',
    'plugin:testing-library/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
