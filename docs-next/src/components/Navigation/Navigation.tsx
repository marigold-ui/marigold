import React from 'react';
import type {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuCategory,
  NavigationMenuGroup,
} from '../../navigation.utils';

import { Box } from '@marigold/components';
import { Link } from '../Link';
import { CSSObject, useComponentStyles } from '@marigold/system';
import { NAVIGATION_CONFIG } from 'docs-next/src/config';

export interface NavigationProps {
  navigation: NavigationMenu;
  css: CSSObject;
}

interface NavigationItemProps extends NavigationMenuItem, NavigationStyles {}

interface NavigationMenuGroupProps
  extends NavigationMenuGroup,
    NavigationStyles {}
interface NavigationCategoryProps
  extends NavigationMenuCategory,
    NavigationStyles {}

interface NavigationLinksProps extends NavigationStyles {}
interface NavigationStyles {
  css: {
    category: CSSObject;
    item: CSSObject;
    list: CSSObject;
    group: CSSObject;
  };
}
const NavigationLinks = ({ css }: NavigationLinksProps) => (
  <li>
    <Box as="ul" role="menubar" css={css.list}>
      <li>
        <Box as="h2" css={css.category}>
          Useful Links
        </Box>
        <Box as="ul" css={css.list}>
          {NAVIGATION_CONFIG.links.map(link => (
            <NavigationItem
              key={link.slug}
              css={css}
              {...link}
            ></NavigationItem>
          ))}
        </Box>
      </li>
    </Box>
  </li>
);

const NavigationItem = ({ slug, title, css }: NavigationItemProps) => (
  <Box as="li" css={css.item}>
    {slug.startsWith('https') ? (
      <Link to={slug} target="_blank">
        {title}
      </Link>
    ) : (
      <Link to={`/${slug}`}>{title}</Link>
    )}
  </Box>
);

const NavigationGroup = ({ name, items, css }: NavigationMenuGroupProps) => (
  <li>
    <Box as="ul" css={css.list}>
      <Box as="h4" css={css.group}>
        {name}
      </Box>
      {items.map(i => (
        <NavigationItem key={i.slug} css={css} {...i} />
      ))}
    </Box>
  </li>
);

const NavigationCategory = ({
  name,
  items,
  groups,
  css,
}: NavigationCategoryProps) => {
  return (
    <li>
      <Box as="ul" role="menubar" css={css.list}>
        <li>
          <Box as="h2" css={css.category}>
            {name}
          </Box>
          <Box as="ul" css={css.list}>
            {groups.map(group => (
              <NavigationGroup css={css} key={group.name} {...group} />
            ))}
            {items.map(i => (
              <NavigationItem css={css} key={i.slug} {...i} />
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
    { parts: ['container', 'category', 'item', 'list', 'group'] }
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
            <NavigationItem key={item.slug} css={styles} {...item} />
          ) : (
            <NavigationCategory key={item.name} css={styles} {...item} />
          )
        )}
        <NavigationLinks css={styles} />
      </ul>
    </Box>
  );
};
