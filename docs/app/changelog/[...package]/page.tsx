import { DateFormat, Headline } from '@/ui';
import { allChangelogPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { TocContainer } from '@/ui/Toc';
import { Mdx } from '@/ui/mdx';

export const ChangeLogPage = ({ params }: any) => {
  // const page = allChangelogPages.find(page => page.slug === slug);

  const slug = params?.package?.join('/');
  const page = allChangelogPages.find(page => page.title === slug);

  // slug: 'changelog/themes/theme-docs/CHANGELOG',
  if (!page) {
    notFound();
  }

  return (
    <article className="grid grid-cols-1 gap-x-24 gap-y-14 min-[1400px]:grid-cols-[minmax(min-content,70ch)_1fr]">
      {page.headings.map(
        (heading: { level: number; text: 'string'; slug: 'string' }) => (
          <div key={page.slug}>
            <div className="col-span-full">
              <Headline level={1}>
                Whats new: {heading.level == 2 && heading.text}
              </Headline>
              <span>
                <DateFormat
                  value={new Date(page.releaseDate)}
                  dateStyle="medium"
                ></DateFormat>
              </span>
            </div>
            <div className="prose max-w-[70ch]">
              <Mdx className="" title={page?.title} code={page.body.code} />
            </div>
            <div className="col-start-2 hidden min-[1400px]:block">
              <TocContainer />
            </div>
          </div>
        )
      )}
    </article>
  );
};

export default ChangeLogPage;
