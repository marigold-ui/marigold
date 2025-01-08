import { DateFormat, Headline, Link, Stack } from '@/ui';
import { allBlogs } from 'contentlayer/generated';
import { Markdown } from '../mdx';

export const PostList = () => {
  // matches everything till the second line break
  const regex = /[\s\S]*?\n[\s\S]*?\n/;

  const posts = allBlogs
    .map(post => ({
      title: post.title,
      date: new Date(post.date),
      slug: post.slug,
      introduction: post.body.raw.match(regex)?.[0] || '',
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Stack space={12}>
      {posts.map(post => (
        <div key={post.title}>
          <Headline level={2}>
            <Link href={`/${post.slug}`}>
              {post.title} - <DateFormat value={post.date} dateStyle="medium" />
            </Link>
          </Headline>
          <Stack space={2} alignX="left">
            <Markdown contents={post.introduction}></Markdown>
            <Link href={`/${post.slug}`}>▶︎ Read more</Link>
          </Stack>
        </div>
      ))}
    </Stack>
  );
};
