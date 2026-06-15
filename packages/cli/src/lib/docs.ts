import { type CacheOptions, fetchWithCache } from './cache.js';
import { docsUrl } from './config.js';
import {
  type Manifest,
  type ManifestPage,
  type ResolveResult,
  loadManifest,
  resolveComponent,
  resolvePage,
  suggestComponents,
  suggestPages,
} from './manifest.js';
import { sanitizeRemote } from './strip-ansi.js';

export type Section = 'props' | 'usage' | 'examples' | 'all';

// Normalized result covering both components and standalone docs pages.
export interface PageDocs {
  kind: 'component' | 'page';
  name: string;
  slug: string;
  category: string;
  description?: string;
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

export interface GetPageDocsOptions extends CacheOptions {
  section?: Section;
}

type QueryResult = Pick<
  PageDocs,
  'kind' | 'name' | 'slug' | 'category' | 'description'
>;

const fromComponent = (r: ResolveResult): QueryResult => ({
  kind: 'component',
  name: r.component.name,
  slug: r.component.slug,
  category: r.category.name,
  description: r.component.description,
});

const fromPage = (p: ManifestPage): QueryResult => ({
  kind: 'page',
  name: p.title,
  slug: p.slug,
  category: p.category,
  description: p.description,
});

// Resolve the positional query to either a component or a standalone page.
// `components/…` slugs try the component cascade first, then fall through to
// the page resolver (e.g. the `components/form` overview page, which `list`
// advertises but is not a 3-segment component). Everything else tries the
// component cascade, then falls back to pages.
const resolveQuery = (
  manifest: Manifest,
  input: string
): QueryResult | null => {
  const component = resolveComponent(manifest, input);
  if (component) return fromComponent(component);

  const page = resolvePage(manifest, input);
  return page ? fromPage(page) : null;
};

export const getPageDocs = async (
  input: string,
  options: GetPageDocsOptions = {}
): Promise<PageDocs> => {
  const { manifest } = await loadManifest(options);
  const resolved = resolveQuery(manifest, input);

  if (!resolved) {
    const suggestions = [
      ...suggestComponents(manifest, input).map(c => c.name),
      ...suggestPages(manifest, input).map(p => p.slug),
    ].slice(0, 3);
    const hint = suggestions.length
      ? ` Did you mean: ${suggestions.join(', ')}?`
      : '';
    throw new Error(`No docs page "${input}" found.${hint}`);
  }

  // Use the pretty URL form (rewritten by Next to /api/md/...). The /api/md
  // route behaves differently when hit directly vs through the rewrite in dev.
  const url = `${docsUrl()}/${resolved.slug}.md`;
  // Sanitize at the boundary: remote markdown can contain terminal escape
  // sequences (OSC 52 clipboard, cursor moves, DCS) that would otherwise hit
  // the user's terminal via the markdown / plain output paths.
  const { value: markdown, hit } = await fetchWithCache<string>(
    url,
    text => sanitizeRemote(text),
    options
  );

  const section = options.section ?? 'all';
  let sliced: string;
  if (section === 'all') {
    sliced = markdown;
  } else if (resolved.kind === 'page' && section === 'props') {
    // "props" is meaningless for non-component pages; emit a page-aware note
    // instead of a generic "section not found" placeholder.
    sliced = `_"props" is a component-only section._\n`;
  } else {
    sliced = sliceSection(markdown, section);
  }

  return {
    ...resolved,
    section,
    markdown: sliced,
    url,
    cacheHit: hit,
  };
};
