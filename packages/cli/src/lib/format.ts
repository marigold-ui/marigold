import pc from 'picocolors';
import type { PageDocs } from './docs.js';
import {
  type Manifest,
  type ManifestCategory,
  type ManifestComponent,
  type ManifestPage,
  normalize,
} from './manifest.js';
import { stripAnsi } from './strip-ansi.js';

export type OutputFormat = 'markdown' | 'json' | 'plain';

const renderMarkdownToTerminal = (md: string): string => {
  const lines = md.split('\n');
  const out: string[] = [];
  let inCodeBlock = false;
  const codeBuffer: string[] = [];

  const flushCode = () => {
    if (codeBuffer.length === 0) return;
    for (const line of codeBuffer) {
      out.push(pc.dim('│ ') + pc.cyan(line));
    }
    codeBuffer.length = 0;
  };

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCodeBlock) flushCode();
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }
    if (/^#\s+/.test(line)) {
      out.push(pc.bold(pc.yellow(line.replace(/^#\s+/, ''))));
      continue;
    }
    if (/^##\s+/.test(line)) {
      out.push('');
      out.push(pc.bold(pc.cyan(line.replace(/^##\s+/, ''))));
      continue;
    }
    if (/^###\s+/.test(line)) {
      out.push(pc.bold(line.replace(/^###\s+/, '')));
      continue;
    }
    // inline code
    const withInlineCode = line.replace(/`([^`]+)`/g, (_, code) =>
      pc.cyan(code)
    );
    // bold
    const withBold = withInlineCode.replace(/\*\*([^*]+)\*\*/g, (_, t) =>
      pc.bold(t)
    );
    out.push(withBold);
  }

  flushCode();
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
};

export const formatDocs = (docs: PageDocs, format: OutputFormat): string => {
  if (format === 'json') {
    return JSON.stringify(
      {
        kind: docs.kind,
        name: docs.name,
        slug: docs.slug,
        category: docs.category,
        description: docs.description,
        section: docs.section,
        markdown: docs.markdown,
        url: docs.url,
      },
      null,
      2
    );
  }
  if (format === 'plain') {
    return stripAnsi(docs.markdown);
  }
  return renderMarkdownToTerminal(docs.markdown);
};

export interface ListFilter {
  category?: string;
  search?: string;
}

const matchesFilter = (
  category: ManifestCategory,
  component: ManifestComponent,
  filter: ListFilter
): boolean => {
  if (
    filter.category &&
    normalize(category.name) !== normalize(filter.category)
  )
    return false;
  if (filter.search) {
    const needle = filter.search.toLowerCase();
    const haystack =
      `${component.name} ${component.description ?? ''}`.toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  return true;
};

const matchesPageFilter = (page: ManifestPage, filter: ListFilter): boolean => {
  if (
    filter.category &&
    normalize(page.category) !== normalize(filter.category)
  )
    return false;
  if (filter.search) {
    const needle = filter.search.toLowerCase();
    const haystack =
      `${page.title} ${page.slug} ${page.description ?? ''}`.toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  return true;
};

// Humanize a top-level slug segment into a group heading, e.g.
// 'getting-started' → 'Getting Started'.
const pageGroupLabel = (category: string): string =>
  category
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

interface PageGroup {
  category: string;
  label: string;
  pages: ManifestPage[];
}

const groupPages = (pages: ManifestPage[]): PageGroup[] => {
  const map = new Map<string, ManifestPage[]>();
  for (const page of pages) {
    const group = map.get(page.category) ?? [];
    group.push(page);
    map.set(page.category, group);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, group]) => ({
      category,
      label: pageGroupLabel(category),
      pages: group,
    }));
};

export const formatList = (
  manifest: Manifest,
  filter: ListFilter,
  format: OutputFormat
): string => {
  const filtered: ManifestCategory[] = manifest.categories
    .map(cat => ({
      ...cat,
      components: cat.components.filter(c => matchesFilter(cat, c, filter)),
    }))
    .filter(cat => cat.components.length > 0);

  const filteredPages = manifest.pages.filter(p =>
    matchesPageFilter(p, filter)
  );
  const pageGroups = groupPages(filteredPages);

  if (format === 'json') {
    return JSON.stringify(
      {
        version: manifest.version,
        baseUrl: manifest.baseUrl,
        categories: filtered,
        pages: filteredPages.map(p => ({
          title: p.title,
          slug: p.slug,
          category: p.category,
          description: p.description,
        })),
      },
      null,
      2
    );
  }

  if (filtered.length === 0 && pageGroups.length === 0) {
    return 'No components or pages match the filter.\n';
  }

  const lines: string[] = [];
  for (const cat of filtered) {
    const label = format === 'plain' ? cat.label : pc.bold(pc.cyan(cat.label));
    lines.push('');
    lines.push(label);
    for (const c of cat.components) {
      const name = format === 'plain' ? c.name : pc.bold(c.name);
      const desc = c.description ? ` — ${c.description}` : '';
      lines.push(`  ${name}${desc}`);
    }
  }
  for (const group of pageGroups) {
    const label =
      format === 'plain' ? group.label : pc.bold(pc.cyan(group.label));
    lines.push('');
    lines.push(label);
    for (const p of group.pages) {
      const slug = format === 'plain' ? p.slug : pc.bold(p.slug);
      const desc = p.description ? ` — ${p.description}` : '';
      lines.push(`  ${slug}${desc}`);
    }
  }
  lines.push('');
  return lines.join('\n');
};
