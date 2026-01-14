import { type BlogPageData, blogSource } from '@/lib/source';
import { DateFormat } from '@/ui';
import { notFound } from 'next/navigation';
import { PostListWrapper } from '@/ui/blog/PostListWrapper';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/ui/layout/docs/page';

interface BlogPostProps {
  params: Promise<{ slug: string[] }>;
}

export default async function BlogPost(props: BlogPostProps) {
  const params = await props.params;
  const post = blogSource.getPage(params.slug);

  if (!post) notFound();

  const data = post.data as BlogPageData;
  const MDX = data.body;

  return (
    <DocsPage toc={data.toc}>
      <div className="col-span-full">
        <DocsTitle className="max-w-(--maxHeadlineWidth) scroll-m-20 text-left text-5xl font-extrabold tracking-tight *:no-underline lg:text-6xl">
          {data.title}
        </DocsTitle>
        <DocsDescription className="text-secondary-400 pt-1">
          <DateFormat value={new Date(data.date)} dateStyle="medium" />
        </DocsDescription>
      </div>
      <DocsBody id="docs-body" className="pt-4 pb-10">
        <MDX components={{ PostList: PostListWrapper }} />
      </DocsBody>
    </DocsPage>
  );
}
