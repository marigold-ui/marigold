import { defineConfig } from 'vitest/config';

/**
 * Deps that must be pre-bundled for browser-mode vitest projects.
 * Keep this next to the coverage config so adding a provider
 * doesn't silently break projects that override `optimizeDeps`.
 */
export const browserDeps = ['@vitest/coverage-istanbul'];

const exclude = [
  '**/node_modules/**',
  '**/dist/**',
  '**/cypress/**',
  '**/.{idea,git,cache,output,temp}/**',
  '**/*.config.*',
  '**/config/**',
  '**/docs*/**',
  '**/icons/**',
  '**/themes/**',
  '**/packages/types/**',
  '**/theme-plugins/**',
  '**/scripts/**',
  '**/storybook-static/**',
  '**/.storybook/**',
];

export default defineConfig({
  test: {
    exclude,
    testTimeout: 30000,
    coverage: {
      provider: 'istanbul',
      exclude: [
        ...exclude,
        '**/*.stories.tsx',
        '**/index.*',
        'packages/components/src/hooks.ts',
        'packages/components/src/types.ts',
        'packages/system/src/defaultTheme.ts',
        'packages/system/src/style-props.tsx',
        'packages/system/src/types/theme.ts',
      ],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
      reporter: ['text', 'json', 'html', 'json-summary'],
    },
  },
});
