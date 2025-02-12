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
    // diabled because not updated yet to version tailwind 4
    // 'plugin:tailwindcss/recommended',
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
  },
  parserOptions: {
    babelOptions: {
      parserOpts: {
        // Allow imports like `import pkg from './package.json' assert { type: 'json' };`
        plugins: ['importAssertions'],
      },
    },
  },
  overrides: [
    {
      files: ['config/**/*.js', 'docs/scripts/**/*.mjs', 'themes/**/*.js'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-empty': 'off',
        'no-redeclare': 'off',
      },
    },
  ],
};
