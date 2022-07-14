import { globby } from 'globby';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs-extra';
import path from 'path';
import { CONTENT_PATH, NAVIGATION_CONFIG } from './config';

const toSlug = (val: string) =>
  path.relative(CONTENT_PATH, val.replace(/\.mdx?$/, ''));

export const getContentPaths = async () => {
  const contentFilePaths = await globby([`${CONTENT_PATH}/**/*.mdx`]);

  const paths = contentFilePaths
    .map(toSlug)
    .map(slug => ({ params: { slug: slug.split('/') } }));

  paths.forEach(p =>
    p.params.slug.length > 1
      ? paths.push({ params: { slug: [p.params.slug[0]] } })
      : paths.push({ params: { slug: [] } })
  );

  return paths;
};

export const getNavigation = async () => {
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
      } as {
        title: string;
        group?: string;
        slug: string;
      };
    })
  );

  // TODO: group by slug -> category (1. level)
  // 1. iterate list
  // 2. split slug by "/" -> if slug.length > 1
  // 3. does category exist? -> if not create it
  // 4. add to category
  // 5. sort based on config

  const navigation: Navigation = [];

  items.forEach(item => {
    const { slug, group } = item;
    const hasCategory = slug.includes('/');

    if (!hasCategory) {
      navigation.push({
        title: item.title,
        slug,
      });
      return;
    }

    // Assign to a navigation category
    const [category] = slug.split('/');
    let itemCategory = navigation.find(
      item => 'name' in item && item.name === category
    ) as NavigationCategory | undefined;

    if (!itemCategory) {
      navigation.push({
        name: category,
        items: [],
        groups: [],
      });
      itemCategory = navigation[navigation.length - 1] as NavigationCategory;
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

  // TODO: Sort by config

  // const category: string[] = [];
  // items.map(res => {
  //   const resultSplit = res.slug.split('/');
  //   if (resultSplit.length > 1 && !category.includes(resultSplit[0])) {
  //     category.push(resultSplit[0]);
  //   }
  //   category.sort(
  //     (a, b) =>
  //       siteMetaData.category.indexOf(a) - siteMetaData.category.indexOf(b)
  //   );
  // });

  // TODO: group by frontmatter.group -> 2. level
  // 1. iterate items in group
  // 2. is there a "group" frontmatter?
  // 3. does group exist? -> if not create it
  // 4. add to group
  // 5. sort based on config

  // const group: string[] = [];
  // items.map(front => {
  //   if (front.group && !group.includes(front.group)) {
  //     group.push(front.group);
  //   }
  //   category.sort(
  //     (a, b) => siteMetaData.groups.indexOf(a) - siteMetaData.groups.indexOf(b)
  //   );
  // });

  // return { result: items, category, group };
};

export type Navigation = (NavigationCategory | NavigationItem)[];

export interface NavigationCategory {
  name: string;
  items: NavigationItem[];
  groups: {
    name: string;
    items: NavigationItem[];
  }[];
}
export interface NavigationItem {
  slug: string;
  title: string;
}
