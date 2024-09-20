import { DateFormat, Headline } from '@/ui';
import { allChangelogPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { TocContainer } from '@/ui/Toc';
import { Mdx } from '@/ui/mdx';

export const ChangeLogPage = ({ params }: any) => {
  const slug = params?.package?.join('/');
  const page = allChangelogPages.find(page => page.nav === slug);

  // slug: 'changelog/themes/theme-docs/CHANGELOG',
  if (!page) {
    notFound();
  }

  return (
    <article className="grid grid-cols-1 gap-x-24 gap-y-14 min-[1400px]:grid-cols-[minmax(min-content,70ch)_1fr]">
      <div className="col-span-full">
        <Headline level={1}>Whats new on</Headline>
        <Headline level={2}>{page.title}</Headline>
        <div className="text-secondary-400 pt-1">{page.caption}</div>
      </div>
      <div className="prose max-w-[70ch]">
        <Mdx className="" title={page?.title} code={page.body.code} />
      </div>
      <div className="col-start-2 hidden min-[1400px]:block">
        <TocContainer />
      </div>
    </article>
  );
};

export default ChangeLogPage;
