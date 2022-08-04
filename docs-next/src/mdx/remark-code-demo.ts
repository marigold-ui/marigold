import path from 'node:path';
import fs from 'fs-extra';

import type { Code } from 'mdast';
import type { Transformer } from 'unified';

import { flatMap, getExportedComponent, parseToMdAst } from './utils/ast';

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

export interface Options {
  previewComponent: string;
  demoPath: string;
}

/**
 * Render a preview from `<pre>` blocks for React components.
 * Complex code can be loaded from file.
 */
export const remarkCodeDemo = ({
  demoPath,
  previewComponent,
}: Options): Transformer => {
  return tree => {
    flatMap(tree, node => {
      if (!isCodePreview(node)) {
        return [node];
      }

      const meta = parseMeta(node.meta);

      if (meta.file) {
        node.value = fs.readFileSync(path.join(demoPath, meta.file), 'utf8');
      }

      const tree = meta.file
        ? getExportedComponent(node.value, node.lang)
        : parseToMdAst(node.value);

      const preview = {
        type: 'mdxJsxFlowElement',
        name: previewComponent,
        attributes: [],
        children: tree,
      };

      return [preview, node];
    });

    return tree;
  };
};
