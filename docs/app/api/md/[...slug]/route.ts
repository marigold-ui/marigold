// Route handler for /api/md/<slug>.md — the per-page raw markdown surface
// for AI agents and tooling. The public URL is /<slug>.md, mapped here by the
// rewrite in next.config.mjs.
//
// Reads files pre-built by scripts/build-md.ts into .registry/md/<slug>.md.
// `await connection()` opts out of Next.js's static prerender pass to avoid
// the Node 22+ undici × prerender Proxy bug.
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { connection } from 'next/server';

const MD_DIR = path.join(process.cwd(), '.registry', 'md');

const HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'Cache-Control':
    'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
};

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) => {
  await connection();

  const { slug } = await params;
  // Strip a trailing `.md` if present in the last segment (the rewrite passes
  // the suffix through to keep the path symmetric).
  const last = slug.at(-1)?.replace(/\.md$/, '');
  if (last === undefined) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = path.join(MD_DIR, ...slug.slice(0, -1), `${last}.md`);
  if (!filePath.startsWith(MD_DIR) || !existsSync(filePath)) {
    return new Response('Not found', { status: 404 });
  }

  const body = await readFile(filePath, 'utf-8');
  return new Response(body, { headers: HEADERS });
};
