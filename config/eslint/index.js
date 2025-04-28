import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import vitestPlugin from 'eslint-plugin-vitest';
import globals from 'globals';

export default [
  // Base recommended config
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs['recommended-latest'],
  vitestPlugin.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.vitest,
      },
      parserOptions: {
        babelOptions: {
          parserOpts: {
            plugins: ['importAssertions'],
          },
        },
      },
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      // Disabled cause it doesn't currently work as of 01/02/2021
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'off',
    },
  },
  {
    files: ['config/**/*.js', 'docs/scripts/**/*.mjs', 'themes/**/*.js'],
    rules: {
      'no-empty': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
];
