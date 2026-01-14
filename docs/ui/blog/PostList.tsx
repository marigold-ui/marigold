import { type BlogPageData, blogSource } from '@/lib/source';
import { DateFormat, Headline, Link, Stack } from '@/ui';
import { readFile } from 'fs/promises';
import { join } from 'path';
import Md from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const PostList = async () => {
  const allBlogs = blogSource.getPages();

  const posts = await Promise.all(
    allBlogs.map(async post => {
      const data = post.data as BlogPageData;
      try {
        // Read the raw MDX file to extract introduction
        const filePath = join(
          process.cwd(),
          'content/releases/blog',
          `${post.slugs[0]}.mdx`
        );
        const content = await readFile(filePath, 'utf-8');

        // Remove frontmatter and extract first two paragraphs
        const withoutFrontmatter = content.replace(/^---[\s\S]*?---\n\n?/, '');
        const regex = /^([\s\S]*?\n\n[\s\S]*?)\n\n/;
        const match = withoutFrontmatter.match(regex);
        const introduction = match ? match[1].trim() : '';

        return {
          title: data.title,
          date: new Date(data.date),
          url: post.url,
          introduction,
        };
      } catch (_error) {
        console.log(_error);
        return {
          title: data.title,
          date: new Date(data.date),
          url: post.url,
          introduction: '',
        };
      }
    })
  );

  const sortedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Stack space={12}>
      {sortedPosts.map(post => (
        <div key={post.title}>
          <Headline level={2}>
            <Link href={post.url}>
              {post.title} - <DateFormat value={post.date} dateStyle="medium" />
            </Link>
          </Headline>
          {post.introduction && (
            <Stack space={2} alignX="left">
              <Md remarkPlugins={[remarkGfm]}>{post.introduction}</Md>
              <Link href={post.url}>▶︎ Read more</Link>
            </Stack>
          )}
          {!post.introduction && <Link href={post.url}>▶︎ Read more</Link>}
        </div>
      ))}
    </Stack>
  );
};
