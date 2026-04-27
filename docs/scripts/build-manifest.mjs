#!/usr/bin/env node
// Generate the docs page manifest as a static file in public/api/.
// Replaces an app/api/manifest.json/route.ts handler that hit a Node 22+
// undici proxy bug ("Cannot read private member #state") during Next.js
// `force-static` prerender. Serving the manifest as a plain static asset
// sidesteps the prerender path entirely.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'content');
const outFile = path.join(rootDir, 'public', 'api', 'manifest.json');

const BASE_URL = 'https://www.marigold-ui.io';
const EXCLUDED_PREFIXES = ['releases'];
const EXCLUDED_SEGMENTS = ['__internal__'];

const findMdxFiles = (dir, files = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findMdxFiles(full, files);
    else if (entry.isFile() && entry.name.endsWith('.mdx')) files.push(full);
  }
  return files;
};

const parseFrontmatter = source => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1);
    }
    data[kv[1]] = value;
  }
  return data;
};

const slugsFromPath = absPath => {
  const rel = path.relative(contentDir, absPath).replace(/\\/g, '/');
  const withoutExt = rel.replace(/\.mdx$/, '');
  // Trailing /index → strip
  let parts = withoutExt.split('/').filter(Boolean);
  if (parts.at(-1) === 'index') parts.pop();
  // Doubled segment (button/button) → strip
  if (parts.length >= 2 && parts.at(-1) === parts.at(-2)) parts.pop();
  return parts;
};

const buildManifest = () => {
  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory not found:', contentDir);
    process.exit(1);
  }

  const entries = findMdxFiles(contentDir)
    .map(file => ({
      slugs: slugsFromPath(file),
      data: parseFrontmatter(fs.readFileSync(file, 'utf-8')),
    }))
    .filter(({ slugs }) => {
      if (slugs.length === 0) return false;
      if (EXCLUDED_PREFIXES.includes(slugs[0])) return false;
      if (slugs.some(s => EXCLUDED_SEGMENTS.includes(s))) return false;
      return true;
    })
    .map(({ slugs, data }) => {
      const slug = slugs.join('/');
      const categoryParts = slugs.slice(0, -1);
      return {
        name: data.title ?? null,
        slug,
        category: categoryParts.join('/') || slugs[0],
        description: data.description ?? null,
        badge: data.badge ?? null,
        url: `/api/md/${slug}.md`,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(
    outFile,
    JSON.stringify({ baseUrl: BASE_URL, pages: entries })
  );

  console.log(
    `📑 Built manifest with ${entries.length} pages → ${path.relative(rootDir, outFile)}`
  );
};

buildManifest();
