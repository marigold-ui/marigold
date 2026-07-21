import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/legacy.ts'],
  format: ['esm', 'cjs'],
  tsconfig: './tsconfig.build.json',
  dts: true,
  // `react-select` (used only by the deprecated `Multiselect`) is externalized
  // rather than bundled: under `unbundle` it would otherwise be copied in full
  // (untree-shaken, ~2 MB) into the output. Declared as a dependency so it
  // installs transitively; drop both when `Multiselect` is removed.
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-select'],
  inlineOnly: false,
  // Emit one output file per source module (preserveModules equivalent) so
  // consumer bundlers can drop unused components instead of pulling the whole
  // concatenated barrel. The `.` barrel import stays backward compatible.
  unbundle: true,
  clean: true,
});
