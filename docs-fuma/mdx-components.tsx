import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    pre: props => (
      <CodeBlock>
        <Pre {...props} className="bg-red-300">
          {props.children}
        </Pre>
      </CodeBlock>
    ),
    figure: props => (
      <CodeBlock>
        <figure {...props} className="Osama">
          {props.children}
        </figure>
      </CodeBlock>
    ),
  };
}
