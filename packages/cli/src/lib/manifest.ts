import { type CacheOptions, fetchWithCache } from './cache.js';
import { docsUrl } from './config.js';
import { sanitizeRemote } from './strip-ansi.js';

export interface ManifestComponent {
  name: string;
  slug: string;
  description?: string;
  badge?: string;
}

export interface ManifestCategory {
  name: string;
  label: string;
  components: ManifestComponent[];
}

export interface ManifestPage {
  title: string;
  slug: string;
  description?: string;
}

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
    baseUrl: raw.baseUrl,
    categories,
    pages: standalonePages,
  };
};

export const loadManifest = async (
  options: CacheOptions = {}
): Promise<Manifest> => {
  const url = `${docsUrl()}/manifest.json`;
  const { value } = await fetchWithCache<Manifest>(
    url,
    text => transformManifest(JSON.parse(text) as RawManifest),
    options
  );
  return value;
};

const normalize = (s: string): string =>
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

export const suggestComponents = (
  manifest: Manifest,
  input: string,
  limit = 3
): ManifestComponent[] => {
  const needle = normalize(input);
  const flat: ManifestComponent[] = [];
  for (const cat of manifest.categories) flat.push(...cat.components);

  const scored = flat
    .map(c => {
      const name = normalize(c.name);
      let score = 0;
      if (name.includes(needle)) score += 2;
      if (needle.length > 2 && name.startsWith(needle.slice(0, 3))) score += 1;
      return { c, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.c);

  return scored;
};
