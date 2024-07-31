const createConfig = require('@marigold/jest-config');

module.exports = createConfig({
  testTimeout: 30000,
  collectCoverageFrom: [
    '!**/config/**',
    '!**/docs*/**',
    '!**/icons/**',
    '!**/themes/**',
    '!**/packages/types/**',
    '!**/*.stories.tsx',
    '!**/theme-preset/**',
    // needed for coverage not to break should be fixed soon
    '!packages/components/src/Accordion/useAccordionItem.ts',
    '!packages/components/src/Accordion/Accordion.tsx',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },
  },
  // needed 'modulePathIgnorePatterns' because without it throws errors according to:  Haste module map
  // It cannot be resolved, because there exists several different files, or packages,
  // that provide a module for that particular name and platform. The platform is generic (no extension).
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '^@marigold/theme-(.+)$': [
      '<rootDir>/themes/theme-$1/src',
      '<rootDir>/packages/theme-$1',
    ],
    '^@marigold/(.+)-config$': '<rootDir>/config/$1',
    '^@marigold/(.+)$': '<rootDir>/packages/$1/src',
    '^@marigold/(.*)$': '<rootDir>/dist/myscope/$1',
  },
  // Sadly, Jest is not compatible with prettier v3
  // Let's format the files by hand after update for now
  // by disabling prettier formatting completely
  // https://github.com/jestjs/jest/issues/14305
  prettierPath: null,
});
