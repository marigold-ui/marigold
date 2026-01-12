import type { Root } from 'mdast';
import { codeToHast } from 'shiki';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';
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

export interface RehypeNode {
  type: string;
  name?: string;
  attributes?: (
    | MdxJsxAttribute
    // Fallback
    | { type: string; name: string; value: unknown }
  )[];
  metastring?: string;
  children?: RehypeNode[];
  tagName?: string;
  properties?: Record<string, any>;
  value?: string;
}

// Helpers
// ---------------
const getJsxAttr = (node: RehypeNode, needle: string) => {
  const attr = node.attributes?.find(
    ({ type, name }) => type === 'mdxJsxAttribute' && name === needle
  ) as MdxJsxAttribute | undefined;

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

const cleanSource = (source: string): string => {
  // Remove 'use client' and 'use server' directives
  let cleaned = source.replace(/^['"]use (client|server)['"];?\s*\n/m, '');

  // Trim leading/trailing whitespace but preserve internal formatting
  cleaned = cleaned.trim();

  return cleaned;
};

// Plugin
// ---------------
export interface RehypeComponentDemoConfig {
  contentDirPath: string;
}

export const rehypeComponentDemo = ({
  contentDirPath,
}: RehypeComponentDemoConfig) => {
  return async (tree: Root, file: VFile) => {
    const filePath = file.path;
    if (!filePath) return;

    // Get the directory of the current MDX file
    const fileDir = path.dirname(filePath);

    const promises: Promise<void>[] = [];

    visit(tree, (node: any) => {
      // 1. Find our ComponentDemo component
      if (node.name === 'ComponentDemo') {
        // 2. Find out which demo to use - support both 'file' and 'name' props
        let demoPath = getJsxAttr(node, 'file');

        // Fallback to 'name' prop for backward compatibility
        if (!demoPath) {
          const name = getJsxAttr(node, 'name');
          if (name && typeof name === 'string') {
            demoPath = `${name}.demo.tsx`;
          }
        }

        if (!demoPath || typeof demoPath !== 'string') return;

        const promise = (async () => {
          try {
            // 3. Load the demo source from the file system
            const absolutePath = path.join(fileDir, demoPath);
            const rawSource = fs.readFileSync(absolutePath, 'utf-8');
            const name = path.basename(demoPath, '.demo.tsx');

            // 4. Clean the source (remove 'use client', trim whitespace)
            const source = cleanSource(rawSource);

            // 5. Highlight the code using shiki and convert to hast tree
            const highlighted = await codeToHast(source, {
              lang: 'tsx',
              themes: {
                light: 'material-theme-palenight',
                dark: 'material-theme-palenight',
              },
            });

            // 6. Add the name, source, and highlighted code AST to component props
            if (!node.attributes) {
              node.attributes = [];
            }

            node.attributes.push(
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

            // 7. Add the highlighted code as children
            if (!node.children) {
              node.children = [];
            }

            node.children.push(highlighted);
          } catch (err) {
            console.error(
              `[rehype-component-demo] Error processing demo: ${demoPath}`,
              err
            );
          }
        })();

        promises.push(promise);
      }
    });

    await Promise.all(promises);
  };
};
