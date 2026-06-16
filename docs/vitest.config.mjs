import { defineConfig } from 'vitest/config';

// Node-side tests for the docs build scripts (e.g. build-examples.mjs). These
// run in a plain Node environment and are intentionally separate from the
// repo-root browser-mode config (which drives the component/story suites and
// excludes docs/ and scripts/).
export default defineConfig({
  test: {
    environment: 'node',
    include: ['scripts/**/*.test.mjs', 'app/**/*.test.ts'],
  },
});
