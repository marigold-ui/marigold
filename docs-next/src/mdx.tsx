import React from 'react';

import { Box, Headline, Text } from '@marigold/components';
import { ComponentProps } from '@marigold/types';

import { Link } from './components/Link';

// Typography
// ---------------
export const h1 = ({ children, ...props }: ComponentProps<'h1'>) => (
  <Headline level="1" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h2 = ({ children, ...props }: ComponentProps<'h2'>) => (
  <Headline level="2" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h3 = ({ children, ...props }: ComponentProps<'h3'>) => (
  <Headline level="3" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h4 = ({ children, ...props }: ComponentProps<'h4'>) => (
  <Headline level="4" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h5 = ({ children, ...props }: ComponentProps<'h5'>) => (
  <Headline level="5" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const h6 = ({ children, ...props }: ComponentProps<'h6'>) => (
  <Headline level="6" variant="mdx" {...props}>
    {children}
  </Headline>
);

export const p = ({ children, ...props }: ComponentProps<'p'>) => (
  <Text {...props}>{children}</Text>
);

export const a = ({ children, href = '', ...props }: ComponentProps<'a'>) => (
  <Link to={href} {...props}>
    {children}
  </Link>
);

// Code
// ---------------
export const inlineCode = ({ children, ...props }: ComponentProps<'code'>) => (
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

// Lists
// ---------------
export const ul = ({ children, ...props }: ComponentProps<'ul'>) => (
  <ul {...props}>
    <Text>{children}</Text>
  </ul>
);

export const ol = ({ children, ...props }: ComponentProps<'ol'>) => (
  <ol {...props}>
    <Text>{children}</Text>
  </ol>
);

export const li = ({ children, ...props }: ComponentProps<'li'>) => (
  <li {...props}>{children}</li>
);

// Table
// ---------------
export const table = ({ children, ...props }: ComponentProps<'table'>) => (
  <Box as="table" width="100%" {...props}>
    {children}
  </Box>
);

export const td = ({ children, ...props }: ComponentProps<'td'>) => (
  <Box as="td" p="xsmall" {...props}>
    <Text>{children}</Text>
  </Box>
);

export const th = ({ children, ...props }: ComponentProps<'th'>) => (
  <Box as="th" p="xsmall" bg="gray30" {...props}>
    <Headline level="5">{children}</Headline>
  </Box>
);

export const tr = ({ children, ...props }: ComponentProps<'tr'>) => (
  <Box as="tr" p="xsmall" {...props}>
    {children}
  </Box>
);
