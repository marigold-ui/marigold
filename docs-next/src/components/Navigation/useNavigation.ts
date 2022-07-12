import { CONTENT_PATH } from 'docs-next/src/config';
import { globby } from 'globby';
import path from 'path';

// Types
// ---------------
interface NavigationNode {
  slug: string;
  frontmatter: {
    title?: string;
  };
  headings: { value: string }[];
}

interface NavigationData {
  path: string[];
}

export interface NavigationItem {
  title: string;
  slug: string;
}
export interface NavigationEdge {
  name: string;
  children: NavigationTree;
}
export type NavigationTree = (NavigationEdge | NavigationItem)[];

// Helper
// ---------------

// Stolen from: https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
const camelToKebabCase = (val: string) =>
  val.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

const createNavigation = (
  tree: NavigationTree,
  data: NavigationData
): NavigationTree => {
  const [name, ...rest] = data.path;

  // Can't go down further, create an item (a.k.a leave)
  if (!rest.length) {
    tree.push({
      title: data.frontmatter.title || data.headings[0].value,
      slug: camelToKebabCase(data.slug[0]),
    });
    return tree;
  }

  // Does the edge already exist?
  let edge = tree.find(l => 'name' in l && l.name === name) as
    | NavigationEdge
    | undefined;
  // If not create an empty edge and add it to the tree
  if (!edge) {
    edge = {
      name,
      children: [],
    };
    tree.push(edge);
  }

  // Create subtree with rest of the path
  return createNavigation(edge.children, {
    ...data,
    path: rest,
  });
};

const sortNavigation = (tree: NavigationTree, order: string[]) =>
  tree.sort((a, b) => {
    // Get value to compare to
    const left = 'slug' in a ? a.slug : a.name;
    const leftIndex = order.indexOf(left);

    const right = 'slug' in b ? b.slug : b.name;
    const rightIndex = order.indexOf(right);
    /**
     * Fallback: If none is present in the order array
     * -> sort alphabetically (localized to ignore case and such)
     */
    if (leftIndex === -1 && rightIndex === -1) {
      return left.localeCompare(right);
    }

    // Use array index to sort.
    return leftIndex - rightIndex;
  });

// Hook
// ---------------
export const useNavigation = async () => {
  // Get all MDX pages
  const contentFilePaths = await globby([CONTENT_PATH]);
  const paths = contentFilePaths
    .filter(p => /\.mdx?$/.test(p))
    .map(p => p.replace(/\.mdx?$/, ''))
    .map(p => path.relative(CONTENT_PATH, p))
    .map(slug => ({ params: { slug: slug.split('/') } }));
  paths.forEach(p =>
    p.params.slug.length > 1
      ? paths.push({ params: { slug: [p.params.slug[0]] } })
      : paths.push({ params: { slug: [] } })
  );

  return {
    paths,
    fallback: false,
  };
};
