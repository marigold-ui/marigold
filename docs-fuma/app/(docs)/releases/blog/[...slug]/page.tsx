import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/app/_components/layout/docs/page';
import { blogSource } from '@/lib/source';
import { DateFormat } from '@/ui';
import { notFound } from 'next/navigation';
import { PostList } from '@/ui/blog/PostList';

interface BlogPostProps {
  params: Promise<{ slug: string[] }>;
}

export default async function BlogPost(props: BlogPostProps) {
  const params = await props.params;
  const post = blogSource.getPage(params.slug);

  if (!post) notFound();

  const MDX = post.data.body;

  return (
    <DocsPage toc={post.data.toc}>
      <div className="col-span-full">
        <DocsTitle className="max-w-(--maxHeadlineWidth) scroll-m-20 text-left text-5xl font-extrabold tracking-tight *:no-underline lg:text-6xl">
          {post.data.title}
        </DocsTitle>
        <DocsDescription className="text-secondary-400 pt-1">
          <DateFormat value={new Date(post.data.date)} dateStyle="medium" />
        </DocsDescription>
      </div>
      <DocsBody id="docs-body" className="pt-4 pb-10">
        <MDX components={{ PostList }} />
      </DocsBody>
    </DocsPage>
  );
}
