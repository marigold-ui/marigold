import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { preToCodeBlock } from 'mdx-utils';
import b2bTheme from '@marigold/theme-b2b';
import { CodeBlock } from './src/components/CodeBlock';

const components = {
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
  table: props => {
    return <table style={{ width: '100%' }} {...props}></table>;
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
  td: props => {
    return <td style={{ padding: b2bTheme.space.xsmall }} {...props}></td>;
  },
  pre: preProps => {
    const props = preToCodeBlock(preProps);
    if (props) {
      return <CodeBlock type={props.metastring} {...props} />;
    } else {
      return <pre {...preProps} />;
    }
  },
};

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};
