const findUp = require('find-up').sync;
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

/**
 * Create jest configuration wit optional overrides.
 */
module.exports = (overrides = {}) => {
  // Base configuration for jest
  let config = {
    testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],
    setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.ts')],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    // transform
    transform: {
      '.(ts|tsx)$': require.resolve('ts-jest/dist'),
      '.(js|jsx)$': require.resolve('babel-jest'), // jest's default
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],

    // coverage
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      '**/*.{ts,tsx}',
      // ignore:
      '!**/stories.tsx',
      '!**/{*.d.ts,index.ts}',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/themes/**',
      '!**/icons/**',
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

  config = { ...config, ...overrides };

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
