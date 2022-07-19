import React from 'react';
import type {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuCategory,
  NavigationMenuGroup,
} from '../../navigation.utils';

import { Box, Link } from '@marigold/components';
import { CSSObject, useComponentStyles } from '@marigold/system';
import { NAVIGATION_CONFIG } from 'docs-next/src/config';

export interface NavigationProps {
  navigation: NavigationMenu;
  css: CSSObject;
}

interface NavigationItemProps extends NavigationMenuItem {
  css: CSSObject;
}

interface NavigationMenuGroupProps extends NavigationMenuGroup {
  css: {
    category: CSSObject;
    list: CSSObject;
    item: CSSObject;
  };
}
interface NavigationCategoryProps extends NavigationMenuCategory {
  css: {
    category: CSSObject;
    headline: CSSObject;
    list: CSSObject;
    item: CSSObject;
  };
}

interface NavigationLinksProps {
  css: {
    category: CSSObject;
    item: CSSObject;
    list: CSSObject;
  };
}

const NavigationLinks = ({ css }: NavigationLinksProps) => (
  <Box as="ul" css={css.category}>
    <Box as="h2">Useful Links</Box>
    <Box as="ul" css={css.list}>
      {NAVIGATION_CONFIG.links.map(link => (
        <NavigationItem
          key={link.slug}
          css={css.item}
          {...link}
        ></NavigationItem>
      ))}
    </Box>
  </Box>
);

const NavigationItem = ({ slug, title, css }: NavigationItemProps) => (
  <Box as="li" css={css}>
    {slug.startsWith('https') ? (
      <Link href={slug}>{title}</Link>
    ) : (
      <Link href={`/${slug}`}>{title}</Link>
    )}
  </Box>
);

const NavigationGroup = ({ name, items, css }: NavigationMenuGroupProps) => (
  <Box as="li">
    <Box as="ul" css={css.category}>
      {name}
      {items.map(i => (
        <NavigationItem key={i.slug} css={css.item} {...i} />
      ))}
    </Box>
  </Box>
);

const NavigationCategory = ({
  name,
  items,
  groups,
  css,
}: NavigationCategoryProps) => {
  return (
    <li>
      <Box as="ul" role="menubar" css={css.category}>
        <li>
          <Box as="h2">{name}</Box>
          <Box as="ul">
            {groups.map(group => (
              <NavigationGroup css={css} {...group} />
            ))}
            {items.map(i => (
              <NavigationItem css={css.item} key={i.slug} {...i} />
            ))}
          </Box>
        </li>
      </Box>
    </li>
  );
};

export const Navigation = ({ navigation }: NavigationProps) => {
  const styles = useComponentStyles(
    'Navigation',
    {},
    { parts: ['container', 'category', 'item'] }
  );

  return (
    <Box
      role="navigation"
      css={styles.container}
      aria-labelledby="marigold-navigation"
    >
      <ul>
        {navigation.map(item =>
          'title' in item ? (
            <NavigationItem key={item.slug} css={styles.item} {...item} />
          ) : (
            <NavigationCategory key={item.name} css={styles} {...item} />
          )
        )}
        <NavigationLinks css={styles} />
      </ul>
    </Box>
  );
};
