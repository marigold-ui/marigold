'use client';

import { allBlogs } from '@/.contentlayer/generated';
import { Headline } from '@/ui';
import { usePathname } from 'next/navigation';
import { TocContainer } from '@/ui/Toc';
import { Mdx } from '@/ui/mdx';

const BlogPost = () => {
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\//, '');
  const currentPost = allBlogs.find(post => post.slug === currentPath);

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
