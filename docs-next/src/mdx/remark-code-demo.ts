import path from 'node:path';
import fs from 'fs-extra';

import type { Program } from 'estree';
import type { Code } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { mdxjs } from 'micromark-extension-mdxjs';
import { JsxEmit, ModuleKind, ScriptTarget, transpileModule } from 'typescript';
import type { Transformer } from 'unified';
import type { Node } from 'unist';

import { getFirstNamedExport } from './utils/estree';
import { DEMO_PATH } from '../config';
import { flatMap } from './utils/unist';

/**
 * Very simple argument parser. Converts key=value pairs into
 * an object. `value` will be a string, if only a key is given its
 * value will be set to `true`.
 */
const parseMeta = (val: string) =>
  Object.fromEntries(
    val.split(/\s+/).map(part => {
      const [key, val] = part.split('=');
      return [key, val === undefined ? true : val];
    })
  ) as { preview?: undefined; file?: string };

/**
 * Try to find the preview to render based on an exported component.
 * Note that any component has to exist in the MDX scope to make this work,
 * it has to be added to the `<MDXProvider>`.
 */
const getExportedComponent = (input: string, lang: string) => {
  const code = /tsx?/.test(lang)
    ? transpileModule(input, {
        compilerOptions: {
          module: ModuleKind.ESNext,
          jsx: JsxEmit.Preserve,
          target: ScriptTarget.ESNext,
        },
      }).outputText
    : input;

  const tree = parseCodeToAst(code)[0].data?.estree as Program;
  const component = getFirstNamedExport(tree);

  if (!component) {
    throw Error(
      'No component for demo found. Please make sure to export a component from your demo file.'
    );
  }

  // return `<${component}/>`;

  return [
    {
      type: 'mdxJsxFlowElement',
      name: component,
      attributes: [],
      children: [],
    },
  ];
};

/**
 * Create the `mdast` from the code using the mdx extensions.
 */
const parseCodeToAst = (code: string) => {
  return fromMarkdown(code, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  }).children;
};

/**
 * Test if a node has all information that we need:
 * - is a <code>
 * - has a lang attribute with js, jsx, ts or tsx
 * - has a meta attribute that includes "preview"
 */
const isCodePreview = (
  node: any
): node is Code & { meta: string; lang: 'js' | 'jsx' | 'ts' | 'tsx' } =>
  node.type === 'code' &&
  /[jt]sx?/.test(node.lang) &&
  node.meta &&
  node.meta?.includes('preview');

/**
 * Render a preview from `<pre>` blocks for React components.
 * Complex code can be loaded from file.
 */
export const remarkCodeDemo = (): Transformer => {
  return tree => {
    flatMap(tree, node => {
      if (!isCodePreview(node)) {
        return [node];
      }

      const meta = parseMeta(node.meta);

      if (meta.file) {
        node.value = fs.readFileSync(path.join(DEMO_PATH, meta.file), 'utf8');
      }

      const tree = meta.file
        ? getExportedComponent(node.value, node.lang)
        : parseCodeToAst(node.value);

      const preview = {
        type: 'mdxJsxFlowElement',
        name: 'Demo',
        attributes: [],
        children: tree,
      };

      return [preview, node];
    });

    return tree;
  };
};
