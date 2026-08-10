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
  // The render harness (index.html + entry/setup .tsx) is static and is loaded
  // from dist/harness at runtime by the renderer. tsdown bundles source but does
  // not emit these assets, and `clean` wipes dist first — so copy them as part
  // of the build. Keeps the package build a single `tsdown` step (no extra
  // script in package.json).
  copy: [{ from: 'src/harness', to: 'dist' }],
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
