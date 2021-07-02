import { graphql, useStaticQuery } from 'gatsby';

// Types
// ---------------
type NavigationNode = {
  slug: string;
  frontmatter: {
    title?: string;
  };
  headings: { value: string }[];
};

type NavigationData = NavigationNode & {
  path: string[];
};

export type NavigationItem = { title: string; slug: string };
export type NavigationEdge = {
  name: string;
  children: NavigationTree;
};
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
      slug: camelToKebabCase(data.slug),
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
export const useNavigation = () => {
  // Get all MDX pages
  const {
    allMdx: { nodes },
    site,
  } = useStaticQuery(graphql`
    query NavigationQuery {
      allMdx(sort: { order: ASC, fields: slug }) {
        nodes {
          slug
          frontmatter {
            title
          }
          headings(depth: h1) {
            value
          }
        }
      }
      site {
        siteMetadata {
          navigation
        }
      }
    }
  `) as {
    allMdx: { nodes: NavigationNode[] };
    site: { siteMetadata: { navigation: string[] } };
  };

  // Create tree structure from nodes
  const tree: NavigationTree = [];
  nodes
    .map(n => ({ path: n.slug.split('/'), ...n }))
    .forEach(d => createNavigation(tree, d));

  return sortNavigation(tree, site.siteMetadata.navigation);
};
