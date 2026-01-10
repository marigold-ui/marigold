import {
  Badge,
  TableBody,
  TableCell,
  TableColumn,
  Table as TableComponent,
  TableHeader,
  TableRow,
} from '@/components/mdx-wrapper-components';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

// Create Table with dot-notation support
const Table = Object.assign(TableComponent, {
  Row: TableRow,
  Header: TableHeader,
  Body: TableBody,
  Cell: TableCell,
  Column: TableColumn,
});

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Badge,
    Table,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableColumn,
    ...components,
    pre: props => (
      <CodeBlock keepBackground {...props} allowCopy={false}>
        <Pre {...props}>{props.children}</Pre>
      </CodeBlock>
    ),
    figure: props => (
      <CodeBlock {...props}>
        <figure {...props}>{props.children}</figure>
      </CodeBlock>
    ),
  };
}
