import {
  AppearanceDemo,
  Center,
  Columns,
  ComponentDemo,
  DateFormat,
  Do,
  DoDescription,
  DoFigure,
  Dont,
  DontDescription,
  DontFigure,
  GuidelineTiles,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  IconList,
  Image,
  Link,
  MDXPropsTable,
  Scrollable,
  SectionMessage,
  SectionMessageContent,
  SectionMessageTitle,
  Stack,
  Tabs,
  TabsItem,
  TabsList,
  TabsTabPanel,
  TeaserList,
  Text,
} from '@/app/_components/mdx-wrapper-components';
import { Pre } from 'fumadocs-ui/components/codeblock';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { AppearanceTable } from '@/ui/AppearanceTable';
import { ColorTokenTable } from '@/ui/ColorTokens';
import { AlignmentsX, AlignmentsY, BorderRadius, Spacing } from '@/ui/Token';
import {
  FontSizes,
  FontStyle,
  FontWeights,
  Headlines,
  TextAlign,
} from '@/ui/Typography';
import { LatestPost } from '@/ui/blog/LatestPost';
import { PostListWrapper } from '@/ui/blog/PostListWrapper';
import { CustomCodeBlock } from './app/_components/CodeBlock';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,

    // Text & Headings
    p: (props: any) => <Text {...props} as="p" />,
    h2: Headline2,
    h3: Headline3,
    h4: Headline4,
    h5: Headline5,
    h6: Headline6,

    // Blog Components
    LatestPost,
    PostList: PostListWrapper,

    // Custom MDX Components
    AppearanceTable,
    ComponentDemo,
    AppearanceDemo,
    IconList,
    Image,
    PropsTable: (props: any) => <MDXPropsTable {...props} />,
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

    DateFormat,

    // Layout Components
    Center,
    Columns,
    Link: (props: any) => <Link {...props} />,
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

    // Allow overrides from components param
    ...components,

    // Code blocks (always use our custom ones)
    pre: props => (
      <CustomCodeBlock keepBackground {...props}>
        <Pre {...props}>{props.children}</Pre>
      </CustomCodeBlock>
    ),
    figure: props => (
      <CustomCodeBlock {...props}>
        <figure {...props}>{props.children}</figure>
      </CustomCodeBlock>
    ),
  } as MDXComponents;
}
