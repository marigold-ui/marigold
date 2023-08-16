const path = require('path');
const merge = require('merge-deep');

/**
 * Base configuration for jest
 */
const base = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {},
  testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.ts')],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // transform
  transform: {
    '^.+\\.css$': ['jest-transform-css', { modules: true }],
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022',
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
        sourceMaps: true,
      },
    ],
  },
  transformIgnorePatterns: [], // set empty so it doesn't break some ESM only modules

  // coverage
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    // ignore:
    '!**/{*.d.ts,index.ts}',
    '!**/.cache/**',
    '!**/build/**',
    '!**/dist/**',
    '!**/node_modules/**',
  ],

  clearMocks: true,

  snapshotFormat: {
    printBasicPrototype: false,
  },

  // plugins
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};

/**
 * Create jest configuration wit optional overrides.
 */
module.exports = (overrides = {}) => merge(base, overrides);
