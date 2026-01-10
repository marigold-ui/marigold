'use client';

import { HTMLAttributes } from 'react';
import {
  Headline,
  Link,
  Badge as MarigoldBadge,
  Scrollable as MarigoldScrollable,
  SectionMessage as MarigoldSectionMessage,
  Stack as MarigoldStack,
  Table as MarigoldTable,
  Tabs as MarigoldTabs,
  Text,
} from '@marigold/components';
import {
  Do as MarigoldDo,
  Dont as MarigoldDont,
  GuidelineTiles as MarigoldGuidelineTiles,
} from '@/ui/DosAndDonts';
import { IconList as MarigoldIconList } from '@/ui/IconList';
import { Image as MarigoldImage } from '@/ui/Image';
import { PropsTable } from '@/ui/PropsTable';
import { StorybookHintMessage } from '@/ui/StorybookHintMessage';
import { TeaserList as MarigoldTeaserList } from '@/ui/TeaserCard';
import { ComponentDemo } from './preview';

export function MDXText(props: HTMLAttributes<HTMLParagraphElement>) {
  return <Text {...props} as="p" />;
}

export function MDXHeadline2(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Headline level={2} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
}

export function MDXHeadline3(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Headline level={3} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
}

export function MDXHeadline4(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Headline level={4} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
}

export function MDXHeadline5(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Headline level={5} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
}

export function MDXHeadline6(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Headline level={6} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
}

export function MDXStorybookHintMessage(
  props: HTMLAttributes<HTMLDivElement> & { component: string }
) {
  return <StorybookHintMessage {...props} />;
}

export const componentDemo = (props: any) => <ComponentDemo {...props} />;

export const Badge = (props: any) => <MarigoldBadge {...props} />;

export const IconList = (props: any) => {
  return <MarigoldIconList {...props} />;
};

// Export SectionMessage as a namespace with its sub-components
export const SectionMessage = Object.assign(
  (props: any) => <MarigoldSectionMessage {...props} />,
  {
    Title: MarigoldSectionMessage.Title,
    Content: MarigoldSectionMessage.Content,
  }
);

export const TeaserList = (props: any) => {
  return <MarigoldTeaserList {...props} />;
};

export const MDXPropsTable = (props: any) => {
  console.log('propsTable', props);
  return <PropsTable {...props} />;
};

// Export Do and Dont with their sub-components
export const Do = Object.assign((props: any) => <MarigoldDo {...props} />, {
  Figure: MarigoldDo.Figure,
  Description: MarigoldDo.Description,
});

export const Dont = Object.assign((props: any) => <MarigoldDont {...props} />, {
  Figure: MarigoldDont.Figure,
  Description: MarigoldDont.Description,
});

export const GuidelineTiles = (props: any) => {
  return <MarigoldGuidelineTiles {...props} />;
};

// Export Table as a namespace with its sub-components (for MDX dot-notation)
export const Table = (props: any) => {
  return <MarigoldTable {...props} />;
};

export const Stack = (props: any) => {
  return <MarigoldStack {...props} />;
};

export const Scrollable = (props: any) => {
  return <MarigoldScrollable {...props} />;
};

// Export Tabs as a namespace with its sub-components (for MDX dot-notation)
export const Tabs = Object.assign((props: any) => <MarigoldTabs {...props} />, {
  List: MarigoldTabs.List,
  Item: MarigoldTabs.Item,
  TabPanel: MarigoldTabs.TabPanel,
});

// Also export aliases to match MDX tags used like <TabsList />, <TabsItem />, <TabsTabPanel />
export const TabsList = MarigoldTabs.List;
export const TabsItem = MarigoldTabs.Item;
export const TabsTabPanel = MarigoldTabs.TabPanel;

export const TableRow = MarigoldTable.Row;
export const TableHeader = MarigoldTable.Header;
export const TableBody = MarigoldTable.Body;
export const TableCell = MarigoldTable.Cell;
export const TableColumn = MarigoldTable.Column;

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
