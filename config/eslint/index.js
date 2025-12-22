import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vitestPlugin from '@vitest/eslint-plugin';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  js.configs.recommended,
  // React support
  {
    files: ['**/*.{jsx,js,tsx,ts}'],
    plugins: { react: reactPlugin, 'react-hooks': reactHooksPlugin },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      'react/react-in-jsx-scope': 'off', // Not required for React 17+
      'react/no-unescaped-entities': ['warn'],
      'react-hooks/rules-of-hooks': ['warn'],
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
