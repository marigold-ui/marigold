import React from 'react';
// @ts-ignore (reason: package has no types)
import { preToCodeBlock } from 'mdx-utils';

import { Heading, Text } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';
import { ComponentProps } from '@marigold/types';

import { CodeBlock } from './components/CodeBlock';

// Typography
// ---------------
export const h1: React.FC<ComponentProps<'h1'>> = ({ children, ...props }) => (
  <Heading as="h1" variant="h1" {...props}>
    {children}
  </Heading>
);

export const h2: React.FC<ComponentProps<'h2'>> = ({ children, ...props }) => (
  <Heading as="h2" variant="h2" {...props}>
    {children}
  </Heading>
);

export const h3: React.FC<ComponentProps<'h3'>> = ({ children, ...props }) => (
  <Heading as="h3" variant="h3" {...props}>
    {children}
  </Heading>
);

export const h4: React.FC<ComponentProps<'h4'>> = ({ children, ...props }) => (
  <Heading as="h4" variant="h4" {...props}>
    {children}
  </Heading>
);

export const h5: React.FC<ComponentProps<'h5'>> = ({ children, ...props }) => (
  <Heading as="h5" variant="h5" {...props}>
    {children}
  </Heading>
);

export const h6: React.FC<ComponentProps<'h6'>> = ({ children, ...props }) => (
  <Heading as="h6" variant="h6" {...props}>
    {children}
  </Heading>
);

export const p: React.FC<ComponentProps<'p'>> = ({ children, ...props }) => (
  <Text as="p" variant="body" {...props}>
    {children}
  </Text>
);

// Code
// ---------------
export const inlineCode: React.FC<ComponentProps<'code'>> = ({
  children,
  ...props
}) => (
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

export const pre: React.FC<ComponentProps<'pre'>> = preProps => {
  const props = preToCodeBlock(preProps);
  if (props) {
    return <CodeBlock type={props.metastring} {...props} />;
  }
  return <pre {...preProps} />;
};

// Lists
// ---------------
export const ul: React.FC<ComponentProps<'ul'>> = ({ children, ...props }) => (
  <ul {...props}>{children}</ul>
);

export const ol: React.FC<ComponentProps<'ol'>> = ({ children, ...props }) => (
  <ol {...props}>{children}</ol>
);

export const li: React.FC<ComponentProps<'li'>> = ({ children, ...props }) => (
  <li style={{ fontFamily: 'Inter' }} {...props}>
    {children}
  </li>
);

// Table
// ---------------
export const table: React.FC<ComponentProps<'table'>> = ({
  children,
  ...props
}) => (
  <table style={{ width: '100%', fontFamily: 'Inter' }} {...props}>
    {children}
  </table>
);

export const td: React.FC<ComponentProps<'td'>> = ({ children, ...props }) => (
  <td style={{ padding: b2bTheme.space.xsmall }} {...props}>
    {children}
  </td>
);

export const th: React.FC<ComponentProps<'th'>> = ({ children, ...props }) => (
  <th
    style={{
      backgroundColor: b2bTheme.colors.gray30,
      padding: b2bTheme.space.xsmall,
    }}
    {...props}
  >
    {children}
  </th>
);

export const tr: React.FC<ComponentProps<'tr'>> = ({ children, ...props }) => (
  <tr style={{ padding: b2bTheme.space.xsmall }} {...props}>
    {children}
  </tr>
);
