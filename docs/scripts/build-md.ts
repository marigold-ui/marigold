#!/usr/bin/env tsx
// Generate per-page raw-markdown files as static assets directly under public/,
// mirroring each page's docs URL with a `.md` suffix
// (e.g. /components/actions/button → public/components/actions/button.md).
//
// Replaces an app/api/md/[...slug]/route.ts handler that hit a Node 22+ undici
// proxy bug ("Cannot read private member #state") during Next.js `force-static`
// prerender. Serving the markdown as plain static assets sidesteps the
// prerender path entirely.
import pLimit from 'p-limit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllMdxFiles, parseMdxToMarkdown } from '../lib/markdown/parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'content');
const publicDir = path.join(rootDir, 'public');

const last = <T>(arr: T[]): T | undefined => arr[arr.length - 1];

const slugFromRelPath = (relPath: string): string[] => {
  const parts = relPath
    .replace(/\.mdx$/, '')
    .split(path.sep)
    .filter(Boolean);
  // Trailing /index → strip
  if (last(parts) === 'index') parts.pop();
  // Doubled segment (button/button) → strip
  if (parts.length >= 2 && last(parts) === parts[parts.length - 2]) parts.pop();
  return parts;
};

const buildMd = async () => {
  console.log('📄 Building markdown files...');
  const start = Date.now();

  const files = await getAllMdxFiles(contentDir);

  // Collect top-level slug roots (e.g. "components", "foundations") so we can
  // wipe only the generated trees — not the entire public/ directory.
  const slugRoots = new Set<string>();
  const targets: Array<{ file: string; slugs: string[] }> = [];
  for (const file of files) {
    const slugs = slugFromRelPath(file);
    if (slugs.length === 0) continue;
    slugRoots.add(slugs[0]);
    targets.push({ file, slugs });
  }

  await Promise.all(
    [...slugRoots].map(root =>
      fs.rm(path.join(publicDir, root), { recursive: true, force: true })
    )
  );

  // Cap concurrency: ts-morph is heavy, parallelism over ~4 hurts more than it helps.
  const limit = pLimit(4);
  let written = 0;
  const skipped = files.length - targets.length;

  await Promise.all(
    targets.map(({ file, slugs }) =>
      limit(async () => {
        try {
          const result = await parseMdxToMarkdown({
            filePath: file,
            contentDir,
          });
          const outPath = path.join(
            publicDir,
            ...slugs.slice(0, -1),
            `${last(slugs)}.md`
          );
          await fs.mkdir(path.dirname(outPath), { recursive: true });
          await fs.writeFile(outPath, result.markdown);
          written++;
        } catch (err) {
          console.error(
            `  ✗ ${file}:`,
            err instanceof Error ? err.message : err
          );
          throw err;
        }
      })
    )
  );

  const ms = Date.now() - start;
  console.log(
    `✅ Built ${written} markdown file${written === 1 ? '' : 's'} in ${(ms / 1000).toFixed(1)}s${skipped ? ` (${skipped} skipped)` : ''} → public/{${[...slugRoots].sort().join(',')}}/**/*.md`
  );
};

buildMd().catch(err => {
  console.error(err);
  process.exit(1);
});
