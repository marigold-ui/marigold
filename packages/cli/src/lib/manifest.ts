import { type CacheOptions, fetchWithCache, readCacheSync } from './cache.js';
import { docsUrl } from './config.js';
import { sanitizeRemote } from './strip-ansi.js';

/**
 * @internal Re-exported from `@marigold/cli` for the in-tree MCP server only.
 * Not part of the public API surface — shape may change without a major bump.
 */
export interface ManifestComponent {
  name: string;
  slug: string;
  description?: string;
  badge?: string;
}

/** @internal See {@link ManifestComponent}. */
export interface ManifestCategory {
  name: string;
  label: string;
  components: ManifestComponent[];
}

/** @internal See {@link ManifestComponent}. */
export interface ManifestPage {
  title: string;
  slug: string;
  description?: string;
}

/** @internal See {@link ManifestComponent}. */
export interface Manifest {
  version?: string;
  generatedAt?: string;
  baseUrl: string;
  categories: ManifestCategory[];
  pages: ManifestPage[];
}

// Shape of the static manifest emitted by docs/scripts/build-manifest.mjs.
// PR #5373 replaced the dynamic /api/manifest.json route handler with a
// flat list of pages served from public/manifest.json.
interface RawManifestPage {
  name: string | null;
  slug: string;
  category: string;
  description: string | null;
  badge: string | null;
  url: string;
}

interface RawManifest {
  version?: string | null;
  generatedAt?: string | null;
  baseUrl: string;
  pages: RawManifestPage[];
}

const CATEGORY_LABELS: Record<string, string> = {
  application: 'Application',
  layout: 'Layout',
  actions: 'Actions',
  form: 'Form',
  collection: 'Collection',
  navigation: 'Navigation',
  overlay: 'Overlay',
  content: 'Content',
  formatters: 'Formatters',
  'hooks-and-utils': 'Hooks and Utils',
};

const clean = (value: string | null | undefined): string | undefined =>
  value == null ? undefined : sanitizeRemote(value);

const transformManifest = (raw: RawManifest): Manifest => {
  const categoryMap = new Map<string, ManifestComponent[]>();
  const standalonePages: ManifestPage[] = [];

  for (const page of raw.pages) {
    const slug = sanitizeRemote(page.slug);
    const slugParts = slug.split('/');
    if (slugParts[0] === 'components' && slugParts.length >= 3) {
      const categoryName = slugParts[1];
      const components = categoryMap.get(categoryName) ?? [];
      components.push({
        name: clean(page.name) ?? slugParts.at(-1) ?? slug,
        slug,
        description: clean(page.description),
        badge: clean(page.badge),
      });
      categoryMap.set(categoryName, components);
    } else {
      standalonePages.push({
        title: clean(page.name) ?? slug,
        slug,
        description: clean(page.description),
      });
    }
  }

  const categories: ManifestCategory[] = [...categoryMap.entries()]
    .map(([name, components]) => ({
      name,
      label: CATEGORY_LABELS[name] ?? name,
      components: components.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  standalonePages.sort((a, b) => a.slug.localeCompare(b.slug));

  return {
    version: clean(raw.version),
    generatedAt: clean(raw.generatedAt),
    baseUrl: raw.baseUrl,
    categories,
    pages: standalonePages,
  };
};

export interface LoadManifestResult {
  manifest: Manifest;
  cacheHit: boolean;
}

export const loadManifest = async (
  options: CacheOptions = {}
): Promise<LoadManifestResult> => {
  const url = `${docsUrl()}/manifest.json`;
  const { value, hit } = await fetchWithCache<Manifest>(
    url,
    text => transformManifest(JSON.parse(text) as RawManifest),
    options
  );
  return { manifest: value, cacheHit: hit };
};

// Synchronous, never-throws cache-only loader. Used by tab completion where
// network I/O is unacceptable and any exception would land in the user's shell.
// Returns null on missing or malformed cache.
export const loadManifestSync = (): Manifest | null => {
  try {
    const text = readCacheSync(`${docsUrl()}/manifest.json`);
    if (text === null) return null;
    return transformManifest(JSON.parse(text) as RawManifest);
  } catch {
    return null;
  }
};

export const normalize = (s: string): string =>
  s.toLowerCase().replace(/[\s_-]+/g, '');

export interface ResolveResult {
  component: ManifestComponent;
  category: ManifestCategory;
}

export const resolveComponent = (
  manifest: Manifest,
  input: string
): ResolveResult | null => {
  const needle = normalize(input);
  const flat: Array<[ManifestCategory, ManifestComponent]> = [];
  for (const cat of manifest.categories) {
    for (const c of cat.components) flat.push([cat, c]);
  }

  // 1. exact slug or name match
  const exact = flat.find(([, c]) => c.slug === input || c.name === input);
  if (exact) return { category: exact[0], component: exact[1] };

  // 2. case-insensitive name match
  const ci = flat.find(([, c]) => c.name.toLowerCase() === input.toLowerCase());
  if (ci) return { category: ci[0], component: ci[1] };

  // 3. normalized match (handles kebab, spaces, underscores)
  const norm = flat.find(([, c]) => normalize(c.name) === needle);
  if (norm) return { category: norm[0], component: norm[1] };

  // 4. slug tail normalized
  const tail = flat.find(([, c]) => {
    const last = c.slug.split('/').at(-1) ?? '';
    return normalize(last) === needle;
  });
  if (tail) return { category: tail[0], component: tail[1] };

  return null;
};

// Generic "did you mean" scorer: substring match (+2) with a weak 3-char
// prefix boost (+1), highest score first, capped at `limit`. Shared by the
// component and example suggesters so the heuristic lives in one place.
export const suggestByScore = <T>(
  items: readonly T[],
  haystackFor: (item: T) => string,
  input: string,
  limit = 3
): T[] => {
  const needle = normalize(input);
  return items
    .map(item => {
      const haystack = haystackFor(item);
      let score = 0;
      if (haystack.includes(needle)) score += 2;
      if (needle.length > 2 && haystack.startsWith(needle.slice(0, 3)))
        score += 1;
      return { item, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.item);
};

export const suggestComponents = (
  manifest: Manifest,
  input: string,
  limit = 3
): ManifestComponent[] => {
  const flat: ManifestComponent[] = [];
  for (const cat of manifest.categories) flat.push(...cat.components);
  return suggestByScore(flat, c => normalize(c.name), input, limit);
};
