import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'cli',
    environment: 'node',
    globals: true,
    pool: 'forks',
    testTimeout: 60_000,
    // picocolors treats any truthy `CI` env var as color support, so CLI
    // output that's plain-text locally comes back interspersed with ANSI
    // codes on GitHub Actions (which sets CI=true) — breaking any test that
    // asserts on an exact rendered substring spanning a colored token
    // boundary (e.g. a dim bullet followed by plain text). Force NO_COLOR so
    // rendered CLI output is deterministic across local dev and CI alike.
    env: { NO_COLOR: '1' },
    // Each *.integration.test.ts launches its own Chromium + Vite dev server
    // (spatial/renderer.ts). Capping maxWorkers only narrows the window where
    // several of these run concurrently; it doesn't close it, and it also
    // slows the much larger unit-test project to pay for a handful of files.
    // Splitting into projects makes the integration files fully serialized
    // (deterministic, no CPU contention past RENDER_BUDGET_MS) while the unit
    // project keeps unbounded file parallelism.
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          exclude: ['src/**/*.integration.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          include: ['src/**/*.integration.test.ts'],
          fileParallelism: false,
        },
      },
    ],
  },
});
