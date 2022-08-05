import path from 'node:path';

import { globby } from 'globby';
import { CONTENT_PATH } from '~/config';

/**
 * Get list of all mdx page files.
 */
export const getMdxFiles = async () =>
  await globby([`${CONTENT_PATH}/**/*.mdx`]);

/**
 * Generates a "slug" from a mdx file path. Slugs are always
 * absolute paths that don't include the starting backslash
 * (e.g. "foo/bar" not "/foo/bar").
 */
export const toSlug = (file: string) =>
  path.relative(CONTENT_PATH, file.replace(/\.mdx?$/, ''));

export const getMdxPaths = async () => {
  const files = await getMdxFiles();

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
