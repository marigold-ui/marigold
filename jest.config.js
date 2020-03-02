const { workspaces } = require('./package.json');

module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '.(ts|tsx)': require.resolve('ts-jest/dist'),
  },
  transformIgnorePatterns: ['/node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/*.test.ts?(x)'],
  roots: workspaces.map(
    workspace => `<rootDir>/${workspace.replace('/*', '')}`
  ),
  // coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    // ignore:
    '!**/stories.tsx',
    '!**/{*.d.ts,index.ts}',
    '!**/node_modules/**',
    '!**/build/**',
  ],
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  // plugins
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
