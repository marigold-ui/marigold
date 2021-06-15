import React from 'react';
import { BoxProps, Heading, Text } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import { ComponentProps, ComponentPropsWithRef } from '@marigold/types/src';

import { CodeBlock } from '../components/CodeBlock';

const { preToCodeBlock } = require('mdx-utils');

export const mdxComponents = {
  h1: (
    props: JSX.IntrinsicAttributes & {
      as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;
      variant?: string | undefined;
    } & ComponentProps<'h1'> & { children?: React.ReactNode }
  ) => {
    return <Heading as="h1" variant="h1" {...props}></Heading>;
  },
  h2: (
    props: JSX.IntrinsicAttributes & {
      as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;
      variant?: string | undefined;
    } & ComponentProps<'h1'> & { children?: React.ReactNode }
  ) => {
    return <Heading as="h2" {...props}></Heading>;
  },
  h3: (
    props: JSX.IntrinsicAttributes & {
      as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;
      variant?: string | undefined;
    } & ComponentProps<'h1'> & { children?: React.ReactNode }
  ) => {
    return <Heading as="h3" variant="h3" {...props}></Heading>;
  },
  h4: (
    props: JSX.IntrinsicAttributes & {
      as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;
      variant?: string | undefined;
    } & ComponentProps<'h1'> & { children?: React.ReactNode }
  ) => {
    return <Heading as="h4" variant="h4" {...props}></Heading>;
  },
  h5: (
    props: JSX.IntrinsicAttributes & {
      as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;
      variant?: string | undefined;
    } & ComponentProps<'h1'> & { children?: React.ReactNode }
  ) => {
    return <Heading as="h5" variant="h5" {...props}></Heading>;
  },
  h6: (
    props: JSX.IntrinsicAttributes & {
      as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;
      variant?: string | undefined;
    } & ComponentProps<'h1'> & { children?: React.ReactNode }
  ) => {
    return <Heading as="h6" variant="h6" {...props}></Heading>;
  },
  inlineCode: (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLElement> &
      React.HTMLAttributes<HTMLElement>
  ) => {
    return (
      <code
        style={{
          lineHeight: b2bTheme.lineHeights.heading,
          margin: '0 2px',
          padding: b2bTheme.space.xxsmall,
          whiteSpace: 'nowrap',
          borderRadius: b2bTheme.space.xxsmall,
          fontSize: b2bTheme.fontSizes.xxsmall,
          color: b2bTheme.colors.gray70,
          backgroundColor: b2bTheme.colors.gray10,
        }}
        {...props}
      ></code>
    );
  },
  ul: (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLUListElement> &
      React.HTMLAttributes<HTMLUListElement>
  ) => {
    return <ul style={{ fontFamily: 'Inter' }} {...props}></ul>;
  },
  ol: (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLOListElement> &
      React.OlHTMLAttributes<HTMLOListElement>
  ) => {
    return <ol style={{ fontFamily: 'Inter' }} {...props}></ol>;
  },
  li: (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLLIElement> &
      React.LiHTMLAttributes<HTMLLIElement>
  ) => {
    return <li style={{ fontFamily: 'Inter' }} {...props}></li>;
  },
  p: (
    props: JSX.IntrinsicAttributes & {
      className?: string | undefined;
      as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | undefined;
      variant?: string | undefined;
      textColor?: string | undefined;
    } & ComponentPropsWithRef<'span'> &
      BoxProps & { children?: React.ReactNode }
  ) => {
    return <Text as="p" variant="body" {...props}></Text>;
  },
  pre: (
    preProps: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLPreElement> &
      React.HTMLAttributes<HTMLPreElement>
  ) => {
    const props = preToCodeBlock(preProps);
    if (props) {
      return <CodeBlock type={props.metastring} {...props} />;
    } else {
      return <pre {...preProps} />;
    }
  },
  table: (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLTableElement> &
      React.TableHTMLAttributes<HTMLTableElement>
  ) => {
    return (
      <table style={{ width: '100%', fontFamily: 'Inter' }} {...props}></table>
    );
  },
  td: (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLTableDataCellElement> &
      React.TdHTMLAttributes<HTMLTableDataCellElement>
  ) => {
    return <td style={{ padding: b2bTheme.space.xsmall }} {...props}></td>;
  },
  th: (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLTableHeaderCellElement> &
      React.ThHTMLAttributes<HTMLTableHeaderCellElement>
  ) => {
    return (
      <th
        style={{
          backgroundColor: b2bTheme.colors.gray30,
          padding: b2bTheme.space.xsmall,
        }}
        {...props}
      ></th>
    );
  },
  tr: (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLTableRowElement> &
      React.HTMLAttributes<HTMLTableRowElement>
  ) => {
    return <tr style={{ padding: b2bTheme.space.xsmall }} {...props}></tr>;
  },
};
