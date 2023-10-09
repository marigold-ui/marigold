'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { HTMLAttributes } from 'react';

import Image from 'next/image';

import { IconList } from '@/ui/IconList';

import { Headline, Link, Message, Tabs, Text } from './';
import { AppearanceTable } from './AppearanceTable';
import { ColorTokenTable } from './ColorTokens';
import { ComponentDemo } from './ComponentDemo';
import { CopyButton } from './CopyButton';
import { PropsTable } from './PropsTable';
import {
  AlignmentsX,
  AlignmentsY,
  BorderRadius,
  Breakpoints,
  Spacing,
} from './Token';
import {
  FontSizes,
  FontStyle,
  FontWeights,
  Headlines,
  TextAlign,
} from './Typography';

// Typography
// ---------------
const typography = {
  p: (props: HTMLAttributes<HTMLParagraphElement>) => <Text {...props} />,
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level="1" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level="2" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level="3" {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level="4" {...props} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level="5" {...props} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level="6" {...props} />
  ),
  a: (props: HTMLAttributes<HTMLAnchorElement>) => <Link {...props} />,
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-bg-surface-raised/90 my-0 inline-grid rounded px-1 py-0.5 font-mono text-sm before:content-none after:content-none"
      {...props}
    />
  ),
  hr: ({ ...props }: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  // `raw` is source code to be copied
  pre: ({
    raw,
    ...props
  }: HTMLAttributes<HTMLPreElement> & { raw: string }) => {
    return (
      <div className="relative ">
        <pre
          className="max-h-[650px] overflow-x-auto rounded-lg px-3 py-4 [&>code]:bg-transparent"
          {...props}
        >
          <div className="absolute right-4 top-4">
            <CopyButton codeString={raw} />
          </div>
          {props.children}
        </pre>
      </div>
    );
  },
};

// MDX Components
// ---------------
const components = {
  ...typography,
  // TODO: wrap Marigold's Image/Link with next's image/link component
  ComponentDemo,
  Headline,
  Message,
  Tabs,
  Text,
  IconList,
  AlignmentsX,
  AlignmentsY,
  AppearanceTable,
  BorderRadius,
  Breakpoints,
  ColorTokenTable,
  FontSizes,
  FontStyle,
  FontWeights,
  Headlines,
  PropsTable,
  Spacing,
  TextAlign,
};

// Props
// ---------------
interface MdxProps {
  title?: string;
  code: string;
}

// Component
// ---------------
export const Mdx = ({ title, code }: MdxProps) => {
  const Component = useMDXComponent(code, { title });
  return <Component components={components} />;
};
