import { DateFormat, Headline, Text } from '@/ui';
import { allBlogs } from 'contentlayer/generated';
import Link from 'next/link';

interface Post {
  title: string;
  date: Date;
  slug: string;
  introduction: RegExpMatchArray | null;
}

export default function Post() {
  // matches everything till the second line break
  const regex = /[\s\S]*?\n[\s\S]*?\n/;

  const posts: Post[] = allBlogs
    .map(post => ({
      title: post.title,
      date: new Date(post.date),
      slug: post.slug,
      introduction: post.body.raw.match(regex),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <article className="grid grid-cols-1 gap-x-24 gap-y-14 min-[1400px]:grid-cols-[minmax(min-content,70ch)_1fr]">
      <div className="col-span-full">
        <Headline level={1}>All Releases</Headline>
        <div className="text-secondary-400 pt-1">Find all release blogs.</div>
      </div>
      <div className="prose max-w-[70ch]">
        {posts.map(post => (
          <div key={post.title} className="pb-8">
            <Headline level={2}>
              <Link href={`/${post.slug}`}>
                {post.title} -{' '}
                <DateFormat value={post.date} dateStyle="medium" />
              </Link>
            </Headline>
            <Text>{post.introduction}</Text>
          </div>
        ))}
      </div>
    </article>
  );
}
