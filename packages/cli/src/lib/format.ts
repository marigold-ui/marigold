import pc from 'picocolors';
import type { ComponentDocs } from './docs.js';
import type {
  Manifest,
  ManifestCategory,
  ManifestComponent,
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

  for (const rawLine of lines) {
    const line = rawLine;
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

export const formatDocs = (
  docs: ComponentDocs,
  format: OutputFormat
): string => {
  if (format === 'json') {
    return JSON.stringify(
      {
        name: docs.component.name,
        slug: docs.component.slug,
        category: docs.category.name,
        description: docs.component.description,
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
  if (filter.category && category.name !== filter.category.toLowerCase())
    return false;
  if (filter.search) {
    const needle = filter.search.toLowerCase();
    const haystack =
      `${component.name} ${component.description ?? ''}`.toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  return true;
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

  if (format === 'json') {
    return JSON.stringify(
      {
        version: manifest.version,
        baseUrl: manifest.baseUrl,
        categories: filtered,
      },
      null,
      2
    );
  }

  if (filtered.length === 0) {
    return 'No components match the filter.\n';
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
  lines.push('');
  return lines.join('\n');
};
