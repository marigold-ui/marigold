import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, mergeConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import configShared from './vitest.config.shared.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  configShared,
  defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
      projects: [
        {
          extends: true,
          plugins: [tsconfigPaths()],
          test: {
            name: 'unit-tests',
            environment: 'jsdom',
            // Use jsdom for browser-like tests
            setupFiles: ['./vitest.setup.ts'],
            globals: true,
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({
              // The location of your Storybook config, main.js|ts
              configDir: path.join(dirname, '.storybook'),
              // This should match your package.json script to run Storybook
              // The --no-open flag will skip the automatic opening of a browser
              storybookScript: 'yarn storybook --no-open',
              tags: {
                include: ['component-test'],
              },
            }),
          ],
          test: {
            name: 'storybook-tests',
            // Enable browser mode
            browser: {
              enabled: true,
              // Make sure to install Playwright
              provider: playwright({}),
              headless: true,
              instances: [{ browser: 'chromium' }],
            },
            setupFiles: ['./.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  })
);
