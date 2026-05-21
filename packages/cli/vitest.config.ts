import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'cli',
    environment: 'node',
    include: ['src/**/*.test.ts'],
    globals: true,
  },
});
