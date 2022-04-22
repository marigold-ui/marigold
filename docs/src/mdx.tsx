import React from 'react';
// @ts-ignore (reason: package has no types)
import { preToCodeBlock } from 'mdx-utils';

import { Box, Headline, Text } from '@marigold/components';
import { ComponentProps } from '@marigold/types';

import { Preview } from './components/Preview';
import { Link } from './components/Link';

// Typography
// ---------------
export const h1: React.FC<ComponentProps<'h1'>> = ({ children, ...props }) => (
  <Headline level="1" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h2: React.FC<ComponentProps<'h2'>> = ({ children, ...props }) => (
  <Headline level="2" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h3: React.FC<ComponentProps<'h3'>> = ({ children, ...props }) => (
  <Headline level="3" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h4: React.FC<ComponentProps<'h4'>> = ({ children, ...props }) => (
  <Headline level="4" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h5: React.FC<ComponentProps<'h5'>> = ({ children, ...props }) => (
  <Headline level="5" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h6: React.FC<ComponentProps<'h6'>> = ({ children, ...props }) => (
  <Headline level="6" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const p: React.FC<ComponentProps<'p'>> = ({ children, ...props }) => (
  <Text {...props}>{children}</Text>
);

export const a: React.FC<ComponentProps<'a'>> = ({
  children,
  href = '',
  ...props
}) => (
  <Link to={href} {...props}>
    {children}
  </Link>
);

// Code
// ---------------
export const inlineCode: React.FC<ComponentProps<'code'>> = ({
  children,
  ...props
}) => (
  <Box
    as="code"
    {...props}
    borderRadius="small"
    p="xxsmall"
    my="none"
    mx="xxsmall"
    css={{
      lineHeight: 'xsmall',
      whiteSpace: 'nowrap',
      fontSize: 'xxsmall',
      fontFamily: 'code',
      color: 'gray80',
      bg: 'gray30',
    }}
  >
    {children}
  </Box>
);

export const pre: React.FC<ComponentProps<'pre'>> = preProps => {
  const props = preToCodeBlock(preProps);
  if (props) {
    return <Preview type={props.metastring} {...props} />;
  }
  return <pre {...preProps} />;
};

// Lists
// ---------------
export const ul: React.FC<ComponentProps<'ul'>> = ({ children, ...props }) => (
  <ul {...props}>
    <Text>{children}</Text>
  </ul>
);

export const ol: React.FC<ComponentProps<'ol'>> = ({ children, ...props }) => (
  <ol {...props}>
    <Text>{children}</Text>
  </ol>
);

export const li: React.FC<ComponentProps<'li'>> = ({ children, ...props }) => (
  <li {...props}>{children}</li>
);

// Table
// ---------------
export const table: React.FC<ComponentProps<'table'>> = ({
  children,
  ...props
}) => (
  <Box as="table" width="100%" {...props}>
    {children}
  </Box>
);

export const td: React.FC<ComponentProps<'td'>> = ({ children, ...props }) => (
  <Box as="td" p="xsmall" {...props}>
    <Text>{children}</Text>
  </Box>
);

export const th: React.FC<ComponentProps<'th'>> = ({ children, ...props }) => (
  <Box as="th" p="xsmall" bg="gray30" {...props}>
    <Headline level="5">{children}</Headline>
  </Box>
);

export const tr: React.FC<ComponentProps<'tr'>> = ({ children, ...props }) => (
  <Box as="tr" p="xsmall" {...props}>
    {children}
  </Box>
);
