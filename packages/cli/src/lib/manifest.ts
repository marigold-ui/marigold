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
  // Top-level slug segment, e.g. 'foundations', 'patterns', 'getting-started'.
  category: string;
  description?: string;
}

/** @internal See {@link ManifestComponent}. */
export interface Manifest {
  version?: string;
  generatedAt?: string;
  baseUrl: string;
  // Published versions of the public packages, keyed by package name. Consumed
  // by `marigold doctor` to flag out-of-date installs. Optional: older cached
  // manifests predate this field.
  packages?: Record<string, string>;
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
  packages?: Record<string, string> | null;
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
        category: slugParts[0] ?? slug,
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
    packages: raw.packages ?? undefined,
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

// Shared "find the one thing the user meant" cascade over a flat list, keyed by
// a slug and a human title: exact slug/title → case-insensitive title →
// normalized (kebab/space/underscore-insensitive) slug or title → normalized
// slug tail. Used by the page and example resolvers so the match precedence
// lives in one place. (resolveComponent keeps its own copy: it walks a 2D
// category/component structure and normalizes the name only, not the slug.)
export const resolveByCascade = <T>(
  items: readonly T[],
  slugFor: (item: T) => string,
  titleFor: (item: T) => string,
  input: string
): T | null => {
  const needle = normalize(input);

  const exact = items.find(i => slugFor(i) === input || titleFor(i) === input);
  if (exact) return exact;

  const ci = items.find(i => titleFor(i).toLowerCase() === input.toLowerCase());
  if (ci) return ci;

  const norm = items.find(
    i => normalize(slugFor(i)) === needle || normalize(titleFor(i)) === needle
  );
  if (norm) return norm;

  const tail = items.find(
    i => normalize(slugFor(i).split('/').at(-1) ?? '') === needle
  );
  if (tail) return tail;

  return null;
};

export interface ResolveResult {
  component: ManifestComponent;
  category: ManifestCategory;
}

// Shared resolution cascade: exact (name or slug) → case-insensitive name →
// normalized name → normalized slug-tail. `name` is the human label, `slug`
// the path; both component and page resolution use the same four steps.
const matchCascade = <T>(
  items: T[],
  input: string,
  name: (item: T) => string,
  slug: (item: T) => string
): T | null => {
  const needle = normalize(input);

  // 1. exact slug or name match
  const exact = items.find(i => slug(i) === input || name(i) === input);
  if (exact) return exact;

  // 2. case-insensitive name match
  const ci = items.find(i => name(i).toLowerCase() === input.toLowerCase());
  if (ci) return ci;

  // 3. normalized name match (handles kebab, spaces, underscores)
  const norm = items.find(i => normalize(name(i)) === needle);
  if (norm) return norm;

  // 4. slug tail normalized
  const tail = items.find(
    i => normalize(slug(i).split('/').at(-1) ?? '') === needle
  );
  if (tail) return tail;

  return null;
};

export const resolveComponent = (
  manifest: Manifest,
  input: string
): ResolveResult | null => {
  const flat: Array<[ManifestCategory, ManifestComponent]> = [];
  for (const cat of manifest.categories) {
    for (const c of cat.components) flat.push([cat, c]);
  }

  const match = matchCascade(
    flat,
    input,
    ([, c]) => c.name,
    ([, c]) => c.slug
  );
  return match ? { category: match[0], component: match[1] } : null;
};

// Resolve a query to a standalone page (patterns, getting-started, foundations,
// …) — anything in the manifest that is not a component — so
// `marigold docs patterns/user-input/filter` and
// `marigold docs getting-started/examples-for-agents` work the same way a
// component lookup does.
export const resolvePage = (
  manifest: Manifest,
  input: string
): ManifestPage | null =>
  resolveByCascade(
    manifest.pages,
    p => p.slug,
    p => p.title,
    input
  );

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

export const suggestPages = (
  manifest: Manifest,
  input: string,
  limit = 3
): ManifestPage[] =>
  suggestByScore(
    manifest.pages,
    p => normalize(`${p.title} ${p.slug}`),
    input,
    limit
  );
