import React from 'react';
import type {
  NavigationMenu,
  NavigationMenuCategory,
  NavigationMenuGroup,
} from '../../navigation.utils';

import { Box } from '@marigold/components';
import { Link, LinkProps } from '../Link';
import { CSSObject, useComponentStyles } from '@marigold/system';
import { NAVIGATION_CONFIG } from 'docs-next/src/config';

export interface NavigationProps {
  navigation: NavigationMenu;
  css?: CSSObject;
}

interface NavigationItemProps extends LinkProps, NavigationStyles {
  title: string;
}

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
  <Box as="li" __baseCSS={{ listStyle: 'none' }}>
    <Box as="ul" role="menubar" css={css?.list}>
      <Box as="li" __baseCSS={{ listStyle: 'none' }}>
        <Box as="h2" css={css?.category}>
          external links
        </Box>
        <Box as="ul" css={css?.list}>
          {NAVIGATION_CONFIG.links.map(({ title, url }) => (
            <NavigationItem
              key={url}
              css={css}
              title={title}
              href={url}
              target="_blank"
            ></NavigationItem>
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
);

const NavigationItem = ({
  title,
  css,
  variant,
  ...props
}: NavigationItemProps) => (
  <Box as="li" __baseCSS={{ listStyle: 'none' }} css={css?.item}>
    <Link variant="navigation" {...props}>
      {title}
    </Link>
  </Box>
);

const NavigationGroup = ({ name, items, css }: NavigationMenuGroupProps) => (
  <Box as="li" __baseCSS={{ listStyle: 'none' }}>
    <Box as="ul" css={css?.list}>
      <Box as="h4" css={css?.group}>
        {name}
      </Box>
      {items.map(item => (
        <NavigationItem
          key={item.slug}
          css={css}
          title={item.title}
          href={`/${item.slug}`}
        />
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
    <Box as="li" __baseCSS={{ listStyle: 'none' }}>
      <Box as="ul" role="menubar" css={css?.list}>
        <Box as="li" __baseCSS={{ listStyle: 'none' }}>
          <Box as="h2" css={css?.category}>
            {name}
          </Box>
          <Box as="ul" css={css?.list}>
            {groups.map(group => (
              <NavigationGroup css={css} key={group.name} {...group} />
            ))}
            {items.map(i => (
              <NavigationItem
                css={css}
                key={i.slug}
                title={i.title}
                href={`/${i.slug}`}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
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
      <Box as="ul">
        {navigation.map(item =>
          'title' in item ? (
            <NavigationItem
              key={item.slug}
              css={styles}
              title={item.title}
              href={`/${item.slug}`}
            />
          ) : (
            <NavigationCategory key={item.name} css={styles} {...item} />
          )
        )}
        <NavigationLinks css={styles} />
      </Box>
    </Box>
  );
};
