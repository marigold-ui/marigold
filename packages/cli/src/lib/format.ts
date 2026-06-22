import pc from 'picocolors';
import type { PageDocs } from './docs.js';
import type { ExampleDetail, ExampleSummary } from './examples.js';
import {
  type Manifest,
  type ManifestCategory,
  type ManifestComponent,
  type ManifestPage,
  normalize,
} from './manifest.js';
import type { SearchResult } from './search.js';
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

// Shared list filter: optional category match (normalized) + optional search
// substring over a caller-supplied haystack. Both component and page filtering
// use the same two checks.
const matchesListFilter = (
  category: string,
  haystack: string,
  filter: ListFilter
): boolean => {
  if (filter.category && normalize(category) !== normalize(filter.category))
    return false;
  if (
    filter.search &&
    !haystack.toLowerCase().includes(filter.search.toLowerCase())
  )
    return false;
  return true;
};

const matchesFilter = (
  category: ManifestCategory,
  component: ManifestComponent,
  filter: ListFilter
): boolean =>
  matchesListFilter(
    category.name,
    `${component.name} ${component.description ?? ''}`,
    filter
  );

const matchesPageFilter = (page: ManifestPage, filter: ListFilter): boolean =>
  matchesListFilter(
    page.category,
    `${page.title} ${page.slug} ${page.description ?? ''}`,
    filter
  );

// Display-label overrides for page-group headings keyed by their top-level
// slug segment. `components/`-rooted standalone pages (e.g. components/form)
// would otherwise surface a generic "Components" group alongside the real
// component taxonomy.
const PAGE_GROUP_LABELS: Record<string, string> = {
  components: 'Form Overview',
};

// Humanize a top-level slug segment into a group heading, e.g.
// 'getting-started' → 'Getting Started'.
const pageGroupLabel = (category: string): string =>
  PAGE_GROUP_LABELS[category] ??
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

  const pageGroups = groupPages(filteredPages);

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

export const formatExamplesList = (
  examples: ExampleSummary[],
  format: OutputFormat
): string => {
  if (format === 'json') {
    return JSON.stringify({ examples }, null, 2);
  }

  if (examples.length === 0) {
    return 'No examples available.\n';
  }

  const lines: string[] = [];
  for (const e of examples) {
    const slug = format === 'plain' ? e.slug : pc.bold(e.slug);
    lines.push('');
    lines.push(`${slug} — ${e.title}`);
    lines.push(`  ${e.brief}`);
    if (e.patterns.length > 0) {
      const patterns = e.patterns.join(', ');
      lines.push(
        `  patterns: ${format === 'plain' ? patterns : pc.dim(patterns)}`
      );
    }
  }
  const hint = 'Get one with: marigold examples get <slug>';
  lines.push('');
  lines.push(format === 'plain' ? hint : pc.dim(hint));
  lines.push('');
  return lines.join('\n');
};

const exampleToMarkdown = (example: ExampleDetail): string => {
  const lines: string[] = [];
  lines.push(`# ${example.title}`);
  lines.push('');
  lines.push(example.brief);
  lines.push('');

  if (example.patterns.length > 0) {
    lines.push('## Patterns');
    // Pattern refs are slugs under docs/content/patterns/, so the fetchable
    // doc slug is `patterns/<ref>`.
    for (const p of example.patterns) {
      lines.push(
        `- \`${p}\` — fetch the narrative with \`marigold docs patterns/${p}\``
      );
    }
    lines.push('');
  }

  if (example.peerDeps.length > 0) {
    lines.push('## Peer dependencies');
    lines.push('');
    lines.push('Install alongside `@marigold/components`:');
    for (const d of example.peerDeps) lines.push(`- \`${d}\``);
    lines.push('');
  }

  if (example.mockData.length > 0) {
    lines.push('## Mock data');
    lines.push('');
    lines.push(
      "These aliases are docs-internal. Replace them with your app's own data " +
        'sources matching these shapes:'
    );
    lines.push('');
    for (const m of example.mockData) {
      lines.push(`### \`${m.alias}\``);
      lines.push('```ts');
      lines.push(m.shape.trimEnd());
      lines.push('```');
      lines.push('');
    }
  }

  lines.push('## Files');
  lines.push('');
  if (example.keyFiles.length > 0) {
    lines.push(
      `Key files: ${example.keyFiles.map(f => `\`${f}\``).join(', ')}`
    );
  }
  if (example.scaffoldingFiles.length > 0) {
    lines.push(
      `Scaffolding (framework glue, usually replaced): ${example.scaffoldingFiles
        .map(f => `\`${f}\``)
        .join(', ')}`
    );
  }
  lines.push('');

  for (const file of example.files) {
    const lang = file.path.endsWith('.tsx') ? 'tsx' : 'ts';
    lines.push(`### ${file.path}`);
    lines.push(`\`\`\`${lang}`);
    lines.push(file.source.trimEnd());
    lines.push('```');
    lines.push('');
  }

  lines.push('---');
  lines.push(
    'Before adapting, read the framework-transformation note: ' +
      '`marigold docs getting-started/examples-for-agents`.'
  );
  lines.push('');
  return lines.join('\n');
};

export const formatExample = (
  example: ExampleDetail,
  format: OutputFormat
): string => {
  if (format === 'json') {
    // Serialize the whole payload: ExampleDetail is exactly the public JSON
    // contract, so emitting it directly stays in sync if the type gains a field.
    return JSON.stringify(example, null, 2);
  }

  const md = exampleToMarkdown(example);
  if (format === 'plain') {
    return md;
  }
  return renderMarkdownToTerminal(md);
};

export const formatSearchResults = (
  results: SearchResult[],
  query: string,
  baseUrl: string,
  format: OutputFormat
): string => {
  if (format === 'json') {
    // Exactly the documented contract: name, slug, score, hits[].
    return JSON.stringify(
      results.map(r => ({
        name: r.name,
        slug: r.slug,
        score: r.score,
        hits: r.hits.map(h => ({ heading: h.heading, snippet: h.snippet })),
      })),
      null,
      2
    );
  }

  if (results.length === 0) {
    return `No components match "${query}".\n`;
  }

  const plain = format === 'plain';
  // In plain mode every field is emitted bare; otherwise apply its color.
  const paint = (text: string, color: (s: string) => string) =>
    plain ? text : color(text);
  const lines: string[] = [];
  for (const r of results) {
    // Headline the most relevant section; fall back to the description when the
    // match came only from the title/headings (no prose snippet to show).
    const top = r.hits[0];
    const name = paint(r.name, pc.bold);
    lines.push('');
    lines.push(top ? `${name} — ${top.heading}` : name);
    const snippet = top?.snippet ?? r.description ?? '';
    if (snippet) lines.push(`  ${paint(snippet, pc.dim)}`);
    const url = `${baseUrl}/${r.slug}`;
    lines.push(`  ${paint(url, pc.cyan)}`);
  }
  lines.push('');
  return lines.join('\n');
};
