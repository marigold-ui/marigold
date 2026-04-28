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
  // .registry/* is read at request time by route handlers and the
  // <AutoTypeTable> component. Make sure the Vercel function bundles include
  // these files (Next.js's automatic tracing doesn't pick up out-of-bundle
  // JSON / fs reads).
  outputFileTracingIncludes: {
    '/mcp': ['./lib/markdown/embeddings.json'],
    '/manifest.json': ['./.registry/manifest.json'],
    '/api/md/**': ['./.registry/md/**/*.md'],
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
      {
        source: '/:path(.*)\\.md',
        destination: '/api/md/:path.md',
      },
    ];
  },
};

export default withMDX(config);
