#!/usr/bin/env tsx
// Generate per-page raw-markdown files into public/, mirroring each page's
// docs URL with a `.md` suffix (e.g. /components/actions/button →
// public/components/actions/button.md). Served directly by Next.js as static
// assets — no route handler, no prerender Proxy, no Node 22+ undici #state bug.
import pLimit from 'p-limit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllMdxFiles, parseMdxToMarkdown } from '../lib/markdown/parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'content');
const publicDir = path.join(rootDir, 'public');

const slugFromRelPath = (relPath: string): string[] => {
  const parts = relPath
    .replace(/\.mdx$/, '')
    .split(path.sep)
    .filter(Boolean);
  if (parts.at(-1) === 'index') parts.pop();
  if (parts.length >= 2 && parts.at(-1) === parts.at(-2)) parts.pop();
  return parts;
};

// Remove every previously generated .md under public/<root>/, leaving images
// and other static assets alone.
const cleanRoot = async (root: string) => {
  const dir = path.join(publicDir, root);
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await cleanRoot(path.join(root, entry.name));
    else if (entry.isFile() && entry.name.endsWith('.md')) await fs.rm(full);
  }
};

const buildMd = async () => {
  console.log('📄 Building markdown files...');
  const start = Date.now();

  const files = await getAllMdxFiles(contentDir);
  const slugRoots = new Set<string>();
  const tasks: Array<{ file: string; outPath: string }> = [];
  let skipped = 0;

  for (const file of files) {
    const slugs = slugFromRelPath(file);
    if (slugs.length === 0) {
      skipped++;
      continue;
    }
    slugRoots.add(slugs[0]);
    tasks.push({
      file,
      outPath: path.join(
        publicDir,
        ...slugs.slice(0, -1),
        `${slugs.at(-1)}.md`
      ),
    });
  }

  await Promise.all([...slugRoots].map(cleanRoot));

  const limit = pLimit(8);
  let written = 0;

  await Promise.all(
    tasks.map(({ file, outPath }) =>
      limit(async () => {
        try {
          const result = await parseMdxToMarkdown({
            filePath: file,
            contentDir,
          });
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
    `✅ Built ${written} markdown file${written === 1 ? '' : 's'} in ${(ms / 1000).toFixed(1)}s${skipped ? ` (${skipped} skipped)` : ''} → public/`
  );
};

buildMd().catch(err => {
  console.error(err);
  process.exit(1);
});
