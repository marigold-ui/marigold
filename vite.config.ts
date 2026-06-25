import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import configShared, {
  browserDeps,
  browserScanEntries,
} from './vitest.config.shared.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  configShared,
  defineConfig({
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      include: browserDeps,
      entries: browserScanEntries,
    },
    resolve: {
      // Force a single copy of React/React DOM across all entry points so a
      // `react-dom/*` subpath (e.g. `react-dom/server` in SSR-hydration tests)
      // can never resolve to a second instance — the root cause of
      // `resolveDispatcher() is null`. Complements `optimizeDeps.include`,
      // which separately prevents mid-run re-optimization churn.
      dedupe: ['react', 'react-dom'],
      alias: {
        '.storybook': path.resolve(dirname, '.storybook'),
      },
    },
    test: {
      projects: [
        {
          extends: true,
          resolve: {
            tsconfigPaths: true,
          },
          define: {
            // @react-aria/virtualizer references process.env in source
            'process.env.NODE_ENV': JSON.stringify('test'),
            'process.env.VIRT_ON': 'undefined',
          },
          optimizeDeps: {
            include: browserDeps,
            entries: browserScanEntries,
          },
          test: {
            name: 'unit-tests',
            exclude: ['**/*.stories.tsx'],
            setupFiles: ['./vitest.setup.ts'],
            globals: true,
            // Retry once to handle transient vitest browser-mode import errors in CI
            // See: https://github.com/vitest-dev/vitest/issues/9509
            retry: 1,
            browser: {
              enabled: true,
              provider: playwright(),
              headless: !process.env.HEADED,
              instances: [
                {
                  browser: 'firefox',
                  viewport: { width: 1280, height: 720 },
                },
              ],
            },
          },
        },
        {
          extends: true,
          resolve: {
            tsconfigPaths: true,
          },
          plugins: [
            storybookTest({
              // The location of your Storybook config, main.js|ts
              configDir: path.join(dirname, '.storybook'),
              // This should match your package.json script to run Storybook
              // The --no-open flag will skip the automatic opening of a browser
              storybookScript: 'pnpm storybook --no-open',
              // Must stay truthy: the addon's in-UI test runner only treats a
              // project as a Storybook project when `__STORYBOOK_URL__` is set
              // (isStorybookProject), so an unset SB_URL (the case when running
              // tests from the Storybook UI) would otherwise collect 0 tests.
              storybookUrl: process.env.SB_URL ?? 'http://localhost:6006',
              tags: {
                include: ['component-test'],
              },
            }),
          ],
          define: {
            // @react-aria/virtualizer references process.env in source
            'process.env.NODE_ENV': JSON.stringify('test'),
            'process.env.VIRT_ON': 'undefined',
          },
          optimizeDeps: {
            include: browserDeps,
            entries: browserScanEntries,
          },
          test: {
            name: 'storybook-tests',
            // Exclude themes from storybook browser tests - they don't have
            // component-tests and cause node:module import errors in browser
            exclude: ['**/themes/**'],
            // Retry once to handle transient vitest browser-mode import errors in CI
            // See: https://github.com/vitest-dev/vitest/issues/9509
            retry: 1,
            // Enable browser mode
            browser: {
              enabled: true,
              // Make sure to install Playwright
              provider: playwright(),
              headless: !process.env.HEADED,
              instances: [{ browser: 'firefox' }],
            },
          },
        },
      ],
    },
  })
);
