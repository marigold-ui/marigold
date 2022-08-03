import path from 'node:path';
import fs from 'fs-extra';

import type { Program } from 'estree';
import type { Code, Parent } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { mdxjs } from 'micromark-extension-mdxjs';
import remarkCodeExtra from 'remark-code-extra';
import { JsxEmit, ModuleKind, ScriptTarget, transpileModule } from 'typescript';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

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

  return `<${component}/>`;
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

// export const remarkCodeDemo: any = [
//   //@ts-ignore-error
//   remarkCodeExtra,
//   {
//     transform: async (node: Code) => {
//       return {};
//       if (!node.lang) {
//         return;
//       }

//       if (!node.meta) {
//         return;
//       }

//       const meta = parseMeta(node.meta);

//       if (!meta.preview) {
//         return;
//       }

//       if (meta.file) {
//         node.value = await fs.readFile(path.join(DEMO_PATH, meta.file), 'utf8');
//       }

//       const code = meta.file
//         ? getExportedComponent(node.value, node.lang)
//         : node.value;
//       const tree = parseCodeToAst(code);

//       return {
//         before: [
//           {
//             type: 'mdxJsxFlowElement',
//             name: 'Demo',
//             attributes: [],
//             children: tree,
//           },
//         ],
//       };
//     },
//   },
// ];

export const remarkCodeDemo = (): Transformer => {
  return tree => {
    flatMap(tree, node => {
      if (node.type !== 'code') {
        return [node];
      }

      if (!node.lang) {
        return [node];
      }

      if (!node.meta) {
        return [node];
      }

      const meta = parseMeta(node.meta);

      if (!meta.preview) {
        return [node];
      }

      if (meta.file) {
        node.value = fs.readFileSync(path.join(DEMO_PATH, meta.file), 'utf8');
      }

      const code = meta.file
        ? getExportedComponent(node.value, node.lang)
        : node.value;
      const tree = parseCodeToAst(code);

      const preview = {
        type: 'mdxJsxFlowElement',
        name: 'Demo',
        attributes: [],
        children: tree,
      };

      return [node, preview];
    });

    // const nodes: [any, number, Parent][] = [];

    // visit(
    //   tree,
    //   'code',
    //   (node: Code, index: number | null, parent: Parent | null) => {
    //     if (!parent) {
    //       return;
    //     }

    //     if (index === null) {
    //       return;
    //     }

    //     if (!node.lang) {
    //       return;
    //     }

    //     if (!node.meta) {
    //       return;
    //     }

    //     const meta = parseMeta(node.meta);

    //     if (!meta.preview) {
    //       return;
    //     }

    //     if (meta.file) {
    //       node.value = fs.readFileSync(path.join(DEMO_PATH, meta.file), 'utf8');
    //     }

    //     const code = meta.file
    //       ? getExportedComponent(node.value, node.lang)
    //       : node.value;
    //     const tree = parseCodeToAst(code);

    //     const preview = {
    //       type: 'mdxJsxFlowElement',
    //       name: 'Demo',
    //       attributes: [],
    //       children: tree,
    //     };

    //     nodes.push([preview, index, parent]);
    //   }
    // );

    // nodes.forEach(([node, index, parent]) => {
    //   // console.log(node);
    //   // parent.children.splice(index, 0, p);
    //   parent.children.push(node);
    // });

    return tree;
  };
};

// export const plugin = (): Transformer => {
//   return async tree => {
//     const nodes: [any, number, Parent][] = [];

//     visit(
//       tree,
//       'code',
//       (node: Code, index: number | null, parent: Parent | null) => {
//         if (!parent) {
//           return;
//         }

//         if (index === null) {
//           return;
//         }

//         if (!node.lang) {
//           return;
//         }

//         if (!node.meta) {
//           return;
//         }

//         const meta = parseMeta(node.meta);

//         if (!meta.preview) {
//           return;
//         }

//         if (meta.file) {
//           node.value = fs.readFileSync(path.join(DEMO_PATH, meta.file), 'utf8');
//         }

//         const code = meta.file
//           ? getExportedComponent(node.value, node.lang)
//           : node.value;
//         const tree = parseCodeToAst(code);

//         const preview = {
//           type: 'mdxJsxFlowElement',
//           name: 'Demo',
//           attributes: [],
//           children: tree,
//         };

//         nodes.push([preview, index, parent]);
//       }
//     );

//     nodes.forEach(([node, index, parent]) => {
//       // console.log(node);

//       const p = {
//         type: 'paragraph',
//         children: [
//           {
//             type: 'text',
//             value: '!!!!!!!!!!!!!!!!!!!!!HELLO!!!!!!!!!!!!!!!!!',
//           },
//         ],
//       };
//       // parent.children.splice(index, 0, p);
//       parent.children.push(node);
//     });

//     return tree;
//   };
// };
