const findUp = require('find-up').sync;
const path = require('path');
const merge = require('merge-deep');
const { pathsToModuleNameMapper } = require('ts-jest');

/**
 * Base configuration for jest
 */
const base = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.ts')],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // transform
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
      },
    ],
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],

  // coverage
  collectCoverage: true,
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

  // plugins
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],

  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};

/**
 * Create jest configuration wit optional overrides.
 */
module.exports = (overrides = {}) => {
  const config = merge(base, overrides);

  // Support monorepo by mapping paths from tsconfig.
  if (!config.moduleNameMapper) {
    const configFile = findUp('tsconfig.json');
    const { compilerOptions } = require(configFile);
    config.moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    });
  }

  return config;
};
