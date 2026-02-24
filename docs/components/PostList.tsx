import { getAllBlogPosts } from '@/lib/blog';
import dayjs from 'dayjs';
import Link from 'fumadocs-core/link';

function formatDateMedium(date: Date | string): string {
  return dayjs(date).format('MMM D, YYYY');
}

export const PostList = () => {
  const sortedPosts = getAllBlogPosts();

  if (sortedPosts.length === 0) {
    return <div>No blog posts found.</div>;
  }

  return (
    <div className="flex flex-col gap-12">
      {sortedPosts.map(post => (
        <div key={post.slug}>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            <Link href={post.slug} className="no-underline">
              {post.title} - {formatDateMedium(post.date)}
            </Link>
          </h2>
          {post.introduction && (
            <div className="flex flex-col gap-2">
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {post.introduction.trim()}
              </p>
              <Link href={post.slug}>▶︎ Read more</Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
