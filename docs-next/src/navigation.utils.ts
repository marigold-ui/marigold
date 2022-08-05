import path from 'node:path';

import fs from 'fs-extra';
import { globby } from 'globby';
import { serialize } from 'next-mdx-remote/serialize';

import { CONTENT_PATH, NAVIGATION_CONFIG } from '~/config';
import type { NavigationMenuCategory, NavigationMenuItem } from '~/components';

/**
 * Generates a "slug" from a file path. Slugs are always absolute paths that
 * don't include the starting backslash (e.g. "foo/bar" not "/foo/bar").
 */
const toSlug = (val: string) =>
  path.relative(CONTENT_PATH, val.replace(/\.mdx?$/, ''));

const sortByOrder = (items: NavigationMenuItem[]) => {
  items.sort((a, b) => (a.order || 9999999999) - (b.order || 9999999999));
};

export const getNavigation = async () => {
  // Get all information for MDX pages (their frontmatter)
  const contentFilePaths = await globby([`${CONTENT_PATH}/**/*.mdx`]);
  const items = await Promise.all(
    contentFilePaths.map(async filePath => {
      const source = await fs.readFile(filePath, 'utf8');
      const { frontmatter } = await serialize(source, {
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
        parseFrontmatter: true,
      });

      return {
        slug: toSlug(filePath),
        ...(frontmatter as any),
      } as NavigationMenuItem;
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
