import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/legacy.ts'],
  format: ['esm', 'cjs'],
  tsconfig: './tsconfig.build.json',
  dts: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  inlineOnly: false,
  clean: true,
});
