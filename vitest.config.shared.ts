import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
    ],
    testTimeout: 30000,
    coverage: {
      provider: 'istanbul',
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
        '**/**/*.config.*',
        '**/**/index.*',
        'packages/components/src/hooks.ts',
        'packages/components/src/types.ts',
        'packages/system/src/defaultTheme.ts',
        'packages/system/src/style-props.tsx',
        'scripts/**',
        'packages/system/src/types/theme.ts',
        '.storybook/**',
      ],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
      reporter: ['text', 'json', 'html', 'json-summary'], // Optional: Add coverage reports
    },
  },
});
