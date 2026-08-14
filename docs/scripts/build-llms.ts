#!/usr/bin/env tsx
// Generate public/llms.txt and public/llms-full.txt — the conventional
// discovery entry points for AI agents (https://llmstxt.org).
//
// Both are indexes over what the docs build already emits: `build-manifest`
// writes the page index, `build-md` writes a per-page `.md` with demos inlined
// as source and props tables expanded. So this runs last and reads those files
// rather than parsing MDX a second time.
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
      if (!entry.startsWith('...')) continue;

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
    `- Release notes: ${baseUrl}/releases/release-notes (feed: ${baseUrl}/rss.xml)`,
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
  const readMeta = async (...segments: string[]) =>
    JSON.parse(
      await fs.readFile(
        path.join(rootDir, 'content', ...segments, 'meta.json'),
        'utf8'
      )
    ).pages as string[];

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
