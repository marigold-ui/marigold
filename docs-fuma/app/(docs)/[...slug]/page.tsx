import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/components/layout/docs/page';
import {
  Do,
  DoDescription,
  DoFigure,
  Dont,
  DontDescription,
  DontFigure,
  GuidelineTiles,
  Image,
  MDXComponentPreview,
  MDXHeadline2,
  MDXHeadline3,
  MDXHeadline4,
  MDXHeadline5,
  MDXHeadline6,
  MDXPropsTable,
  MDXStorybookHintMessage,
  MDXText,
  SectionMessage,
  SectionMessageContent,
  SectionMessageTitle,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  TeaserList,
} from '@/components/mdx-wrapper-components';
import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <div className="col-span-full">
        <DocsTitle className="max-w-(--maxHeadlineWidth) scroll-m-20 text-left text-5xl font-extrabold tracking-tight *:no-underline lg:text-6xl">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="text-secondary-400 pt-1">
          {page.data.description}
        </DocsDescription>
      </div>
      <DocsBody id="docs-body" className="pt-4 pb-10">
        <MDX
          components={{
            ...getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
              p: MDXText,
              h2: MDXHeadline2,
              h3: MDXHeadline3,
              h4: MDXHeadline4,
              h5: MDXHeadline5,
              h6: MDXHeadline6,
              ComponentPreview: MDXComponentPreview,
              TeaserList: TeaserList,
              SectionMessage: Object.assign(SectionMessage, {
                Title: SectionMessageTitle,
                Content: SectionMessageContent,
              }),
              Do: Object.assign(Do, {
                Figure: DoFigure,
                Description: DoDescription,
              }),
              Dont: Object.assign(Dont, {
                Figure: DontFigure,
                Description: DontDescription,
              }),
              GuidelineTiles,
              Image,
              PropsTable: props => (
                <MDXPropsTable {...props} component={page.data.title} />
              ),
              StorybookHintMessage: (props: any) => (
                <MDXStorybookHintMessage
                  {...props}
                  component={page.data.title}
                />
              ),
            }),
            Table,
            TableHeader,
            TableBody,
            TableRow,
            TableCell,
            TableColumn,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
