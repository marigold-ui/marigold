import path from 'node:path';
import fs from 'fs-extra';

import { Code } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { mdxjs } from 'micromark-extension-mdxjs';
import { select } from 'unist-util-select';
import remarkCodeExtra from 'remark-code-extra';

const codeFromFile = (file: string) => {
  const filePath = path.resolve(process.cwd(), file);
  const content = fs.readFileSync(filePath, 'utf8');

  return content;
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
    transform: (node: Code) => {
      if (!node.meta) {
        return;
      }

      if (!node.lang) {
        return;
      }

      // poor people's argument parser
      const meta = Object.fromEntries(
        node.meta.split(/\s+/).map(arg => {
          const [key, val] = arg.split('=');
          return [key, val === undefined ? true : val];
        })
      ) as { preview?: undefined; file?: string };

      if (!meta.preview) {
        return;
      }

      if (meta.file) {
        node.value = codeFromFile(meta.file);
        const tree = createPreview('<DemoTest/>');
        console.log(tree);
        return {
          before: [tree],
        };
      }

      const tree = createPreview(node.value);

      return {
        before: [tree],
      };
    },
  },
];
