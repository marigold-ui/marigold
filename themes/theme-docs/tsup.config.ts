import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/preset.ts', 'src/tokens.ts'],
  format: ['esm', 'cjs'],
  tsconfig: './tsconfig.build.json',
  dts: true,
  sourcemap: true,
  clean: process.env.NODE_ENV === 'production',
});
