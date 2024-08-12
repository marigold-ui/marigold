import { Node } from 'unist';
import { u } from 'unist-builder';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';

// Types
// ---------------
export type MdxJsxAttribute =
  | { type: 'mdxJsxAttribute'; name: string; value: string }
  | {
      type: 'mdxJsxAttribute';
      name: string;
      value: {
        type: 'mdxJsxAttributeValueExpression';
        value: any;
        data: object;
      };
    };

export interface RehypeNode extends Node {
  name?: string;
  attributes?: (
    | MdxJsxAttribute
    // Fallback
    | { type: string; name: string; value: unknown }
  )[];
  metastring?: string;
  children?: RehypeNode[];
}

export interface RehypeTree extends Node {
  children: RehypeNode[];
}

export interface VFile {
  data: {
    rawDocumentData: {
      sourceFilePath: string;
      sourceFileName: string;
      sourceFileDir: string;
      contentType: string;
      flattenedPath: string;
    };
  };
  messages: unknown[];
  history: string[];
  cwd: string;
  value: string;
}

// Helpers
// ---------------
const getJsxAttr = (node: RehypeNode, needle: string) => {
  const attr = node.attributes?.find(
    ({ type, name }) => type === 'mdxJsxAttribute' && name === needle
  ) as MdxJsxAttribute;

  // Attribute not found
  if (!attr) {
    return;
  }

  // Attr is a string
  if (typeof attr === 'string') {
    return attr;
  }

  // mdxJsxAttribute with string value (e.g. <Component foo="bar"/>)
  if (typeof attr.value === 'string') {
    return attr.value;
  }

  // Complex attribute type (mdxJsxAttribute with a mdxJsxAttributeValueExpression)
  return attr.value.value;
};

// Plugin
// ---------------
export interface RehypeComponentDemoConfig {
  contentDirPath: string;
}

export const rehypeComponentDemo = ({
  contentDirPath,
}: RehypeComponentDemoConfig) => {
  return async (tree: RehypeTree, f: any) => {
    const file = f as VFile;

    visit(tree, (node: RehypeNode) => {
      // 1. Find our demo component component
      if (node.name === 'ComponentDemo') {
        // 2. Find out which demo to use
        const demoPath = getJsxAttr(node, 'file');
        if (!demoPath || typeof demoPath !== 'string') return;

        try {
          // 3. Load the demo source from the file system
          const filePath = path.join(
            file.cwd,
            contentDirPath,
            file.data.rawDocumentData.sourceFileDir,
            demoPath
          );
          const source = fs.readFileSync(filePath, 'utf-8');
          const name = path.basename(demoPath, '.demo.tsx');

          // 4. Add the name and source code (as string) to the component props
          node.attributes?.push(
            {
              type: 'mdxJsxAttribute',
              name: 'name',
              value: name,
            },
            {
              type: 'mdxJsxAttribute',
              name: 'source',
              value: source,
            }
          );

          // 5. Render the code as children
          node.children?.push(
            u('element', {
              tagName: 'pre',
              /**
               * Require for `rehype-pretty-code` since it expects every
               * element to have a `properties` prop.
               */
              properties: {},
              children: [
                u('element', {
                  tagName: 'code',
                  properties: {
                    /**
                     * Required for `rehype-pretty-code`. Yes, this needs
                     * to be an array on the <code> element.
                     */
                    className: ['language-tsx'],
                    /**
                     * See https://rehype-pretty.pages.dev/#meta-strings
                     */
                    metastring: getJsxAttr(node, 'meta'),
                  },
                  children: [
                    {
                      type: 'text',
                      value: source,
                    },
                  ],
                }),
              ],
            })
          );
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
};
