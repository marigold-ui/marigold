import { Badge } from '@/app/_components/mdx-wrapper-components';
import { Pre } from 'fumadocs-ui/components/codeblock';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { CustomCodeBlock } from './app/_components/CodeBlock';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Badge,
    ...components,
    pre: props => (
      <CustomCodeBlock keepBackground {...props}>
        <Pre {...props}>{props.children}</Pre>
      </CustomCodeBlock>
    ),
    figure: props => (
      <CustomCodeBlock {...props}>
        <figure {...props}>{props.children}</figure>
      </CustomCodeBlock>
    ),
  };
}
