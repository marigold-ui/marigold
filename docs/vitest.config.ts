import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Minimal node-environment setup for testing pure logic and route handlers in
// the docs app (no DOM, no browser). Component/interaction testing lives in the
// component packages, not here.
//
// Also covers the build scripts under scripts/. Those used to live in a second
// `vitest.config.mjs`, which vitest never loaded — with both files present it
// resolves this one, so `pnpm --filter @marigold/docs test` silently skipped
// every scripts/ test and the CI job passed on an empty selection. Folded in
// here rather than kept separate: the app tests need the `@` alias below, which
// the .mjs config lacked, so the two could not simply be swapped.
export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'app/**/*.test.{ts,tsx}',
      'lib/**/*.test.{ts,tsx}',
      'scripts/**/*.test.{ts,mjs}',
      // `proxy.ts` has to sit next to `app/`, so its test does too.
      'proxy.test.ts',
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
});
