import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/appearances.ts'],
  format: ['esm', 'cjs'],
  tsconfig: './tsconfig.build.json',
  dts: true,
  sourcemap: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  clean: process.env.NODE_ENV === 'production',
});
