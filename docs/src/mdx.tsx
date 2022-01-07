import React from 'react';
// @ts-ignore (reason: package has no types)
import { preToCodeBlock } from 'mdx-utils';

import { Box, Text } from '@marigold/components';
import { ComponentProps } from '@marigold/types';

import { Preview } from './components/Preview';

// Typography
// ---------------
export const h1: React.FC<ComponentProps<'h1'>> = ({ children, ...props }) => (
  <Text as="h1" variant="headline1" {...props}>
    {children}
  </Text>
);

export const h2: React.FC<ComponentProps<'h2'>> = ({ children, ...props }) => (
  <Text as="h2" variant="headline2" {...props}>
    {children}
  </Text>
);

export const h3: React.FC<ComponentProps<'h3'>> = ({ children, ...props }) => (
  <Text as="h3" variant="headline3" {...props}>
    {children}
  </Text>
);

export const h4: React.FC<ComponentProps<'h4'>> = ({ children, ...props }) => (
  <Text as="h4" variant="headline4" {...props}>
    {children}
  </Text>
);

export const h5: React.FC<ComponentProps<'h5'>> = ({ children, ...props }) => (
  <Text as="h5" variant="headline5" {...props}>
    {children}
  </Text>
);

export const h6: React.FC<ComponentProps<'h6'>> = ({ children, ...props }) => (
  <Text as="h6" variant="headline6" {...props}>
    {children}
  </Text>
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
  <Box
    as="code"
    {...props}
    borderRadius="small"
    p="xxsmall"
    my="none"
    mx="xxsmall"
    css={{
      lineHeight: 'cap',
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
    <Text as="p" variant="body">
      {children}
    </Text>
  </ul>
);

export const ol: React.FC<ComponentProps<'ol'>> = ({ children, ...props }) => (
  <ol {...props}>
    <Text as="p" variant="body">
      {children}
    </Text>
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
    <Text as="p" variant="body">
      {children}
    </Text>
  </Box>
);

export const th: React.FC<ComponentProps<'th'>> = ({ children, ...props }) => (
  <Box as="th" p="xsmall" bg="gray30" {...props}>
    <Text as="h5" variant="headline5">
      {children}
    </Text>
  </Box>
);

export const tr: React.FC<ComponentProps<'tr'>> = ({ children, ...props }) => (
  <Box as="tr" p="xsmall" {...props}>
    {children}
  </Box>
);
