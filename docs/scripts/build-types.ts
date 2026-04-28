#!/usr/bin/env tsx
// Pre-compute prop-table data from all MDX <AutoTypeTable> references and
// write to .registry/props.json — one ts-morph pass at build time so ts-morph
// stays out of the Next.js bundle.
import type { DocEntry } from 'fumadocs-typescript';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { autoTypeTableTransform } from '../lib/auto-type-table-transform';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const REPO_ROOT = path.resolve(rootDir, '..');
const TSCONFIG_PATH = path.join(REPO_ROOT, 'tsconfig.json');
const CACHE_DIR = path.join(
  rootDir,
  '.registry',
  '.cache',
  'fumadocs-typescript'
);
const OUT_FILE = path.join(rootDir, '.registry', 'props.json');
const CONTENT_DIR = path.join(rootDir, 'content');

type Pkg = 'components' | 'system';

interface Ref {
  path: string;
  name: string;
  package: Pkg;
}

export interface PropTableEntry extends Ref {
  entries: DocEntry[];
}

const ATT_REGEX = /<AutoTypeTable\s+([^>]+?)\/?\s*>/g;

const resolveComponentPath = ({ path: componentPath, package: pkg }: Ref) => {
  const baseDir = path.join(REPO_ROOT, `packages/${pkg}/src`);
  const isBare = !componentPath.includes('/');

  // System package paths live under packages/system/src/components/*.
  const resolved =
    pkg === 'system' && !componentPath.startsWith('components/')
      ? `components/${componentPath}`
      : componentPath;

  if (resolved.endsWith('.tsx')) return path.join(baseDir, resolved);
  // Bare component names → folder containing same-named file (Button/Button.tsx).
  // Nested paths → file at the path (Radio/RadioGroup.tsx, components/Formatters/DateFormat.tsx).
  if (isBare) return path.join(baseDir, resolved, `${componentPath}.tsx`);
  return path.join(baseDir, `${resolved}.tsx`);
};

const findMdxFiles = async (dir: string): Promise<string[]> => {
  const out: string[] = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await findMdxFiles(full)));
    else if (entry.isFile() && entry.name.endsWith('.mdx')) out.push(full);
  }
  return out;
};

const parseAttrs = (raw: string) => {
  const out: Partial<Record<keyof Ref, string>> = {};
  const attrRegex = /(path|name|package)=["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = attrRegex.exec(raw))) {
    out[m[1] as keyof Ref] = m[2];
  }
  return out;
};

const findReferences = async (mdxFiles: string[]) => {
  const seen = new Map<string, Ref>();
  for (const file of mdxFiles) {
    const content = await fs.readFile(file, 'utf-8');
    let m: RegExpExecArray | null;
    ATT_REGEX.lastIndex = 0;
    while ((m = ATT_REGEX.exec(content))) {
      const attrs = parseAttrs(m[1]);
      if (!attrs.path || !attrs.name) continue;
      const pkg = (attrs.package as Pkg | undefined) ?? 'components';
      const ref: Ref = { path: attrs.path, name: attrs.name, package: pkg };
      const key = `${pkg}:${ref.path}:${ref.name}`;
      if (!seen.has(key)) seen.set(key, ref);
    }
  }
  return seen;
};

const buildTypes = async () => {
  console.log('🧬 Building prop tables...');
  const start = Date.now();

  // fumadocs-typescript is ESM-only; tsx runs this script in CJS mode by
  // default, so a static import would crash. Dynamic import works.
  const fumaTs = await import('fumadocs-typescript');
  const generator = fumaTs.createGenerator({
    tsconfigPath: TSCONFIG_PATH,
    cache: fumaTs.createFileSystemGeneratorCache(CACHE_DIR),
  });

  const mdxFiles = await findMdxFiles(CONTENT_DIR);
  const refs = await findReferences(mdxFiles);
  console.log(
    `  Scanned ${mdxFiles.length} MDX files, found ${refs.size} unique <AutoTypeTable> reference${refs.size === 1 ? '' : 's'}`
  );

  const out: Record<string, PropTableEntry> = {};
  let succeeded = 0;
  let failed = 0;

  for (const [key, ref] of refs) {
    try {
      const filePath = resolveComponentPath(ref);
      const docs = await generator.generateTypeTable(
        { path: filePath, name: ref.name },
        { transform: autoTypeTableTransform }
      );
      const entries = docs.flatMap(d => d.entries);
      out[key] = { ...ref, entries };
      succeeded++;
    } catch (err) {
      console.warn(`  ✗ ${key}: ${err instanceof Error ? err.message : err}`);
      failed++;
    }
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(out));

  const ms = Date.now() - start;
  console.log(
    `🧬 Built ${succeeded} prop table${succeeded === 1 ? '' : 's'} in ${(ms / 1000).toFixed(1)}s${failed ? ` (${failed} failed)` : ''} → ${path.relative(rootDir, OUT_FILE)}`
  );
};

buildTypes().catch(err => {
  console.error(err);
  process.exit(1);
});
