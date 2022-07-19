import React from 'react';
import type {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuCategory,
  NavigationMenuGroup,
} from '../../navigation.utils';

import { Box, Link } from '@marigold/components';
import { useComponentStyles } from '@marigold/system';
import { NAVIGATION_CONFIG } from 'docs-next/src/config';

interface NavigationItemProps extends NavigationMenuItem {}

interface NavigationCategoryProps extends NavigationMenuCategory {}

const NavigationLinks = () => (
  <Box as="ul">
    <Box as="h2">Useful Links</Box>
    <Box as="ul">
      {NAVIGATION_CONFIG.links.map(link => (
        <NavigationItem key={link.slug} {...link}></NavigationItem>
      ))}
    </Box>
  </Box>
);

const NavigationItem = ({ slug, title }: NavigationItemProps) => (
  <Box as="li">
    {slug.startsWith('https') ? (
      <Link href={slug}>{title}</Link>
    ) : (
      <Link href={`/${slug}`}>{title}</Link>
    )}
  </Box>
);

const NavigationGroup = ({ name, items }: NavigationMenuGroup) => (
  <Box as="li">
    <Box as="ul">
      {name}
      {items.map(i => (
        <NavigationItem key={i.slug} {...i} />
      ))}
    </Box>
  </Box>
);

const NavigationCategory = ({
  name,
  items,
  groups,
}: NavigationCategoryProps) => {
  return (
    <li>
      <Box as="ul" role="menubar">
        <li>
          <Box as="h2">{name}</Box>
          <Box as="ul">
            {groups.map(group => (
              <NavigationGroup {...group} />
            ))}
            {items.map(i => (
              <NavigationItem key={i.slug} {...i} />
            ))}
          </Box>
        </li>
      </Box>
    </li>
  );
};

export interface NavigationProps {
  navigation: NavigationMenu;
}

export const Navigation = ({ navigation }: NavigationProps) => {
  const styles = useComponentStyles('Navigation', {}, { parts: ['container'] });

  return (
    <Box
      role="navigation"
      css={styles.container}
      aria-labelledby="marigold-navigation"
    >
      <ul>
        {navigation.map(item =>
          'title' in item ? (
            <NavigationItem key={item.slug} {...item} />
          ) : (
            <NavigationCategory key={item.name} {...item} />
          )
        )}
        <NavigationLinks></NavigationLinks>
      </ul>
    </Box>
  );
};
