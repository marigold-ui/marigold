import { defineConfig } from 'vitest/config';

/**
 * Root-level deps that must be pre-bundled for browser-mode vitest projects.
 *
 * Without pre-bundling, Vite discovers these deps at runtime and triggers
 * on-demand optimization, which races with concurrent browser test execution
 * in CI (cold cache, constrained resources) and produces:
 *   `TypeError: error loading dynamically imported module`
 *
 * IMPORTANT: only list deps that resolve from the MONOREPO ROOT here.
 * `optimizeDeps.include` is resolved from the Vite root (this repo root), so
 * packages installed under a workspace (e.g. react-aria-components and
 * `@react-aria/*`, which live under packages/components in this pnpm repo) are
 * NOT resolvable here — listing them only emits "Failed to resolve dependency"
 * warnings and does nothing. Those workspace-nested deps are instead crawled
 * up front via `optimizeDeps.entries` (see vite.config.ts), which resolves
 * imports from each source file's own location.
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
  // Test setup (extends expect at module load time)
  '@testing-library/jest-dom/vitest',
];

/**
 * Glob of entry files Vite's dep scanner crawls before serving, so the FULL
 * import graph (all `react-aria-components/<Subpath>` and `@react-aria/*` deps,
 * which are workspace-nested and therefore NOT listable in `optimizeDeps.include`
 * — see browserDeps above) is discovered and pre-bundled in a single pass up
 * front. This is what actually prevents the mid-run re-optimization race that
 * surfaces as `error loading dynamically imported module` (the DateField ->
 * `useButton` CI flake): unlike `include`, the scanner resolves each import from
 * its own file location, so workspace deps resolve correctly.
 *
 * Covers test + story files (the browser-mode entry points) across all packages;
 * their transitive source imports are followed automatically by the scanner.
 */
export const browserScanEntries = [
  'packages/*/src/**/*.{test,stories}.{ts,tsx}',
];

const exclude = [
  '**/node_modules/**',
  '**/dist/**',
  '**/cypress/**',
  '**/.{idea,git,cache,output,temp}/**',
  '**/*.config.*',
  '**/config/**',
  '**/docs*/**',
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
