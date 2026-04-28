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
  // Needed for markdown parser plugins that use ts-morph on the server
  serverExternalPackages: ['ts-morph', 'typescript'],
  // Ensure embeddings.json is bundled with the /mcp serverless function on Vercel
  outputFileTracingIncludes: {
    '/mcp': ['./lib/markdown/embeddings.json'],
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
    ];
  },
};

export default withMDX(config);
