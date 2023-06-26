// @ts-check
import path from 'node:path';
import { globby } from 'globby';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

const toSlug = (file, from) => path.relative(from, file.replace(/\.mdx?$/, ''));

/**
 * @typedef {object} Frontmatter
 * @prop [title] string
 * @prop [group] string
 */

/**
 * @param {string} filePath
 * @return {Promise<Frontmatter>} frontmatter
 */
const getFrontmatter = async filePath => {
  const file = await read(filePath);
  matter(file);
  return file.data.matter || {};
};

const sortByOrder = items => {
  items.sort((a, b) => (a.order || 9999999999) - (b.order || 9999999999));
};

/**
 * @typedef {object} NavigationOptions
 * @prop {string} pages directory to look for MDX pages (should usually point to next's pages directory)
 * @prop {{ name: string, groups?: string[] }[]} order ordering of the navigation
 */

/**
 *
 * @param {NavigationOptions} options
 */
const createNavigationTree = async ({ pages, order }) => {
  // Get all information for MDX pages (their frontmatter)
  const files = await globby([`${pages}/**/*.mdx`]);
  const items = await Promise.all(
    files.map(async filePath => {
      const frontmatter = await getFrontmatter(filePath);
      return {
        ...frontmatter,
        slug: toSlug(filePath, pages),
      };
    })
  );

  const categories = [];
  const topItems = [];

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
    const [categoryName] = slug.split('/');
    let itemCategory = categories.find(
      item => 'name' in item && item.name === categoryName
    );

    if (!itemCategory) {
      categories.push({
        name: categoryName,
        items: [],
        groups: [],
      });
      itemCategory = categories[categories.length - 1];
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
    const aIndex = order.findIndex(item => item.name === a.name);
    const bIndex = order.findIndex(item => item.name === b.name);
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
    const config = order.find(c => c.name === category.name);

    if (!config?.groups) {
      return;
    }

    groups.sort((a, b) => {
      // @ts-ignore
      const aIndex = config.groups.indexOf(a.name);
      // @ts-ignore
      const bIndex = config.groups.indexOf(b.name);

      return aIndex - bIndex;
    });
  });

  sortByOrder(topItems);

  return [...topItems, ...categories];
};

export default createNavigationTree;
