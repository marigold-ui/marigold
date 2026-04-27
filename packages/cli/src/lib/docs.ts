import { type CacheOptions, fetchWithCache } from './cache.js';
import { docsUrl } from './config.js';
import {
  type ManifestCategory,
  type ManifestComponent,
  loadManifest,
  resolveComponent,
  suggestComponents,
} from './manifest.js';

export type Section = 'props' | 'usage' | 'examples' | 'all';

export interface ComponentDocs {
  component: ManifestComponent;
  category: ManifestCategory;
  section: Section;
  markdown: string;
  url: string;
  cacheHit: boolean;
}

const sectionHeadings: Record<Exclude<Section, 'all'>, RegExp[]> = {
  props: [/^##\s+Props\b/im, /^##\s+API\b/im],
  usage: [/^##\s+Usage\b/im, /^##\s+Guidelines\b/im],
  examples: [/^##\s+Examples?\b/im, /^##\s+Appearance\b/im],
};

export const sliceSection = (
  markdown: string,
  section: Exclude<Section, 'all'>
): string => {
  const patterns = sectionHeadings[section];
  for (const pattern of patterns) {
    const match = pattern.exec(markdown);
    if (!match) continue;
    const start = match.index;
    const rest = markdown.slice(start + match[0].length);
    const nextHeading = /\n##\s+\S/.exec(rest);
    const end = nextHeading
      ? start + match[0].length + nextHeading.index
      : markdown.length;
    return markdown.slice(start, end).trim() + '\n';
  }
  return `_Section "${section}" not found in docs._\n`;
};

export interface GetComponentDocsOptions extends CacheOptions {
  section?: Section;
}

export const getComponentDocs = async (
  input: string,
  options: GetComponentDocsOptions = {}
): Promise<ComponentDocs> => {
  const manifest = await loadManifest(options);
  const resolved = resolveComponent(manifest, input);

  if (!resolved) {
    const suggestions = suggestComponents(manifest, input);
    const hint = suggestions.length
      ? ` Did you mean: ${suggestions.map(s => s.name).join(', ')}?`
      : '';
    throw new Error(`Component "${input}" not found.${hint}`);
  }

  const { component, category } = resolved;
  // Use the pretty URL form (rewritten by Next to /api/md/...). The /api/md
  // route behaves differently when hit directly vs through the rewrite in dev.
  const url = `${docsUrl()}/${component.slug}.md`;
  const { value: markdown, hit } = await fetchWithCache<string>(
    url,
    text => text,
    options
  );

  const section = options.section ?? 'all';
  const sliced = section === 'all' ? markdown : sliceSection(markdown, section);

  return {
    component,
    category,
    section,
    markdown: sliced,
    url,
    cacheHit: hit,
  };
};
