//@ts-ignore
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
    ],
    testTimeout: 30000,
    // @ts-ignore
    coverage: {
      exclude: [
        '**/config/**',
        '**/docs*/**',
        '**/icons/**',
        '**/themes/**',
        '**/packages/types/**',
        '**/*.stories.tsx',
        'storybook-static/**',
        '**/theme-plugins/**',
        'packages/components/src/_propTableTypes/**',
        // needed for coverage not to break should be fixed soon
        'packages/components/src/Accordion/useAccordionItem.ts',
        'packages/components/src/Accordion/Accordion.tsx',
        '**/**/*.config.*',
        '**/**/index.*',
        'packages/components/src/hooks.ts',
        'packages/components/src/types.ts',
        'packages/system/src/defaultTheme.ts',
        'packages/system/src/style-props.tsx',
        'scripts/**',
        'packages/system/src/types/theme.ts',
      ],
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 90,
        lines: 90,
      },
      reporter: ['text', 'json', 'html', 'json-summary'], // Optional: Add coverage reports
    },
    globals: true,
    environment: 'jsdom', // Use jsdom for browser-like tests
    setupFiles: ['./vitest.setup.ts', './storybook/.storybook/vitest.setup.ts'], // Path to your setup file
  },
});
