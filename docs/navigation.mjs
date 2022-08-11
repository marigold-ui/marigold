#!/usr/bin/env zx

// Set available globals for eslint
/* global $, glob, chalk, fs, path */
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

const PAGES_PATH = 'content';
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

const toSlug = file => path.relative(PAGES_PATH, file.replace(/\.mdx?$/, ''));

const getFrontmatter = async filePath => {
  const file = await read(filePath);
  matter(file);

  return file.data.matter || {};
};

const sortByOrder = items => {
  items.sort((a, b) => (a.order || 9999999999) - (b.order || 9999999999));
};

const createNavigationTree = async () => {
  // Get all information for MDX pages (their frontmatter)
  const files = await glob([`${PAGES_PATH}/**/*.mdx`]);
  const items = await Promise.all(
    files.map(async filePath => {
      const frontmatter = await getFrontmatter(filePath);
      return {
        ...frontmatter,
        slug: toSlug(filePath),
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

const nav = await createNavigationTree();

fs.outputJson('src/navigation.json', nav);
