import React from 'react';
// @ts-ignore (reason: package has no types)
import { preToCodeBlock } from 'mdx-utils';

import { Box, Heading, Text } from '@marigold/components';
import { ComponentProps } from '@marigold/types';
import { useStyles } from '@marigold/system';

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
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const className = useStyles({
    css: {
      lineHeight: 'cap',
      my: 'none',
      mx: 'xxsmall',
      p: 'xxsmall',
      whiteSpace: 'nowrap',
      borderRadius: 'small',
      fontSize: 'xxsmall',
      fontFamily: 'code',
      color: 'gray.10',
      bg: 'gray.90',
    },
  });

  return (
    <code {...props} className={className}>
      {children}
    </code>
  );
};

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
    {children}
  </Box>
);

export const th: React.FC<ComponentProps<'th'>> = ({ children, ...props }) => (
  <Box as="th" p="xsmall" bg="gray.80" {...props}>
    {children}
  </Box>
);

export const tr: React.FC<ComponentProps<'tr'>> = ({ children, ...props }) => (
  <Box as="tr" p="xsmall" {...props}>
    {children}
  </Box>
);
