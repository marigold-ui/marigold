import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Link from 'gatsby-link';
import { Text } from '@marigold/components';

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

const useNavigation = () => {
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

export const Navigation: React.FC = () => {
  const data = useNavigation();
  console.log(data);

  return (
    <Text>
      <Link to="/start">Marigold</Link>
      <ul>
        <li>
          <b>Guides</b>
          <ul>
            <li>Installation</li>
            <li>Theme & Variants</li>
          </ul>
        </li>
        <li>
          <b>Foundation</b>
          <ul>
            <li>
              <Link to="/foundation/design-language/theming">Theming</Link>
            </li>
            <li>Layout</li>
            <li>Box Primitive</li>
            <li>
              <Link to="/foundation/design-tokens/icons">Iconography</Link>
            </li>
          </ul>
        </li>
        <li>
          <b>Components</b>
          <ul>
            <li>
              <Link to="/components/alert">Alert</Link>
            </li>
            <li>
              <Link to="/components/badge">Badge</Link>
            </li>
            <li>
              <Link to="/components/box">Box</Link>
            </li>
            <li>
              <Link to="/components/button">Button</Link>
            </li>
            <li>
              <Link to="/components/column">Column</Link>
            </li>
            <li>
              <Link to="/components/columns">Columns</Link>
            </li>
            <li>
              <Link to="/components/checkbox">Checkbox</Link>
            </li>
            <li>
              <Link to="/components/container">Container</Link>
            </li>
            <li>
              <Link to="/components/dialog">Dialog</Link>
            </li>
            <li>
              <Link to="/components/divider">Divider</Link>
            </li>
            <li>
              <Link to="/components/field">Field</Link>
            </li>
            <li>
              <Link to="/components/heading">Heading</Link>
            </li>
            <li>
              <Link to="/components/hidden">Hidden</Link>
            </li>
            <li>
              <Link to="/components/input">Input</Link>
            </li>
            <li>
              <Link to="/components/label">Label</Link>
            </li>
            <li>
              <Link to="/components/link">Link</Link>
            </li>
            <li>
              <Link to="/components/menu">Menu</Link>
            </li>
            <li>
              <Link to="/components/menu-item">MenuItem</Link>
            </li>
            <li>
              <Link to="/components/message">Message</Link>
            </li>
            <li>
              <Link to="/components/radio">Radio</Link>
            </li>
            <li>
              <Link to="/components/select">Select</Link>
            </li>
            <li>
              <Link to="/components/slider">Slider</Link>
            </li>
            <li>
              <Link to="/components/stack">Stack</Link>
            </li>
            <li>
              <Link to="/components/text">Text</Link>
            </li>
            <li>
              <Link to="/components/textarea">Textarea</Link>
            </li>
            <li>
              <Link to="/components/validation-message">ValidationMessage</Link>
            </li>
          </ul>
        </li>
        <li>
          <b>Themes</b>
          <ul>
            <li>
              <Link to="/themes/b2b">B2B</Link>
            </li>
            <li>
              <Link to="/themes/unicorn">Unicorn</Link>
            </li>
            <li>Marigold Docs</li>
          </ul>
        </li>
      </ul>
    </Text>
  );
};
