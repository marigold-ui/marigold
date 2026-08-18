#!/usr/bin/env tsx
// Generate public/llms.txt — the conventional discovery entry point for AI
// agents (https://llmstxt.org).
//
// It indexes what the docs build already emits: `build-manifest` writes the page
// index, `build-md` writes a per-page `.md` with demos inlined as source and
// props tables expanded. So this runs last and reads those files rather than
// parsing MDX a second time.
//
// There is deliberately no `llms-full.txt`. The full corpus measures ~2 MB,
// which is past what most agents ingest in one shot, and it would be a third
// copy of the same content free to drift from the manifest and the `.md` files.
// Agents that cannot take the whole thing are better served by this index plus
// a fetch per page, and the MCP server already does semantic retrieval.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

export interface ManifestPage {
  name: string | null;
  slug: string;
  category: string;
  description: string | null;
  badge: string | null;
  url: string;
}

export interface Manifest {
  baseUrl: string;
  pages: ManifestPage[];
}

const TITLE = 'Marigold Design System';
const SUMMARY =
  "Documentation for Marigold, Reservix' design system: React components built on react-aria and Tailwind CSS.";

const LOWERCASE_WORDS = new Set(['and', 'of', 'the', 'to', 'with']);

export const humanizeCategory = (category: string) =>
  category
    .split('/')
    .map(segment =>
      segment
        .split('-')
        .map((word, index) =>
          index > 0 && LOWERCASE_WORDS.has(word)
            ? word
            : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(' ')
    )
    .join(' / ');

export interface Category {
  category: string;
  label: string;
}

/**
 * Categories in sidebar order, so the index reads like the site. A `meta.json`
 * lists plain page slugs, separators (`---Label---`) and folder spreads
 * (`...folder`); a separator labels the spread that follows it, which is where
 * "Hooks and Utils" and "User Input" come from.
 */
export const readCategories = (
  topLevel: string[],
  areaMeta: Record<string, string[]>
): Category[] => {
  const categories: Category[] = [];

  for (const area of topLevel) {
    const areaLabel = humanizeCategory(area);
    categories.push({ category: area, label: areaLabel });

    let label: string | null = null;
    for (const entry of areaMeta[area] ?? []) {
      const separator = entry.match(/^---(.+)---$/);
      if (separator) {
        label = separator[1].trim();
        continue;
      }
      // A plain slug consumes the pending label as well: only a spread directly
      // below a separator takes it. Without this, a separator followed by plain
      // slugs would leak its label onto the next spread further down.
      if (!entry.startsWith('...')) {
        label = null;
        continue;
      }

      const folder = entry.slice(3);
      categories.push({
        category: `${area}/${folder}`,
        label: `${areaLabel} / ${label ?? humanizeCategory(folder)}`,
      });
      label = null;
    }
  }

  return categories;
};

export const groupPages = (pages: ManifestPage[], categories: Category[]) => {
  const byCategory = new Map<string, ManifestPage[]>();
  for (const page of pages) {
    const group = byCategory.get(page.category) ?? [];
    group.push(page);
    byCategory.set(page.category, group);
  }

  const rank = (category: string) => {
    const index = categories.findIndex(entry => entry.category === category);
    return index === -1 ? categories.length : index;
  };

  return [...byCategory.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .map(([category, group]) => ({
      label:
        categories.find(entry => entry.category === category)?.label ??
        humanizeCategory(category),
      pages: [...group].sort((a, b) => a.slug.localeCompare(b.slug)),
    }));
};

const note = (page: ManifestPage) =>
  [page.badge ? `(${page.badge})` : null, page.description]
    .filter(Boolean)
    .join(' ');

export const buildIndex = (manifest: Manifest, categories: Category[]) => {
  const { baseUrl } = manifest;
  const lines = [
    `# ${TITLE}`,
    '',
    `> ${SUMMARY}`,
    '',
    'Every page is linked below as Markdown. Those `.md` files are generated from',
    'the docs source with component demos inlined as source code and props tables',
    'expanded, so they carry more than the rendered page shows. Append `.md` to any',
    'docs URL to get the same for a page that is not listed here.',
    '',
    `- Page index as JSON: ${baseUrl}/manifest.json`,
    `- Release notes: ${baseUrl}/releases/release-notes`,
  ];

  for (const { label, pages } of groupPages(manifest.pages, categories)) {
    lines.push('', `## ${label}`, '');
    for (const page of pages) {
      const title = page.name ?? page.slug;
      const description = note(page);
      lines.push(
        `- [${title}](${baseUrl}${page.url})${description ? `: ${description}` : ''}`
      );
    }
  }

  return `${lines.join('\n')}\n`;
};

const buildLlms = async () => {
  console.log('🤖 Building llms.txt...');

  const manifest: Manifest = JSON.parse(
    await fs.readFile(path.join(publicDir, 'manifest.json'), 'utf8')
  );
  // Named rather than raw ENOENT: the way to hit this is adding a folder to
  // content/meta.json without giving it a meta.json of its own.
  const readMeta = async (...segments: string[]) => {
    const file = path.join(rootDir, 'content', ...segments, 'meta.json');
    const raw = await fs.readFile(file, 'utf8').catch(() => {
      throw new Error(
        `Missing ${path.relative(rootDir, file)}, which content/meta.json lists.`
      );
    });

    return JSON.parse(raw).pages as string[];
  };

  const topLevel = await readMeta();
  const areaMeta = Object.fromEntries(
    await Promise.all(
      topLevel.map(async area => [area, await readMeta(area)] as const)
    )
  );
  const categories = readCategories(topLevel, areaMeta);

  // Every URL in the index is a promise that the `.md` exists, so check rather
  // than advertise a 404. A miss means `build:md` did not run first.
  const missing: string[] = [];
  await Promise.all(
    manifest.pages.map(page =>
      fs.access(path.join(publicDir, page.url)).catch(() => {
        missing.push(page.url);
      })
    )
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing generated markdown for ${missing.length} page(s): ${missing.slice(0, 5).join(', ')}`
    );
  }

  const index = buildIndex(manifest, categories);

  // `buildIndex` also links two things by hand that are not manifest pages, so
  // the check above cannot see them — which is how a link to a route that did
  // not exist shipped once already. Assert the source each one points at, and
  // that the index still links it, so the pair cannot drift apart silently.
  const handWritten: [url: string, source: string][] = [
    [
      `${manifest.baseUrl}/manifest.json`,
      path.join(publicDir, 'manifest.json'),
    ],
    [
      `${manifest.baseUrl}/releases/release-notes`,
      path.join(rootDir, 'content', 'releases', 'release-notes.mdx'),
    ],
  ];

  for (const [url, source] of handWritten) {
    if (!index.includes(url)) {
      throw new Error(`Expected llms.txt to link ${url}`);
    }
    await fs.access(source).catch(() => {
      throw new Error(
        `llms.txt links ${url}, but ${path.relative(rootDir, source)} does not exist`
      );
    });
  }

  await fs.writeFile(path.join(publicDir, 'llms.txt'), index);

  console.log(
    `✅ Built llms.txt (${manifest.pages.length} pages, ${Math.round(index.length / 1024)} KB) → public/`
  );
};

// Only when executed directly, so the builders above stay importable by tests.
const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  buildLlms().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
