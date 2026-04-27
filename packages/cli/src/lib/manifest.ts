import { type CacheOptions, fetchWithCache } from './cache.js';
import { docsUrl } from './config.js';

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
  version: string;
  generatedAt: string;
  baseUrl: string;
  categories: ManifestCategory[];
  pages: ManifestPage[];
}

export const loadManifest = async (
  options: CacheOptions = {}
): Promise<Manifest> => {
  const url = `${docsUrl()}/api/manifest.json`;
  const { value } = await fetchWithCache<Manifest>(
    url,
    text => JSON.parse(text) as Manifest,
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
