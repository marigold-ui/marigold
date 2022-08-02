import path from 'node:path';
import fs from 'fs-extra';

import { Program, Identifier } from 'estree';
import { visit as estreeVisit } from 'estree-util-visit';
import { Code } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { mdxjs } from 'micromark-extension-mdxjs';
import remarkCodeExtra from 'remark-code-extra';
import { JsxEmit, ModuleKind, ScriptTarget, transpileModule } from 'typescript';
import { visit } from 'unist-util-visit';

import { DEMO_PATH } from '../config';

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
 * Try to find the preview to render based on the exported component.
 * Note that any component has to exist in the MDX scope to make this work.
 * Meaing it has to be added to the `<MDXProvider>`.
 */
const findExportedComponent = (code: string) => {
  const result = code.match(/export const\s(?<component>\w+)\s/);
  if (!result?.groups) {
    throw Error(
      'No demo component found. Please make sure to export a component from your demo file.'
    );
  }
  return `<${result.groups.component}/>`;
};

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

  let component = '';
  estreeVisit(tree, node => {
    if (component) {
      return;
    }
    if (node.type === 'ExportNamedDeclaration') {
      estreeVisit(node, child => {
        // TODO: can we be more specific? go into the `declarations`?
        if (component) {
          return;
        }
        if (child.type === 'Identifier') {
          component = (child as Identifier).name;
        }
      });
    }
  });

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

export const remarkCodeDemo: any = [
  //@ts-ignore-error
  remarkCodeExtra,
  {
    transform: async (node: Code) => {
      if (!node.lang) {
        return;
      }

      if (!node.meta) {
        return;
      }

      const meta = parseMeta(node.meta);

      if (!meta.preview) {
        return;
      }

      if (meta.file) {
        node.value = await fs.readFile(path.join(DEMO_PATH, meta.file), 'utf8');
      }

      const code = meta.file
        ? getExportedComponent(node.value, node.lang)
        : node.value;
      const tree = parseCodeToAst(code);

      return {
        before: [
          {
            type: 'mdxJsxFlowElement',
            name: 'Demo',
            attributes: [],
            children: tree,
          },
        ],
      };
    },
  },
];

// export const plugin = () => {
//   return tree => {
//     visit(tree, 'code', node => {
//       console.log(node);
//     });
//   };
// };
