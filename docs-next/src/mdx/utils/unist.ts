import type { Node, Parent } from 'unist';

export type MapFunction = (
  node: Node,
  index: number,
  parent: Parent | null
) => Node[];

export const flatMap = <Tree extends Node = Node>(
  tree: Tree,
  fn: MapFunction
) => {
  return transform(tree, 0, null)[0];

  function transform(node: Node, index: number, parent: Parent | null) {
    if (node.children) {
      var out = [];
      for (var i = 0, n = node.children.length; i < n; i++) {
        var xs = transform(node.children[i], i, node);
        if (xs) {
          for (var j = 0, m = xs.length; j < m; j++) {
            out.push(xs[j]);
          }
        }
      }
      node.children = out;
    }

    return fn(node, index, parent);
  }
};
