import path from 'node:path';
import fs from 'fs-extra';

import { Code } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { mdxjs } from 'micromark-extension-mdxjs';
import { select } from 'unist-util-select';
import remarkCodeExtra from 'remark-code-extra';

// poor people's argument parser
const parseMeta = (val: string) =>
  Object.fromEntries(
    val.split(/\s+/).map(part => {
      const [key, val] = part.split('=');
      return [key, val === undefined ? true : val];
    })
  ) as { preview?: undefined; file?: string };

const codeFromFile = async (file: string) => {
  const filePath = path.resolve(process.cwd(), file);
  const content = await fs.readFile(filePath, 'utf8');

  return content;
};

// import { JsxEmit, ModuleKind, ScriptTarget, transpileModule } from 'typescript';
// const transpile = (code: string) =>
//   transpileModule(code, {
//     compilerOptions: {
//       module: ModuleKind.ESNext,
//       jsx: JsxEmit.Preserve,
//       target: ScriptTarget.ESNext,
//     },
//   }).outputText;

const getDemoComponent = (code: string) => {
  const result = /export const\s(\w+)\s/.exec(code);

  if (!result) {
    throw Error(
      'No demo component found. Please make sure to export a component from your demo file.'
    );
  }

  // result = [<searched senctence>, <1st capturing group>, ...]
  const [, component] = result;
  return component;
};

const createPreview = (code: string) => {
  const tree = fromMarkdown(
    `<Demo>${code}</Demo>`.replace(/(\r\n|\n|\r)/gm, ''),
    {
      extensions: [mdxjs()],
      mdastExtensions: [mdxFromMarkdown()],
    }
  );

  return select(':any(mdxJsxTextElement, mdxJsxFlowElement)', tree)!;
};

export const remarkCodeDemo: any = [
  //@ts-ignore-error
  remarkCodeExtra,
  {
    transform: async (node: Code) => {
      if (!node.meta) {
        return;
      }

      if (!node.lang) {
        return;
      }

      const meta = parseMeta(node.meta);

      if (!meta.preview) {
        return;
      }

      if (meta.file) {
        node.value = await codeFromFile(meta.file);
      }

      const tree = createPreview(
        meta.file ? `<${getDemoComponent(node.value)}/>` : node.value
      );

      return {
        before: [tree],
      };
    },
  },
];
