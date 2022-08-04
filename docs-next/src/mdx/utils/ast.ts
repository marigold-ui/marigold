import type {
  Identifier,
  ExportNamedDeclaration,
  Program,
  VariableDeclaration,
} from 'estree';
import { visit } from 'estree-util-visit';
import type { Node, Parent } from 'unist';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { mdxjs } from 'micromark-extension-mdxjs';
import { JsxEmit, ModuleKind, ScriptTarget, transpileModule } from 'typescript';

// mdast
// ---------------

/**
 * Create the `mdast` from the code using the mdx extensions.
 */
export const parseToMdAst = (md: string) => {
  return fromMarkdown(md, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  }).children;
};

/**
 * Try to find the preview to render based on an exported component.
 * Note that any component has to exist in the MDX scope to make this work,
 * it has to be added to the `<MDXProvider>`.
 */
export const getExportedComponent = (input: string, lang: string) => {
  let component: string | undefined;

  // compile to js if necessary
  const code = /tsx?/.test(lang)
    ? transpileModule(input, {
        compilerOptions: {
          module: ModuleKind.ESNext,
          jsx: JsxEmit.Preserve,
          target: ScriptTarget.ESNext,
        },
      }).outputText
    : input;

  const tree = parseToMdAst(code)[0].data?.estree as Program;

  visit(tree, node => {
    if (component) {
      return;
    }
    if (node.type === 'ExportNamedDeclaration') {
      const declaration = (node as ExportNamedDeclaration)
        .declaration as VariableDeclaration;
      const variable = declaration.declarations.find(
        child => child.type === 'VariableDeclarator'
      );
      component = (variable?.id as Identifier)?.name;
    }
  });

  if (!component) {
    throw Error(
      'No component for demo found. Please make sure to export a component from your demo file.'
    );
  }

  return [
    {
      type: 'mdxJsxFlowElement',
      name: component,
      attributes: [],
      children: [],
    },
  ];
};

// unist
// ---------------
export type MapFunction = (
  node: Node,
  index: number,
  parent: Parent | null
) => Node[];

const hasChildren = (node: Node | Parent): node is Parent => 'children' in node;

/**
 * Create a new Unist tree by mapping (to an array) with the provided function and then flattening.
 * Adopted from: https://www.npmjs.com/package/unist-util-flatmap
 */
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
