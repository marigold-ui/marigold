#!/usr/bin/env node
// Build the docs page manifest as a static asset at public/manifest.json,
// served directly by Next.js (no route handler, no prerender Proxy).
//
// Also emits public/component-search.json — a content index over the component
// MDX used by `marigold search` to find components by what their docs say
// (title/description/headings/section prose), not just by name.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'content');
const outFile = path.join(rootDir, 'public', 'manifest.json');
const searchOutFile = path.join(rootDir, 'public', 'component-search.json');
const componentsPkgPath = path.join(
  rootDir,
  '..',
  'packages',
  'components',
  'package.json'
);

const BASE_URL = 'https://www.marigold-ui.io';
const EXCLUDED_PREFIXES = ['releases'];
const EXCLUDED_SEGMENTS = ['__internal__'];

const readComponentsVersion = () => {
  try {
    const pkg = JSON.parse(fs.readFileSync(componentsPkgPath, 'utf-8'));
    return typeof pkg.version === 'string' ? pkg.version : null;
  } catch {
    return null;
  }
};

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
    const raw = kv[2].trim();
    data[kv[1]] = /^['"].*['"]$/.test(raw) ? raw.slice(1, -1) : raw;
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

// Pages excluded from every generated index (empty slug or internal-only docs).
const isExcluded = slugs =>
  slugs.length === 0 || slugs.some(s => EXCLUDED_SEGMENTS.includes(s));

// --- Component search index -------------------------------------------------

// NOTE: the MDX → searchable-prose extraction below (stripTags/cleanProse/
// parseComponentDoc) is intentionally regex-based, matching this file's existing
// parseFrontmatter approach. It feeds search *ranking*, not rendering, so it is
// best-effort by design. If the component MDX grows constructs these regexes
// can't handle, revisit with the docs site's remark/AST parser (DST-1446 follow-up).

// Body without the leading frontmatter block, so section parsing never sees it.
export const stripFrontmatter = source =>
  source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');

// Strip every HTML/JSX tag, innermost-first, so nested/multiline elements
// (e.g. a <TeaserList> whose props embed <svg><path/></svg>) are fully removed
// rather than leaving orphan attribute/SVG fragments. The `</?[a-zA-Z]` anchor
// means prose comparisons like "value < 10" are left alone. Bounded so a
// pathological input can't loop forever.
const TAG = /<\/?[a-zA-Z][^<>]*>/g;
export const stripTags = text => {
  let prev = text;
  for (let i = 0; i < 20; i++) {
    const next = prev.replace(TAG, ' ');
    if (next === prev) break;
    prev = next;
  }
  return prev;
};

// Reduce a chunk of MDX prose to plain searchable text: drop import lines, unwrap
// inline code/links/bold to their text, then strip JSX and table scaffolding.
// Fenced code blocks are already removed by the caller. Returns whitespace-
// collapsed prose, capped at ~400 chars. Inline `` `<TextField>` `` refs survive
// as the bare word "TextField".
const SNIPPET_MAX = 400;
export const cleanProse = text => {
  const cleaned = stripTags(
    text
      // import statements (single- and multi-line `import { … } from '…'`)
      .replace(/^[ \t]*import\b[\s\S]*?from\s+['"][^'"]+['"];?[ \t]*$/gm, '')
      .replace(/^[ \t]*import\s.+$/gm, '')
      // inline code → its text, minus angle brackets so `<TextField>` becomes
      // the searchable word "TextField" and survives tag stripping below
      .replace(/`([^`]+)`/g, (_, code) => code.replace(/[<>]/g, ''))
      // markdown links → link text
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  )
    // bold / italic markers
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // leftover heading markers from ### subsections
    .replace(/^#{1,6}\s+/gm, '')
    // table pipes and rule/separator runs. Only collapse whitespace-bounded
    // hyphen runs (markdown `---` rules, `| --- |` table separators) so real
    // prose flags like `--offline` keep their leading dashes.
    .replace(/\|/g, ' ')
    .replace(/(^|\s)-{2,}(?=\s|$)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.length > SNIPPET_MAX
    ? cleaned.slice(0, SNIPPET_MAX).trim()
    : cleaned;
};

// Parse a component MDX body into the lead "Overview" prose plus its top-level
// (`##`, not `###`) sections. `headings` keeps every real `##` heading for
// scoring; `sections` keeps only those with surviving prose (used as hits).
export const parseComponentDoc = body => {
  // Drop fenced blocks up front so a `##` inside example code can't open a
  // bogus section. Both backtick and tilde fences are stripped.
  const lines = stripFrontmatter(body)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .split(/\r?\n/);

  const headings = [];
  const sections = [];
  let heading = 'Overview';
  let buffer = [];

  const flush = () => {
    const snippet = cleanProse(buffer.join('\n'));
    if (snippet) sections.push({ heading, snippet });
    buffer = [];
  };

  for (const line of lines) {
    const match = line.match(/^##\s+(?!#)(.+?)\s*$/);
    if (match) {
      flush();
      heading = match[1].trim();
      headings.push(heading);
    } else {
      buffer.push(line);
    }
  }
  flush();

  return { headings, sections };
};

const buildComponentSearch = files => {
  const components = files
    .filter(({ slugs }) => !isExcluded(slugs) && slugs[0] === 'components')
    .map(({ slugs, source, data }) => {
      const { headings, sections } = parseComponentDoc(source);
      return {
        slug: slugs.join('/'),
        name: data.title ?? slugs.at(-1) ?? null,
        description: data.description ?? null,
        badge: data.badge ?? null,
        headings,
        sections,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  fs.mkdirSync(path.dirname(searchOutFile), { recursive: true });
  fs.writeFileSync(
    searchOutFile,
    JSON.stringify({
      version: readComponentsVersion(),
      generatedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      components,
    })
  );

  console.log(
    `🔎 Built search index with ${components.length} components → ${path.relative(rootDir, searchOutFile)}`
  );
};

const buildManifest = files => {
  const entries = files
    .filter(
      ({ slugs }) => !isExcluded(slugs) && !EXCLUDED_PREFIXES.includes(slugs[0])
    )
    .map(({ slugs, data }) => {
      const slug = slugs.join('/');
      const categoryParts = slugs.slice(0, -1);
      return {
        name: data.title ?? null,
        slug,
        category: categoryParts.join('/') || slugs[0],
        description: data.description ?? null,
        badge: data.badge ?? null,
        url: `/${slug}.md`,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(
    outFile,
    JSON.stringify({
      version: readComponentsVersion(),
      generatedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      pages: entries,
    })
  );

  console.log(
    `📑 Built manifest with ${entries.length} pages → ${path.relative(rootDir, outFile)}`
  );
};

// Run the build only when executed directly (`node build-manifest.mjs`), not
// when imported — e.g. by build-manifest.test.mjs, which exercises the pure
// content-extraction helpers above.
const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory not found:', contentDir);
    process.exit(1);
  }

  // Walk, read, and parse frontmatter for each MDX file once; the manifest and
  // the search index are both derived from the same parsed sources.
  const files = findMdxFiles(contentDir).map(file => {
    const source = fs.readFileSync(file, 'utf-8');
    return {
      slugs: slugsFromPath(file),
      source,
      data: parseFrontmatter(source),
    };
  });

  // Manifest first (list/docs depend on it), then the search index. A real
  // error here still fails the build so we catch index bugs in CI.
  buildManifest(files);
  buildComponentSearch(files);
}
