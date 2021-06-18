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

type NavigationItem = { title: string; slug: string };
type NavigationEdge = {
  name: string;
  children: (NavigationEdge | NavigationItem)[];
};
type NavigationTree = (NavigationEdge | NavigationItem)[];

// Helper
// ---------------
const createNavigation = (
  tree: NavigationTree,
  data: NavigationData
): NavigationTree => {
  const [name, ...rest] = data.path;

  // Can't go down further, create an item (a.k.a leave)
  if (!rest.length) {
    tree.push({
      title: data.frontmatter.title || data.headings[0].value,
      slug: data.slug,
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

// Hook
// ---------------
export const useNavigation = () => {
  const {
    allMdx: { nodes },
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
    }
  `) as { allMdx: { nodes: NavigationNode[] } };

  // Create tree structure from nodes
  const tree: NavigationTree = [];
  nodes
    .map(n => ({ path: n.slug.split('/'), ...n }))
    .forEach(d => createNavigation(tree, d));

  return tree;
};