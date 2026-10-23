import { createMDX } from 'fumadocs-mdx/next';
import componentsPkg from '../packages/components/package.json' with { type: 'json' };

const withMDX = createMDX();

if (process.env.VERCEL) {
  await import('./scripts/download-embeddings.mjs');
}

/** @type {import('next').NextConfig} */
const config = {
  env: {
    version: componentsPkg.version,
  },
  reactStrictMode: true,
  experimental: {
    // On Vercel preview and production builds, run webpack loaders (mostly the
    // MDX compile) in worker threads instead of a pool of child processes, to keep
    // the build's peak memory under the 8 GB limit (DST-1904). `force` skips Next's
    // fallback on Node >= 24.13.1, which guards against
    // https://github.com/nodejs/node/issues/65100. Its known trigger is fsevents,
    // which is macOS-only, so local runs (including `vercel dev`) keep the default.
    turbopackPluginRuntimeStrategy: ['preview', 'production'].includes(
      process.env.VERCEL_ENV
    )
      ? 'forceWorkerThreads'
      : undefined,
  },
  outputFileTracingIncludes: {
    '/mcp': ['./lib/markdown/embeddings.json'],
  },
};

export default withMDX(config);
