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
import { cn } from '@marigold/system';
import { CopyButton } from '@/ui/CopyButton';
import {
  Do as MarigoldDo,
  Dont as MarigoldDont,
  GuidelineTiles as MarigoldGuidelineTiles,
} from '@/ui/DosAndDonts';
import { FullsizeView } from '@/ui/FullsizeViewDemo';
import { IconList as MarigoldIconList } from '@/ui/IconList';
import { Image as MarigoldImage } from '@/ui/Image';
import { PropsTable } from '@/ui/PropsTable';
import { StorybookHintMessage } from '@/ui/StorybookHintMessage';
import { TeaserList as MarigoldTeaserList } from '@/ui/TeaserCard';
import { ComponentPreview } from './preview';

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

export const MDXComponentPreview = (props: any) => (
  <ComponentPreview {...props} />
);

export const Badge = (props: any) => <MarigoldBadge {...props} />;

export function MDXFigure(
  props: HTMLAttributes<HTMLElement> & { raw: string }
) {
  const { children, className, raw, ...rest } = props;
  const lines = raw.replace(/\r\n|\r|\n$/, '').split(/\r\n|\r|\n/).length;
  return (
    <figure className={cn('relative mt-0', className)} {...rest}>
      <div
        className={cn(
          'absolute right-3 flex justify-end gap-3',
          // vertical center if only one line
          lines > 1 ? 'top-4' : 'top-1/2 -translate-y-1/2'
        )}
      >
        {lines >= 5 ? (
          <FullsizeView code={props.children} codeString={raw} />
        ) : null}
        <CopyButton codeString={raw} />
      </div>
      {children}
    </figure>
  );
}

export function MDXPre({
  className,
  ...props
}: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={cn(
        'not-prose *:bg-transparent *:p-0 data-line:**:leading-[22px]',
        'max-h-[650px] rounded-lg px-(--pre-padding-x) py-4',
        'scrollbar-thin scrollbar-thumb-code-500 scrollbar-track-transparent scrollbar-thumb-rounded-full overflow-x-auto',
        className
      )}
      {...props}
    >
      {props.children}
    </pre>
  );
}

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
