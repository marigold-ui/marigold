'use client';

import {
  BadgeProps,
  Headline,
  Link,
  Badge as MarigoldBadge,
  Scrollable as MarigoldScrollable,
  SectionMessage as MarigoldSectionMessage,
  Tabs as MarigoldTabs,
  ScrollableProps,
  SectionMessageProps,
  TabsProps,
} from '@/ui';
import { HTMLAttributes, PropsWithChildren } from 'react';
import {
  Do as MarigoldDo,
  Dont as MarigoldDont,
  GuidelineTiles as MarigoldGuidelineTiles,
} from '@/ui/DosAndDonts';
import { Image as MarigoldImage } from '@/ui/Image';
import { PropsTable, PropsTableProps } from '@/ui/PropsTable';
import {
  TeaserList as MarigoldTeaserList,
  TeaserListProps,
} from '@/ui/TeaserCard';

export const Headline2 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={2} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const Headline3 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={3} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const Headline4 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={4} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const Headline5 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={5} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const Headline6 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Headline level={6} {...props}>
      <Link href={`#${props.id}`}>{props.children}</Link>
    </Headline>
  );
};

export const Badge = (props: BadgeProps) => <MarigoldBadge {...props} />;

export const SectionMessage = (props: SectionMessageProps) => (
  <MarigoldSectionMessage {...props} />
);

export const TeaserList = (props: TeaserListProps) => {
  return <MarigoldTeaserList {...props} />;
};

export const MDXPropsTable = (props: PropsTableProps) => {
  console.log('propsTable', props);
  return <PropsTable {...props} />;
};

export const Do = (props: PropsWithChildren) => <MarigoldDo {...props} />;
export const Dont = (props: PropsWithChildren) => <MarigoldDont {...props} />;

export const GuidelineTiles = (props: PropsWithChildren) => {
  return <MarigoldGuidelineTiles {...props} />;
};

export const Scrollable = (props: ScrollableProps) => {
  return <MarigoldScrollable {...props} />;
};

export const Tabs = (props: TabsProps) => {
  return <MarigoldTabs {...props} />;
};
export const TabsList = MarigoldTabs.List;
export const TabsItem = MarigoldTabs.Item;
export const TabsTabPanel = MarigoldTabs.TabPanel;

export const SectionMessageTitle = MarigoldSectionMessage.Title;
export const SectionMessageContent = MarigoldSectionMessage.Content;

export const DoFigure = MarigoldDo.Figure;
export const DoDescription = MarigoldDo.Description;

export const DontFigure = MarigoldDont.Figure;
export const DontDescription = MarigoldDont.Description;

export const Image = (props: any) => {
  return <MarigoldImage {...props} />;
};

export { Text, Center, Stack, Columns, Link, DateFormat } from '@/ui';
export { AppearanceDemo } from '@/ui/AppearanceDemo';
export { ComponentDemo } from './preview';
export { IconList } from '@/ui/IconList';
export { StorybookHintMessage } from '@/ui/StorybookHintMessage';
