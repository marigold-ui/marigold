import { type BlogPageData, blogSource } from '@/lib/source';
import { DateFormat, Headline, Link, Stack } from '@/ui';
import Md from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const PostList = () => {
  const allBlogs = blogSource.getPages();

  const posts = allBlogs.map(post => {
    const data = post.data as BlogPageData;
    return {
      title: data.title,
      date: new Date(data.date),
      url: post.url,
      introduction: data.introduction || '',
    };
  });

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
