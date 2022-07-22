import React from 'react';

import { Box, Headline, Text } from '@marigold/components';
import { ComponentProps } from '@marigold/types';

import { Link } from './components/Link';

import CodeEditorEditable from './components/CodeEditorEditable';
import CodeEditorExperience from './components/CodeEditorExperience';
import CodeEditorStatic from './components/CodeEditorStatic';

// Typography
// ---------------
export const h1 = ({ children, ...props }: ComponentProps<'h1'>) => (
  <Headline level="1" {...props}>
    {children}
  </Headline>
);

export const h2 = ({ children, ...props }: ComponentProps<'h2'>) => (
  <Headline level="2" {...props}>
    {children}
  </Headline>
);

export const h3 = ({ children, ...props }: ComponentProps<'h3'>) => (
  <Headline level="3" {...props}>
    {children}
  </Headline>
);

export const h4 = ({ children, ...props }: ComponentProps<'h4'>) => (
  <Headline level="4" {...props}>
    {children}
  </Headline>
);

export const h5 = ({ children, ...props }: ComponentProps<'h5'>) => (
  <Headline level="5" {...props}>
    {children}
  </Headline>
);

export const h6 = ({ children, ...props }: ComponentProps<'h6'>) => (
  <Headline level="6" {...props}>
    {children}
  </Headline>
);

export const p = Text;

export const a = ({ children, href = '', ...props }: ComponentProps<'a'>) => (
  <Link to={href} {...props}>
    {children}
  </Link>
);

interface CodeProps {
  editor: string;
  noInline: string;
  pre: ComponentProps<'pre'>;
  children: any;
}

export const pre = (props: CodeProps) => {
  if (props.editor !== undefined) {
    return (
      <CodeEditorEditable
        code={props.children.props.children}
        noInline={props.noInline}
      />
    );
  } else {
    return <CodeEditorStatic code={props.children.props.children} />;
  }
};
