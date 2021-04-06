const createConfig = require('@marigold/jest-config');

module.exports = createConfig({
  collectCoverageFrom: [
    '!**/docs/**',
    '!**/icons/**',
    '!**/themes/**',
    '!**/stories.tsx',
  ],
  moduleNameMapper: {
    '^@marigold/theme-(.+)$': '<rootDir>/themes/theme-$1/src',
    '^@marigold/(.+)-config$': '<rootDir>/config/$1',
    '^@marigold/(.+)$': '<rootDir>/packages/$1/src',
  },
});
