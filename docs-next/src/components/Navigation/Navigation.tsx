import React from 'react';
import type {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuCategory,
} from '../../navigation.utils';

import { Box, Link } from '@marigold/components';

interface NavigationItemProps extends NavigationMenuItem {}

interface NavigationCategoryProps extends NavigationMenuCategory {}

const NavigationItem = ({ slug, title }: NavigationItemProps) => (
  <Box as="ul" role="menuitem">
    <Link href={slug}>{title}</Link>
  </Box>
);

const NavigationCategory = ({
  name,
  items,
  groups,
}: NavigationCategoryProps) => {
  console.log(groups);
  return (
    <Box as="ul" role="menubar">
      <Box as="h2">{name}</Box>
      <Box as="ul">
        {groups.map(item =>
          'items' in item ? (
            <Box as="ul">{item.name}</Box>
          ) : (
            <Box as="ul">
              <NavigationItem
                slug={item.items[0].slug}
                title={item.items[0].title}
              />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export interface NavigationProps {
  navigation: NavigationMenu;
}

export const Navigation = ({ navigation }: NavigationProps) => {
  // const styles = useComponentStyles(
  //   'Navigation',
  //   {},
  //   { parts: ['container', 'header', 'list', 'item'] }
  // );

  // return (
  //   <Box as="nav" css={styles.container} aria-labelledby="primary-navigation">
  //     <NavigationList css={styles}></NavigationList>
  //   </Box>
  // );
  return (
    <Box as="nav" aria-labelledby="marigold-navigation">
      {navigation.map(item =>
        'title' in item ? (
          <NavigationItem key={item.slug} {...item} />
        ) : (
          <NavigationCategory key={item.name} {...item} />
        )
      )}
    </Box>
  );

  // return <pre>{JSON.stringify(navigation, null, 2)}</pre>;
};
