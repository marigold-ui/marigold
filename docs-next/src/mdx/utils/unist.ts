import type { Node, Parent } from 'unist';

export type MapFunction = (
  node: Node,
  index: number,
  parent: Parent | null
) => Node[];

const hasChildren = (node: Node | Parent): node is Parent => 'children' in node;

export const flatMap = (tree: Parent | Node, mapper: MapFunction) => {
  return walk(tree, 0, null)[0];

  // Recursivly walk tree
  function walk(node: Parent | Node, index: number, parent: Parent | null) {
    if (hasChildren(node)) {
      let out = [];

      for (let i = 0, n = node.children.length; i < n; i++) {
        const subtree = walk(node.children[i], i, node);
        if (subtree) {
          for (let j = 0, m = subtree.length; j < m; j++) {
            out.push(subtree[j]);
          }
        }
      }

      node.children = out;
    }

    return mapper(node, index, parent);
  }
};
