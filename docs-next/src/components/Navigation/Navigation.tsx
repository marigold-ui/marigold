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
  <Box as="li">
    <Link href={slug}>{title}</Link>
  </Box>
);

const NavigationCategory = ({
  name,
  items,
  groups,
}: NavigationCategoryProps) => {
  return (
    <Box as="ul" role="menubar">
      <Box as="h2">{name}</Box>
      <Box as="ul">
        {console.log(groups)}
        {Boolean(groups.length !== 0) ? (
          groups.map(i =>
            'items' in i ? (
              <Box as="ul">
                {i.name}
                {i['items'].map(i => (
                  <NavigationItem key={i.slug} {...i} />
                ))}
              </Box>
            ) : (
              <Box as="ul">
                <NavigationItem title={'hallo'} slug={''} />
              </Box>
            )
          )
        ) : (
          <Box as="ul">
            {items.map(i => (
              <NavigationItem {...i} />
            ))}
          </Box>
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
};
