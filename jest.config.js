const createConfig = require('@marigold/jest-config');

module.exports = createConfig({
  moduleNameMapper: {
    '^@marigold/theme-(.+)$': '<rootDir>/themes/theme-$1/src',
    '^@marigold/(.+)$': '<rootDir>/packages/$1/src',
  },
});
