import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { preToCodeBlock } from 'mdx-utils';

import { Heading, Text } from '@marigold/components';
import b2bTheme from '@marigold/theme-b2b';

import { CodeBlock } from './src/components/CodeBlock';
import { Layout } from './src/components/Layout';

const components = {
  h1: props => {
    return <Heading as="h1" variant="h1" {...props}></Heading>;
  },
  h2: props => {
    return <Heading as="h2" {...props}></Heading>;
  },
  h3: props => {
    return <Heading as="h3" variant="h3" {...props}></Heading>;
  },
  h4: props => {
    return <Heading as="h4" variant="h4" {...props}></Heading>;
  },
  h5: props => {
    return <Heading as="h5" variant="h5" {...props}></Heading>;
  },
  h6: props => {
    return <Heading as="h6" variant="h6" {...props}></Heading>;
  },
  inlineCode: props => {
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
  ul: props => {
    return <ul style={{ fontFamily: 'Inter' }} {...props}></ul>;
  },
  ol: props => {
    return <ol style={{ fontFamily: 'Inter' }} {...props}></ol>;
  },
  li: props => {
    return <li style={{ fontFamily: 'Inter' }} {...props}></li>;
  },
  p: props => {
    return <Text as="p" variant="body" {...props}></Text>;
  },
  pre: preProps => {
    const props = preToCodeBlock(preProps);
    if (props) {
      return <CodeBlock type={props.metastring} {...props} />;
    } else {
      return <pre {...preProps} />;
    }
  },
  table: props => {
    return (
      <table style={{ width: '100%', fontFamily: 'Inter' }} {...props}></table>
    );
  },
  td: props => {
    return <td style={{ padding: b2bTheme.space.xsmall }} {...props}></td>;
  },
  th: props => {
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
  tr: props => {
    return <tr style={{ padding: b2bTheme.space.xsmall }} {...props}></tr>;
  },
};

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
