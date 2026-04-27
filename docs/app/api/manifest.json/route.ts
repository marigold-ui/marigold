import { source } from '@/lib/source';
import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const EXCLUDED_PREFIXES = ['releases'];
const EXCLUDED_SEGMENTS = ['__internal__'];

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

const readComponentsVersion = (): string => {
  try {
    const pkgPath = path.resolve(
      process.cwd(),
      '../packages/components/package.json'
    );
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as {
      version?: string;
    };
    return pkg.version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
};

interface Component {
  name: string;
  slug: string;
  description?: string;
  badge?: string | null;
}

interface Category {
  name: string;
  label: string;
  components: Component[];
}

interface Page {
  title: string;
  slug: string;
  description?: string;
  badge?: string | null;
}

export async function GET() {
  const pages = source.getPages();

  const categoryMap = new Map<string, Component[]>();
  const standalonePages: Page[] = [];

  for (const page of pages) {
    if (page.slugs.length === 0) continue;
    if (EXCLUDED_PREFIXES.includes(page.slugs[0])) continue;
    if (page.slugs.some(s => EXCLUDED_SEGMENTS.includes(s))) continue;

    const slug = page.slugs.join('/');
    const badge = (page.data as unknown as { badge?: string }).badge ?? null;

    if (page.slugs[0] === 'components' && page.slugs.length >= 3) {
      const categoryName = page.slugs[1];
      const component: Component = {
        name: page.data.title,
        slug,
        description: page.data.description,
        badge,
      };
      const existing = categoryMap.get(categoryName) ?? [];
      existing.push(component);
      categoryMap.set(categoryName, existing);
    } else {
      standalonePages.push({
        title: page.data.title,
        slug,
        description: page.data.description,
        badge,
      });
    }
  }

  const categories: Category[] = [...categoryMap.entries()]
    .map(([name, components]) => ({
      name,
      label: CATEGORY_LABELS[name] ?? name,
      components: components.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  standalonePages.sort((a, b) => a.slug.localeCompare(b.slug));

  return NextResponse.json({
    version: readComponentsVersion(),
    generatedAt: new Date().toISOString(),
    baseUrl: 'https://www.marigold-ui.io',
    categories,
    pages: standalonePages,
  });
}
