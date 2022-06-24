import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'src', 'content', 'introduction');

export const posts = () => {
  const slugs = fs.readdirSync(postsDirectory);
  const realSlugs = slugs.replace(/\.md/, '');
  const allPosts = realSlugs
    .map(slug => getPostBySlug(slug))
    .sort((post1, post2) =>
      new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date)
        ? -1
        : 1
    );

  return allPosts;
};

export const getPostBySlug = slug => {
  const realSlug = slug.replace(/\.md$/, '');

  const fullPath = join(postsDirectory, `${realSlug}`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter, content } = matter(fileContents);

  return { slug: realSlug, frontmatter, content };
};

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs.map(slug => getPostBySlug(slug));

  return posts;
}
