import { defineConfig } from 'vitest/config';

/**
 * Deps that must be pre-bundled for browser-mode vitest projects.
 *
 * Without pre-bundling, Vite discovers these deps at runtime and triggers
 * on-demand optimization, which races with concurrent browser test execution
 * in CI (cold cache, constrained resources) and produces:
 *   `TypeError: error loading dynamically imported module`
 *
 * Keep this list next to the coverage config so adding a provider
 * doesn't silently break projects that override `optimizeDeps`.
 *
 * @see https://github.com/storybookjs/storybook/issues/33067
 * @see https://github.com/vitest-dev/vitest/issues/9509
 */
export const browserDeps = [
  // Coverage provider (loads dynamically after tests complete)
  '@vitest/coverage-istanbul',
  // Storybook addons (loaded via storybook preview/decorators)
  '@storybook/addon-a11y',
  '@storybook/addon-docs',
  'storybook-addon-test-codegen/preview',
  'storybook/viewport',
  // App deps used in decorators/stories
  '@tanstack/react-query',
  'react-select',
  // SSR-hydration test (TableEditableCell.ssr.test.tsx) imports these as bare
  // specifiers — the first explicit `react-dom/server` + `react-dom/client`
  // entry points in the suite. Without pre-bundling, Vite optimizes them
  // mid-run, pulling a second copy of React into the server bundle and
  // surfacing as `resolveDispatcher() is null` during renderToString/hydrateRoot.
  'react-dom/server',
  'react-dom/client',
  // RAC subpath import used in stories/tests (see DST-1512). Without
  // pre-bundling, the unit-tests project discovers it at runtime and
  // re-optimizes mid-run, cascading "error loading dynamically imported module".
  'react-aria-components/I18nProvider',
  // Virtualizer deps (reference process.env in source)
  '@react-aria/virtualizer',
  '@react-stately/layout',
  // Test setup (extends expect at module load time)
  '@testing-library/jest-dom/vitest',
];

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
  // @marigold/cli runs node-mode tests from its own vitest config.
  '**/packages/cli/**',
  '**/theme-plugins/**',
  '**/scripts/**',
  '**/storybook-static/**',
  '**/.storybook/**',
  '**/test.utils.*',
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
