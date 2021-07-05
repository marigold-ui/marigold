import React from 'react';
import { Box } from '@marigold/components';

import { Link } from '../Link';
import { NavigationItem, NavigationTree, useNavigation } from './useNavigation';

type NavigationSectionProps = {
  name: string;
  children: NavigationTree;
};

// Helper
// ---------------
const dirToText = (dir: string) =>
  dir
    .split('/')[0]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Components
// ---------------
const NavigationItemComponent = ({ title, slug }: NavigationItem) => (
  <Box variant="navigation.item">
    <Link to={slug.startsWith('/') ? slug : `/${slug}`}>{title}</Link>
  </Box>
);

const NavigationSection = ({ name, children }: NavigationSectionProps) => {
  return (
    <div>
      {Boolean(name.length) && (
        <Box as="h2" variant="navigation.header">
          {dirToText(name)}
        </Box>
      )}
      <Box as="ul" variant="navigation.list">
        {children.map(child =>
          'title' in child ? (
            <NavigationItemComponent key={child.slug} {...child} />
          ) : (
            <NavigationSection key={child.name} {...child} />
          )
        )}
      </Box>
    </div>
  );
};

export const Navigation: React.FC = () => {
  const tree = useNavigation();
  // console.log(tree);

  return (
    <Box
      as="nav"
      variant="navigation.wrapper"
      aria-labelledby="primary-navigation"
    >
      <NavigationSection name="" children={tree} />
    </Box>
  );
};
