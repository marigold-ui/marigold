import { blogSource } from '@/lib/source';
import { DateFormat, Headline, Link } from '@/ui';

export const getLatestPost = () => {
  const allBlogs = blogSource.getPages();

  const posts = allBlogs.map(post => ({
    title: post.data.title,
    date: new Date(post.data.date),
    url: post.url,
  }));

  const sortedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  const latestPost = sortedPosts[0];

  return latestPost;
};

export const LatestPost = () => {
  const latestPost = getLatestPost();

  if (!latestPost) {
    return null;
  }

  return (
    <div key={latestPost.title}>
      <div className="text-secondary-400 -mb-14 font-semibold">
        LATEST RELEASE
      </div>
      <Headline level={2}>
        <Link href={latestPost.url}>
          {`${latestPost.title} - `}
          <DateFormat value={latestPost.date} dateStyle="medium" />
        </Link>
      </Headline>
      <Link href={latestPost.url}>▶︎ Read more</Link>
    </div>
  );
};
