// Next.js & External
// Layout Components
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/components/layout/docs/page';
// MDX Wrapper Components
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
  MDXHeadline2,
  MDXHeadline3,
  MDXHeadline4,
  MDXHeadline5,
  MDXHeadline6,
  MDXPropsTable,
  MDXStorybookHintMessage,
  Scrollable,
  SectionMessage,
  SectionMessageContent,
  SectionMessageTitle,
  Tabs,
  TabsItem,
  TabsList,
  TabsTabPanel,
  TeaserList,
  Text,
  componentDemo,
} from '@/components/mdx-wrapper-components';
// Lib
import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
// Marigold Components
import { Center, Columns, Stack } from '@marigold/components';
import { AppearanceTable } from '@/ui/AppearanceTable';
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
// UI Components
import { LatestPost } from '@/ui/blog/LatestPost';
import { PostList } from '@/ui/blog/PostList';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc === false ? [] : page.data.toc}>
      <div className="col-span-full">
        <DocsTitle className="max-w-(--maxHeadlineWidth) scroll-m-20 text-left text-5xl font-extrabold tracking-tight *:no-underline lg:text-6xl">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="text-secondary-400 pt-1">
          {page.data.description}
        </DocsDescription>
      </div>

      <DocsBody id="docs-body" className="pt-4 pb-10">
        <MDX components={getMdxComponentsConfig(page)} />
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

function getMdxComponentsConfig(page: any) {
  return {
    ...getMDXComponents({
      // Relative linking
      a: createRelativeLink(source, page),

      // Text & Headings
      p: (props: any) => <Text {...props} as="p" />,
      h2: MDXHeadline2,
      h3: MDXHeadline3,
      h4: MDXHeadline4,
      h5: MDXHeadline5,
      h6: MDXHeadline6,

      // Blog Components
      LatestPost,
      PostList,

      AppearanceTable,
      // Custom MDX Components
      ComponentDemo: componentDemo,
      IconList,
      Image,
      PropsTable: (props: any) => <MDXPropsTable {...props} />,
      StorybookHintMessage: (props: any) => (
        <MDXStorybookHintMessage {...props} component={page.data.title} />
      ),
      TeaserList,
      // Compound Components
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
      Tabs: Object.assign(Tabs, {
        List: TabsList,
        Item: TabsItem,
        TabPanel: TabsTabPanel,
      }),
      GuidelineTiles,
    }),

    // Layout Components
    Center,
    Columns,
    Scrollable,
    Stack,

    // Token Components
    AlignmentsX,
    AlignmentsY,
    BorderRadius,
    ColorTokenTable,
    Spacing,

    // Typography Components
    FontSizes,
    FontStyle,
    FontWeights,
    Headlines,
    TextAlign,
  };
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
