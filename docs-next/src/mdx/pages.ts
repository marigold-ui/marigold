import path from 'node:path';
import fs from 'fs-extra';
import { globby } from 'globby';

import type {
  NavigationMenuItem,
  NavigationMenuCategory,
  NavigationTree,
} from '~/components';
import { CONTENT_PATH, NAVIGATION_CONFIG } from '~/config';
import { getFrontmatter } from './serialize';

/**
 * Get list of all mdx page files.
 */
export const getAllMdxFiles = async () =>
  await globby([`${CONTENT_PATH}/**/*.mdx`]);

/**
 * Get content of mdx file by passing a slug.
 */
export const getMdxFromSlug = async (slug: string[]) => {
  const file = path.join(CONTENT_PATH, slug.join('/'));

  // Read file with "index" fallback
  let source: string;
  try {
    source = await fs.readFile(`${file}.mdx`, 'utf8');
  } catch {
    source = await fs.readFile(`${file}/index.mdx`, 'utf8');
  }
  return source;
};

/**
 * Generates a "slug" from a mdx file path. Slugs are always
 * absolute paths that don't include the starting backslash
 * (e.g. "foo/bar" not "/foo/bar").
 */
export const toSlug = (file: string) =>
  path.relative(CONTENT_PATH, file.replace(/\.mdx?$/, ''));

/**
 * Get all paths for the mdx pages.
 */
export const getMdxPaths = async () => {
  const files = await getAllMdxFiles();

  const paths = files
    .map(toSlug)
    .map(slug => ({ params: { slug: slug.split('/') } }));

  // Add path alias: "/index" -> "/"
  const root = paths.find(path => path.params.slug === ['index']);
  if (root) {
    paths.push({ params: { slug: [] } });
  }

  return paths;
};

/**
 * Sort a list of objects by their `order` prop.
 */
const sortByOrder = (items: { order?: number }[]) => {
  items.sort((a, b) => (a.order || 9999999999) - (b.order || 9999999999));
};

export const createNavigationTree = async (): Promise<NavigationTree> => {
  // Get all information for MDX pages (their frontmatter)
  const files = await getAllMdxFiles();
  const items = await Promise.all(
    files.map(async filePath => {
      const frontmatter = await getFrontmatter<NavigationMenuItem>(filePath);
      return {
        ...frontmatter,
        slug: toSlug(filePath),
      };
    })
  );

  const categories: NavigationMenuCategory[] = [];
  const topItems: NavigationMenuItem[] = [];

  items.forEach(item => {
    const { slug, group } = item;
    const hasCategory = slug.includes('/');

    if (!hasCategory) {
      topItems.push({
        title: item.title,
        slug,
      });
      return;
    }

    // Assign to a navigation category
    const [category] = slug.split('/');
    let itemCategory = categories.find(
      item => 'name' in item && item.name === category
    ) as NavigationMenuCategory | undefined;

    if (!itemCategory) {
      categories.push({
        name: category,
        items: [],
        groups: [],
      });
      itemCategory = categories[
        categories.length - 1
      ] as NavigationMenuCategory;
    }

    if (!group) {
      itemCategory.items.push(item);
      return;
    }

    // Assign to a navigation category group
    let itemGroup = itemCategory.groups.find(({ name }) => name === group);
    if (!itemGroup) {
      itemCategory.groups.push({
        name: group,
        items: [],
      });
      itemGroup = itemCategory.groups[itemCategory.groups.length - 1];
    }
    itemGroup.items.push(item);
  });

  // Sort categories based on config
  categories.sort((a, b) => {
    const aIndex = NAVIGATION_CONFIG.order.findIndex(
      item => item.name === a.name
    );
    const bIndex = NAVIGATION_CONFIG.order.findIndex(
      item => item.name === b.name
    );
    return aIndex - bIndex;
  });

  categories.forEach(category => {
    // Sort items (without group) by order
    sortByOrder(category.items);

    const groups = category.groups;

    // Sort items (within group) by order
    groups.forEach(group => {
      sortByOrder(group.items);
    });

    // Sort groups based on config
    const order = NAVIGATION_CONFIG.order.find(c => c.name === category.name)!;

    if (!order.groups) {
      return;
    }

    groups.sort((a, b) => {
      const aIndex = order.groups.indexOf(a.name);
      const bIndex = order.groups.indexOf(b.name);

      return aIndex - bIndex;
    });
  });

  sortByOrder(topItems);

  return [...topItems, ...categories];
};
