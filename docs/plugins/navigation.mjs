// @ts-check
import path from 'node:path';
import { globby } from 'globby';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

const NAVIGATION_CONFIG = {
  order: [
    { name: 'introduction' },
    { name: 'foundation' },
    {
      name: 'components',
      groups: [
        'Layout',
        'Forms',
        'Collections',
        'Overlay',
        'Content',
        'Application',
      ],
    },
    { name: 'develop' },
  ],
  links: [
    {
      title: 'Github',
      url: 'https://github.com/marigold-ui/marigold/',
    },
    {
      title: 'Issues',
      url: 'https://github.com/marigold-ui/marigold/issues',
    },
    {
      title: 'Changelog',
      url: 'https://github.com/marigold-ui/marigold/blob/main/packages/components/CHANGELOG.md',
    },
    {
      title: 'Slack Channel',
      url: 'https://reservix.slack.com/archives/C02727BNZ3J',
    },
  ],
};

const toSlug = (file, from) => path.relative(from, file.replace(/\.mdx?$/, ''));

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
 * @prop {string} directory directory to look for MDX pages (should usually point to next's pages directory)
 * @prop {{ name: string, groups?: string[] }[]} order ordering of the navigation
 * @prop {{ title: string, url: string }[]} links additional links to display
 */

/**
 *
 * @param {NavigationOptions} options
 */
const createNavigationTree = async ({ directory }) => {
  // Get all information for MDX pages (their frontmatter)
  const files = await globby([`${directory}/**/*.mdx`]);
  const items = await Promise.all(
    files.map(async filePath => {
      const frontmatter = await getFrontmatter(filePath);
      return {
        // @ts-ignore
        ...frontmatter,
        slug: toSlug(filePath, directory),
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
    const [category] = slug.split('/');
    let itemCategory = categories.find(
      item => 'name' in item && item.name === category
    );

    if (!itemCategory) {
      categories.push({
        name: category,
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
    const order = NAVIGATION_CONFIG.order.find(c => c.name === category.name);

    if (!order?.groups) {
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

export default createNavigationTree;
