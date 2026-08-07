import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/legacy.ts'],
  format: ['esm', 'cjs'],
  tsconfig: './tsconfig.build.json',
  dts: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  inlineOnly: false,
  // Emit one output file per source module (preserveModules equivalent) so
  // consumer bundlers can drop unused components instead of pulling the whole
  // concatenated barrel. The `.` barrel import stays backward compatible.
  unbundle: true,
  clean: true,
});
