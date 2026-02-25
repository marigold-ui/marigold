import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineBrowserCommand, playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, mergeConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import configShared from './vitest.config.shared.js';

declare module 'vitest/internal/browser' {
  interface BrowserCommands {
    mouseDrag: (selector: string, deltaY: number) => Promise<void>;
  }
}

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  configShared,
  defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '.storybook': path.resolve(dirname, '.storybook'),
      },
    },
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
              storybookScript: 'pnpm storybook --no-open',
              storybookUrl: process.env.SB_URL,
              tags: {
                include: ['component-test'],
              },
            }),
          ],
          test: {
            name: 'storybook-tests',
            // Exclude themes from storybook browser tests - they don't have
            // component-tests and cause node:module import errors in browser
            exclude: ['**/themes/**'],
            retry: 2,
            // Enable browser mode
            browser: {
              enabled: true,
              // Make sure to install Playwright
              provider: playwright(),
              headless: true,
              instances: [{ browser: 'firefox' }],
              commands: {
                mouseDrag: defineBrowserCommand(
                  async (ctx, selector: string, deltaY: number) => {
                    const frame = await ctx.frame();
                    const element = frame.locator(selector);
                    const box = await element.boundingBox();
                    if (!box)
                      throw new Error(
                        `Element "${selector}" not found or not visible`
                      );

                    const startX = box.x + box.width / 2;
                    const startY = box.y + box.height / 4;
                    const endY = startY + deltaY;
                    const steps = 10;

                    const page = ctx.page;
                    await page.mouse.move(startX, startY);
                    await page.mouse.down();
                    for (let i = 1; i <= steps; i++) {
                      await page.mouse.move(
                        startX,
                        startY + (deltaY * i) / steps
                      );
                    }
                    await page.mouse.up();
                  }
                ),
              },
            },
          },
        },
      ],
    },
  })
);
