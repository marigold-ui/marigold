'use client';
import { HTMLAttributes } from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';

import * as DocComponents from '@/app/components/components';
import { IconList } from '@/app/components';

import { Headline, Message, Link, Text } from './';
import { ComponentDemo } from './ComponentDemo';
import { CopyButton } from './CopyButton';

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
    <code className="rounded  font-mono text-sm" {...props} />
  ),
  hr: ({ ...props }: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  // `__rawString__` is source code to be copied
  pre: ({
    __rawString__,
    ...props
  }: HTMLAttributes<HTMLPreElement> & { __rawString__: string }) => {
    return (
      <div className="relative">
        <pre
          className="max-h-[650px] max-w-[800px] overflow-x-auto rounded-lg px-3 py-4"
          {...props}
        >
          <div className="absolute right-4 top-4">
            <CopyButton codeString={__rawString__} />
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
  // TODO: wrap Marigold's Image/Link with next's image/link component
  ComponentDemo,
  Headline,
  Message,
  Text,
  IconList,
  ...DocComponents,
  ...typography,
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
  const Component = useMDXComponent(code, { title: title });
  // @ts-expect-error (Marigold exports includes some hooks)
  return <Component components={components} />;
};
