import { DateFormat, Headline, Link, Stack } from '@/ui';
import { allBlogs } from 'contentlayer/generated';
import { Markdown } from '../mdx';

export const getLatestPost = () => {
  // matches everything till the second line break
  const regex = /[\s\S]*?\n[\s\S]*?\n/;
  const posts = allBlogs.map(post => ({
    title: post.title,
    date: new Date(post.date),
    slug: post.slug,
    introduction: post.body.raw.match(regex)?.[0] || '',
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
        <Link href={`/${latestPost.slug}`}>
          {`${latestPost.title} - `}
          <DateFormat value={latestPost.date} dateStyle="medium" />
        </Link>
      </Headline>
      <Stack space={2} alignX="left">
        <Markdown contents={latestPost.introduction}></Markdown>
        <Link href={`/${latestPost.slug}`}>▶︎ Read more</Link>
      </Stack>
    </div>
  );
};
