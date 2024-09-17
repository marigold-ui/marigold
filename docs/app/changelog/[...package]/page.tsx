import { Headline } from '@/ui';
import { allChangelogPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { RelativeTime } from '@/ui/RelativeTime';
import { TocContainer } from '@/ui/Toc';
import { Mdx } from '@/ui/mdx';

export const ChangeLogPage = ({ params }: any) => {
  // const page = allChangelogPages.find(page => page.slug === slug);

  const slug = params?.package?.join('/');
  const page = allChangelogPages.find(page => page.title === slug);

  console.log(page);
  // slug: 'changelog/themes/theme-docs/CHANGELOG',
  if (!page) {
    notFound();
  }

  return (
    <article className="grid grid-cols-1 gap-x-24 gap-y-14 min-[1400px]:grid-cols-[minmax(min-content,70ch)_1fr]">
      <div className="col-span-full">
        <Headline level={1}>{page.title}</Headline>
      </div>
      <div className="prose max-w-[70ch]">
        <Mdx className="" title={page?.title} code={page.body.code} />
      </div>
      <div className="col-start-2 hidden min-[1400px]:block">
        <TocContainer />
      </div>
      {/* <div className="text-text-primary-muted text-xs italic">
        Last update: <RelativeTime date={new Date(params.modified)} />
      </div> */}
    </article>
  );
};

export default ChangeLogPage;
