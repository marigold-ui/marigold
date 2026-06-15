import pc from 'picocolors';
import type { ComponentDocs } from './docs.js';
import type { ExampleDetail, ExampleSummary } from './examples.js';
import {
  type Manifest,
  type ManifestCategory,
  type ManifestComponent,
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
    for (const p of example.patterns) {
      lines.push(
        `- \`${p}\` — fetch the narrative with \`marigold docs ${p}\``
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
