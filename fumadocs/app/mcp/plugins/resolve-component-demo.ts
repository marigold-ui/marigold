import type { Code } from 'mdast';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';
import { MdxJsxElement, getJsxAttr } from './shared';

let registryCache: Record<string, any> | null = null;

const registryPath = path.resolve(__dirname, '../../../.registry/demos.json');

function getRegistry(): Record<string, any> {
  if (!registryCache) {
    registryCache = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
  }
  return registryCache!;
}

export function remarkResolveComponentDemo() {
  const registry = getRegistry();

  return (tree: Node) => {
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'ComponentDemo' || !parent || index === undefined)
          return;

        const demoName = getJsxAttr(node, 'name');
        if (!demoName) return;

        const source = registry[demoName]?.source;
        if (source) {
          (parent.children as Node[])[index] = {
            type: 'code',
            lang: 'tsx',
            meta: `title="${demoName}"`,
            value: source.trim(),
          } as Code;
        } else {
          parent.children.splice(index, 1);
        }
      }
    );
  };
}
