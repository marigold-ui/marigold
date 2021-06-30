import React from 'react';
import { Box, Stack } from '@marigold/components';

import { Link } from '../Link';
import { NavigationItem, NavigationTree, useNavigation } from './useNavigation';

type NavigationSectionProps = {
  name: string;
  children: NavigationTree;
};

const NavigationItemComponent = ({ title, slug }: NavigationItem) => (
  <Box variant="navigation.item">
    <Link to={slug}>{title}</Link>
  </Box>
);

const NavigationSection = ({ name, children }: NavigationSectionProps) => {
  return (
    <Stack space="small">
      {Boolean(name.length) && (
        <Stack>
          <Box as="h5" variant="navigation.header">
            {name}
          </Box>
        </Stack>
      )}
      <Stack>
        <Box as="ul" variant="navigation.list">
          {children.map(child =>
            'title' in child ? (
              <NavigationItemComponent key={child.slug} {...child} />
            ) : (
              <NavigationSection key={child.name} {...child} />
            )
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export const Navigation: React.FC = () => {
  const tree = useNavigation();

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
