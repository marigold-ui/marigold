const createConfig = require('@marigold/jest-config');

module.exports = createConfig({
  collectCoverageFrom: [
    '!**/config/**',
    '!**/docs*/**',
    '!**/icons/**',
    '!**/themes/**',
    '!**/packages/types/**',
    '!**/*.stories.tsx',
    // needed for coverage not to break should be fixed soon
    '!packages/components/src/Accordion/useAccordionItem.ts',
    '!packages/components/src/Accordion/Accordion.tsx',
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '^@marigold/theme-(.+)$': '<rootDir>/themes/theme-$1/src',
    '^@marigold/(.+)-config$': '<rootDir>/config/$1',
    '^@marigold/(.+)$': '<rootDir>/packages/$1/src',
    '^@marigold/(.*)$': '<rootDir>/dist/myscope/$1',
  },
});
