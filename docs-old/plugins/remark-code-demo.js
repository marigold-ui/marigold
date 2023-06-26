import path from 'node:path';
import fs from 'fs-extra';

import { flatMap, getExportedComponent, parseToMdAst } from './utils/ast.js';

/**
 * Very simple argument parser. Converts key=value pairs into
 * an object. `value` will be a string, if only a key is given its
 * value will be set to `true`.
 */
const parseMeta = val =>
  Object.fromEntries(
    val.split(/\s+/).map(part => {
      const [key, val] = part.split('=');
      return [key, val === undefined ? true : val];
    })
  );

/**
 * Test if a node has all information that we need:
 * - is a <code>
 * - has a lang attribute with js, jsx, ts or tsx
 * - has a meta attribute that includes "preview"
 */
const isCodePreview = node =>
  node.type === 'code' &&
  /[jt]sx?/.test(node.lang) &&
  node.meta &&
  node.meta?.includes('preview');

/**
 * Render a preview from `<pre>` blocks for React components.
 * Complex code can be loaded from file.
 */
export const remarkCodeDemo = ({ demoPath, wrapperComponent }) => {
  return tree => {
    flatMap(tree, node => {
      if (!isCodePreview(node)) {
        return [node];
      }

      const meta = parseMeta(node.meta);

      if (meta.file) {
        node.value = fs
          .readFileSync(path.join(demoPath, meta.file), 'utf8')
          .trim();
      }

      const tree = meta.file
        ? getExportedComponent(node.value, node.lang)
        : parseToMdAst(node.value);

      const preview = {
        type: 'mdxJsxFlowElement',
        name: wrapperComponent,
        attributes: [],
        children: tree,
      };

      return [preview, node];
    });

    return tree;
  };
};
