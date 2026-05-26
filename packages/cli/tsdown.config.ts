import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'bin/marigold': 'src/bin/marigold.ts',
    'send-telemetry': 'src/lib/send-telemetry.ts',
  },
  format: ['esm', 'cjs'],
  tsconfig: './tsconfig.build.json',
  dts: true,
  clean: true,
  shims: true,
  deps: {
    neverBundle: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'playwright',
      'vite',
      'typescript',
      'ts-morph',
      '@axe-core/playwright',
      '@vitejs/plugin-react',
      '@marigold/components',
      '@marigold/system',
      '@marigold/theme-rui',
    ],
  },
});
