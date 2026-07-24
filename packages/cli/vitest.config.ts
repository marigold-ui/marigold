import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'cli',
    environment: 'node',
    include: ['src/**/*.test.ts'],
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
  },
});
