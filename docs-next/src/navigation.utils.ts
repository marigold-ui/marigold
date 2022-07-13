import { globby } from 'globby';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs-extra';
import path from 'path';
import { CONTENT_PATH, siteMetaData } from './config';

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

  const result = await Promise.all(
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
        group: any;
        slug: string;
        frontmatter: { [key: string]: any };
      };
    })
  );

  // TODO: group by slug -> category (1. level)
  // 1. iterate list
  // 2. split slug by "/" -> if slug.length > 1
  // 3. does category exist? -> if not create it
  // 4. add to category
  // 5. sort based on config

  const category: string[] = [];
  result.map(res => {
    const resultSplit = res.slug.split('/');
    if (resultSplit.length > 1 && !category.includes(resultSplit[0])) {
      category.push(resultSplit[0]);
    }
    category.sort(
      (a, b) =>
        siteMetaData.category.indexOf(a) - siteMetaData.category.indexOf(b)
    );
  });

  // TODO: group by frontmatter.group -> 2. level
  // 1. iterate items in group
  // 2. is there a "group" frontmatter?
  // 3. does group exist? -> if not create it
  // 4. add to group
  // 5. sort based on config

  const group: string[] = [];
  result.map(front => {
    if (front.group && !group.includes(front.group)) {
      group.push(front.group);
    }
    category.sort(
      (a, b) => siteMetaData.groups.indexOf(a) - siteMetaData.groups.indexOf(b)
    );
  });

  return { result, category, group };
};
