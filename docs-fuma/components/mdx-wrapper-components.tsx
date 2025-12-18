'use client';

import { HTMLAttributes } from 'react';
import {
  Headline,
  Link,
  SectionMessage as MarigoldSectionMessage,
  Text,
} from '@marigold/components';
import { PropsTable } from '@/ui/PropsTable';
import { TeaserList as MarigoldTeaserList } from '@/ui/TeaserCard';

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
  return <Headline level={3} {...props} />;
}

export function MDXHeadline4(props: HTMLAttributes<HTMLHeadingElement>) {
  return <Headline level={4} {...props} />;
}

export function MDXHeadline5(props: HTMLAttributes<HTMLHeadingElement>) {
  return <Headline level={5} {...props} />;
}

export function MDXHeadline6(props: HTMLAttributes<HTMLHeadingElement>) {
  return <Headline level={6} {...props} />;
}

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

// export const WrappedPropsTabled = (props: any) => {
//     return <PropsTable {...props} />
// }

// Also export the sub-components separately for explicit MDX mapping
export const SectionMessageTitle = MarigoldSectionMessage.Title;
export const SectionMessageContent = MarigoldSectionMessage.Content;
