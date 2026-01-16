import { type BlogPageData, blogSource } from '@/lib/source';
import { DateFormat, Headline, Link, Stack } from '@/ui';
import Md from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const getLatestPost = () => {
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
      <Stack space={2} alignX="left">
        <Md remarkPlugins={[remarkGfm]}>{latestPost.introduction}</Md>
        <Link href={latestPost.url}>▶︎ Read more</Link>
      </Stack>
    </div>
  );
};
