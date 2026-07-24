import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Minimal node-environment setup for testing pure logic and route handlers in
// the docs app (no DOM, no browser). Component/interaction testing lives in the
// component packages, not here.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['app/**/*.test.{ts,tsx}', 'lib/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
});
