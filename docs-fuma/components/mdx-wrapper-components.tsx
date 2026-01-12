'use client';

import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import {
  BadgeProps,
  Headline,
  Link,
  Badge as MarigoldBadge,
  Scrollable as MarigoldScrollable,
  SectionMessage as MarigoldSectionMessage,
  Stack as MarigoldStack,
  Table as MarigoldTable,
  Tabs as MarigoldTabs,
  ScrollableProps,
  SectionMessageProps,
  StackProps,
  TableProps,
  TabsProps,
  Text,
} from '@marigold/components';
import {
  Do as MarigoldDo,
  Dont as MarigoldDont,
  GuidelineTiles as MarigoldGuidelineTiles,
} from '@/ui/DosAndDonts';
import { IconListProps, IconList as MarigoldIconList } from '@/ui/IconList';
import { ImageProps, Image as MarigoldImage } from '@/ui/Image';
import { PropsTable, PropsTableProps } from '@/ui/PropsTable';
import { StorybookHintMessage } from '@/ui/StorybookHintMessage';
import {
  TeaserList as MarigoldTeaserList,
  TeaserListProps,
} from '@/ui/TeaserCard';
import { ComponentDemo } from './preview';

export const MDXText = (props: HTMLAttributes<HTMLParagraphElement>) => {
  return <Text {...props} as="p" />;
};
export { Text } from '@marigold/components';

export const MDXHeadline2 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={2} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const MDXHeadline3 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={3} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const MDXHeadline4 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={4} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const MDXHeadline5 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={5} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const MDXHeadline6 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={6} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const MDXStorybookHintMessage = (
  props: HTMLAttributes<HTMLDivElement> & { component: string }
) => {
  return <StorybookHintMessage {...props} />;
};

export const componentDemo = (
  props: React.ComponentProps<typeof ComponentDemo>
) => <ComponentDemo {...props} />;

export const Badge = (props: BadgeProps) => <MarigoldBadge {...props} />;

export const IconList = (props: IconListProps) => {
  return <MarigoldIconList {...props} />;
};

// Export SectionMessage as a namespace with its sub-components
export const SectionMessage = Object.assign(
  (props: SectionMessageProps) => <MarigoldSectionMessage {...props} />,
  {
    Title: MarigoldSectionMessage.Title,
    Content: MarigoldSectionMessage.Content,
  }
);

export const TeaserList = (props: TeaserListProps) => {
  return <MarigoldTeaserList {...props} />;
};

export const MDXPropsTable = (props: PropsTableProps) => {
  console.log('propsTable', props);
  return <PropsTable {...props} />;
};

// Export Do and Dont with their sub-components
export const Do = Object.assign(
  (props: PropsWithChildren) => <MarigoldDo {...props} />,
  {
    Figure: MarigoldDo.Figure,
    Description: MarigoldDo.Description,
  }
);

export const Dont = Object.assign(
  (props: PropsWithChildren) => <MarigoldDont {...props} />,
  {
    Figure: MarigoldDont.Figure,
    Description: MarigoldDont.Description,
  }
);

export const GuidelineTiles = (props: PropsWithChildren) => {
  return <MarigoldGuidelineTiles {...props} />;
};

// Export Table as a namespace with its sub-components (for MDX dot-notation)
export const Table = (props: TableProps) => {
  return <MarigoldTable {...props} />;
};

export const Stack = (props: StackProps) => {
  return <MarigoldStack {...props} />;
};

export const Scrollable = (props: ScrollableProps) => {
  return <MarigoldScrollable {...props} />;
};

// Export Tabs as a namespace with its sub-components (for MDX dot-notation)
export const Tabs = (props: TabsProps) => {
  return <MarigoldTabs {...props} />;
};
// Also export aliases to match MDX tags used like <TabsList />, <TabsItem />, <TabsTabPanel />
export const TabsList = MarigoldTabs.List;
export const TabsItem = MarigoldTabs.Item;
export const TabsTabPanel = MarigoldTabs.TabPanel;

// Also export the sub-components separately for explicit MDX mapping
export const SectionMessageTitle = MarigoldSectionMessage.Title;
export const SectionMessageContent = MarigoldSectionMessage.Content;

export const DoFigure = MarigoldDo.Figure;
export const DoDescription = MarigoldDo.Description;

export const DontFigure = MarigoldDont.Figure;
export const DontDescription = MarigoldDont.Description;

export const Image = (props: any) => {
  return <MarigoldImage {...props} />;
};
