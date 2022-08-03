export function flatMap(ast, fn) {
  return transform(ast, 0, null)[0];

  function transform(node, index, parent) {
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
}
