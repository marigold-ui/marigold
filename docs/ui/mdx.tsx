'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import { HTMLAttributes } from 'react';
import Md from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DateFormat, cn } from '@marigold/system';
import { IconList } from '@/ui/IconList';
import {
  Badge,
  Card,
  Center,
  Columns,
  Headline,
  Inline,
  Link,
  List,
  Scrollable,
  SectionMessage,
  Select,
  Stack,
  Table,
  Tabs,
  Text,
  Tiles,
} from './';
import { AppearanceDemo } from './AppearanceDemo';
import { AppearanceTable } from './AppearanceTable';
import { ColorTokenTable } from './ColorTokens';
import { ComponentDemo } from './ComponentDemo';
import { CopyButton } from './CopyButton';
import { Do, Dont, GuidelineTiles } from './DosAndDonts';
import { FullsizeView } from './FullsizeViewDemo';
import { Image } from './Image';
import { Logo } from './Logo';
import { PropsTable } from './PropsTable';
import { StorybookHintMessage } from './StorybookHintMessage';
import { TeaserCard, TeaserList } from './TeaserCard';
import { Toc } from './Toc';
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
import { LatestPost } from './blog/LatestPost';
import { PostList } from './blog/PostList';

// Typography

// Typography
// ---------------
const typography = {
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <Text {...props} as="p" />
  ),
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level={1} {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level={2} {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level={3} {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level={4} {...props} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level={5} {...props} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Headline level={6} {...props} />
  ),
  a: (props: any) => <Link {...props} />,
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
  ),
  hr: ({ ...props }: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  /**
   * `rehype-pretty-code` wraps <pre> elements inside a figure.
   * We use this figure to retrieve the plain source code and
   * to add additional buttons to the core preview.
   */
  figure: (props: HTMLAttributes<HTMLElement> & { raw: string }) => {
    // We only care about `rehype-pretty-code` figure elements.
    if (!('data-rehype-pretty-code-figure' in props)) {
      return <figure {...props} />;
    }

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
  },
  pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => (
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
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="my-0 inline-grid rounded-xs bg-black/5 px-1 py-0.5 font-mono text-sm before:content-none after:content-none"
      {...props}
    />
  ),
};

// MDX Components
// ---------------
const components = {
  ...typography,
  Image,
  Link,
  // Docs Components
  AlignmentsX,
  AlignmentsY,
  AppearanceDemo,
  AppearanceTable,
  BorderRadius,
  Breakpoints,
  ColorTokenTable,
  ComponentDemo,
  Do,
  Dont,
  GuidelineTiles,
  FontSizes,
  FontStyle,
  FontWeights,
  Headlines,
  IconList,
  Logo,
  PropsTable,
  Spacing,
  StorybookHintMessage,
  TeaserCard,
  TeaserList,
  TextAlign,
  Toc,
  // Blog-related
  LatestPost,
  PostList,
  // Marigold Components
  Badge,
  Card,
  Center,
  Columns,
  DateFormat,
  Headline,
  Inline,
  List,
  Scrollable,
  SectionMessage,
  Select,
  Stack,
  Table,
  Tabs,
  Text,
  Tiles,
};

// Props
// ---------------
interface MdxProps {
  className?: string;
  title?: string;
  code: string;
}

// Component
// ---------------
export const Mdx = ({ className, title, code }: MdxProps) => {
  const Component = useMDXComponent(code, { title });
  return <Component className={className} components={components as any} />;
};

export interface MarkdownProps {
  className?: string;
  contents: string;
}

export const Markdown = ({ className, contents }: MarkdownProps) => (
  <div className={className}>
    <Md
      remarkPlugins={[remarkGfm]}
      components={components}
      disallowedElements={['p']}
      unwrapDisallowed
    >
      {contents}
    </Md>
  </div>
);
