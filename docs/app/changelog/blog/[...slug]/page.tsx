'use client';

import { allBlogs } from '@/.contentlayer/generated';
import { Headline } from '@/ui';
import { notFound, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { TocContainer } from '@/ui/Toc';
import { Mdx } from '@/ui/mdx';

interface Blog {
  params: {
    slug: string[];
  };
}

const BlogPost = async () => {
  const pathname = usePathname();

  const currentPath = pathname.replace(/^\//, '');

  const currentPost = allBlogs.find(post => post.slug === currentPath);

  console.log(currentPost);

  return (
    <>
      {currentPost ? (
        <article
          key={currentPost.title}
          className="grid grid-cols-1 gap-x-24 gap-y-14 min-[1400px]:grid-cols-[minmax(min-content,70ch)_1fr]"
        >
          <div className="col-span-full">
            <Headline level={1}>{currentPost.title}</Headline>
            <div className="text-secondary-400 pt-1">{currentPost.date}</div>
          </div>
          <div className="prose max-w-[70ch]">
            <Mdx
              className=""
              title={currentPost.title}
              code={currentPost.body.code}
            />
          </div>
          <div className="col-start-2 hidden min-[1400px]:block">
            <TocContainer />
          </div>
        </article>
      ) : null}
    </>
  );
};

export default BlogPost;
