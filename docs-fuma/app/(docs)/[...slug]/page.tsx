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
  IconList,
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
  Scrollable,
  SectionMessage,
  SectionMessageContent,
  SectionMessageTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  TabsItem,
  TabsList,
  TabsTabPanel,
  TeaserList,
} from '@/components/mdx-wrapper-components';
import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ColorTokenTable } from '@/ui/ColorTokens';
import { RelativeTime } from '@/ui/RelativeTime';
import { AlignmentsX, AlignmentsY, BorderRadius, Spacing } from '@/ui/Token';
import {
  FontSizes,
  FontStyle,
  FontWeights,
  Headlines,
  TextAlign,
} from '@/ui/Typography';

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
              IconList,
              TextAlign,
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
              PropsTable: props => <MDXPropsTable {...props} />,
              StorybookHintMessage: (props: any) => (
                <MDXStorybookHintMessage
                  {...props}
                  component={page.data.title}
                />
              ),
            }),
            Table,
            Tabs,
            TabsItem: TabsItem,
            TabsList: TabsList,
            TabsTabPanel: TabsTabPanel,
            Stack,
            Scrollable,
            TableHeader,
            TableBody,
            TableRow,
            TableCell,
            TableColumn,
            AlignmentsX,
            AlignmentsY,
            BorderRadius,
            ColorTokenTable,
            FontSizes,
            FontStyle,
            FontWeights,
            Headlines,
            Spacing,
          }}
        />
        {page.data.lastModified && (
          <div className="text-text-primary-muted pt-8 text-xs italic">
            Last update:{' '}
            <RelativeTime date={new Date(page.data.lastModified)} />
          </div>
        )}
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
