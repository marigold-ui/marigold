import { getAllBlogPosts } from '@/lib/blog';
import { DateFormat, Headline, Link, Stack } from '@/ui';

export const PostList = () => {
  const sortedPosts = getAllBlogPosts();

  if (sortedPosts.length === 0) {
    return <div>No blog posts found.</div>;
  }

  return (
    <Stack space={12}>
      {sortedPosts.map(post => (
        <div key={post.slug}>
          <Headline level={2}>
            <Link href={post.slug}>
              {post.title} - <DateFormat value={post.date} dateStyle="medium" />
            </Link>
          </Headline>
          {post.introduction && (
            <Stack space={2} alignX="left">
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {post.introduction.trim()}
              </p>
              <Link href={post.slug}>▶︎ Read more</Link>
            </Stack>
          )}
        </div>
      ))}
    </Stack>
  );
};
