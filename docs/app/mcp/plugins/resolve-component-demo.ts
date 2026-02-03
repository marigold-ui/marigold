import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';
import { MdxJsxElement, getJsxAttr } from './shared';

export interface ResolveComponentDemoOptions {
  contentDir: string;
  filePath: string;
}

/**
 * Replaces <ComponentDemo file="..." /> with actual code blocks.
 */
export function remarkResolveComponentDemo(
  options: ResolveComponentDemoOptions
) {
  const { contentDir, filePath } = options;
  const fileDir = path.dirname(path.join(contentDir, filePath));

  return (tree: Node) => {
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'ComponentDemo') return;
        if (!parent || typeof index !== 'number') return;

        const demoFile = getJsxAttr(node, 'file');
        if (!demoFile) return;

        try {
          const demoPath = path.join(fileDir, demoFile);
          const source = fs.readFileSync(demoPath, 'utf-8');
          const demoName = path.basename(demoFile, '.demo.tsx');

          (parent.children as Node[])[index] = {
            type: 'code',
            lang: 'tsx',
            meta: `title="${demoName}"`,
            value: source.trim(),
          } as Node;
        } catch {
          (parent.children as Node[])[index] = {
            type: 'paragraph',
            children: [
              { type: 'text', value: `[Demo not found: ${demoFile}]` },
            ],
          } as Node;
        }
      }
    );
  };
}
