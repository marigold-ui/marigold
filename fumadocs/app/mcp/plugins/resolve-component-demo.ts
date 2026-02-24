import type { Code } from 'mdast';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import demoRegistry from '../../../.registry/demos.json';
import { MdxJsxElement, getJsxAttr } from './shared';

type DemoRegistry = Record<string, { source: string }>;

function getRegistry(): DemoRegistry {
  return demoRegistry as DemoRegistry;
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
