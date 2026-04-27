#!/usr/bin/env tsx
// Generate the per-page raw-markdown files as static assets in public/api/md/.
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
const outDir = path.join(rootDir, 'public', 'api', 'md');

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

  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const files = await getAllMdxFiles(contentDir);
  // Cap concurrency: ts-morph is heavy, parallelism over ~4 hurts more than it helps.
  const limit = pLimit(4);

  let written = 0;
  let skipped = 0;

  await Promise.all(
    files.map(file =>
      limit(async () => {
        const slugs = slugFromRelPath(file);
        if (slugs.length === 0) {
          skipped++;
          return;
        }

        try {
          const result = await parseMdxToMarkdown({
            filePath: file,
            contentDir,
          });

          const outPath = path.join(
            outDir,
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
    `✅ Built ${written} markdown file${written === 1 ? '' : 's'} in ${(ms / 1000).toFixed(1)}s${skipped ? ` (${skipped} skipped)` : ''} → ${path.relative(rootDir, outDir)}`
  );
};

buildMd().catch(err => {
  console.error(err);
  process.exit(1);
});
