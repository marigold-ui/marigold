#!/usr/bin/env tsx
// Generate per-page raw-markdown files into .registry/md/, mirroring each
// page's docs URL with a `.md` suffix (e.g. /components/actions/button →
// .registry/md/components/actions/button.md). Served at request time by
// app/api/md/[...slug]/route.ts (rewritten from /<slug>.md).
import pLimit from 'p-limit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllMdxFiles, parseMdxToMarkdown } from '../lib/markdown/parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'content');
const outDir = path.join(rootDir, '.registry', 'md');

const slugFromRelPath = (relPath: string): string[] => {
  const parts = relPath
    .replace(/\.mdx$/, '')
    .split(path.sep)
    .filter(Boolean);
  if (parts.at(-1) === 'index') parts.pop();
  if (parts.length >= 2 && parts.at(-1) === parts.at(-2)) parts.pop();
  return parts;
};

const buildMd = async () => {
  console.log('📄 Building markdown files...');
  const start = Date.now();

  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const files = await getAllMdxFiles(contentDir);
  const limit = pLimit(8);

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
            `${slugs.at(-1)}.md`
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
