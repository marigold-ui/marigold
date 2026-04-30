import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'bin/marigold': 'src/bin/marigold.ts',
    'lib/send-telemetry': 'src/lib/send-telemetry.ts',
  },
  format: ['esm', 'cjs'],
  tsconfig: './tsconfig.build.json',
  dts: true,
  clean: true,
  shims: true,
});
