import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vitestPlugin from '@vitest/eslint-plugin';
import prettier from 'eslint-config-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  js.configs.recommended,
  // React support — uses @eslint-react/eslint-plugin (ESLint 10 compatible)
  // eslint-plugin-react 7.x uses removed context.getFilename() API from ESLint 10
  eslintReact.configs.recommended,
  {
    files: ['**/*.{jsx,js,tsx,ts}'],
    plugins: { 'react-hooks': reactHooksPlugin },
    rules: {
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      'react-hooks/rules-of-hooks': ['warn'],
      // rules-of-hooks is already enforced by eslint-plugin-react-hooks above;
      // @eslint-react's version does not recognise _PrefixedComponent naming or Storybook render()
      '@eslint-react/rules-of-hooks': 'off',
      // component-hook-factories produces false positives for inline render() in Storybook stories
      '@eslint-react/component-hook-factories': 'off',
      '@eslint-react/no-create-ref': 'error',
    },
  },
  vitestPlugin.configs.recommended,
  // Testing Library support
  {
    files: ['**/*.{test,tests,spec}.{js,jsx,ts,tsx}'],
    plugins: { 'testing-library': testingLibraryPlugin },
    rules: {
      ...testingLibraryPlugin.configs['flat/dom'].rules,
      ...testingLibraryPlugin.configs['flat/react'].rules,
    },
  },

  // TypeScript support
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./../../tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: { '@typescript-eslint': typescript },
    rules: {
      ...typescript.configs.recommended.rules,
      'no-case-declarations': 'off', // TypeScript has better type checking, not needed
      'no-undef': 'off', // TypeScript handles this better, see: https://typescript-eslint.io/troubleshooting/faqs/eslint
      '@typescript-eslint/no-explicit-any': 'off', // Allow explicit any
      '@typescript-eslint/no-unused-vars': 'warn', // Replace JS no-unused-vars rule
    },
  },
  prettier,
  {
    rules: {
      // Disabled cause it doesn't currently work as of 01/02/2021
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },
  // Ignored patterns and files
  {
    ignores: [
      'node_modules/*',
      '**/dist/*',
      '*.min.js',
      '*.css',
      '*.md',
      'vitest.config.shared.ts',
      'vite.config.ts',
    ],
  },
];
