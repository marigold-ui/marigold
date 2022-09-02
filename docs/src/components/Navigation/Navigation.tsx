import { Box, CSSObject, useComponentStyles } from '@marigold/system';
import { NAVIGATION_CONFIG } from '~/config';
import { Link, LinkProps } from '~/components/Link';
import React from 'react';
import { useRouter } from 'next/router';

// Props
// ---------------
export type NavigationTree = (NavigationMenuCategory | NavigationMenuItem)[];

export interface NavigationMenuGroup {
  name: string;
  items: NavigationMenuItem[];
}

export interface NavigationMenuCategory {
  name: string;
  items: NavigationMenuItem[];
  groups: NavigationMenuGroup[];
}
export interface NavigationMenuItem {
  title: string;
  slug: string;
  group?: string;
  order?: number;
}

export interface NavigationProps {
  navigation: NavigationTree;
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

// Components
// ---------------
const NavigationLinks = ({ css }: NavigationLinksProps) => {
  const { asPath } = useRouter();
  return (
    <Box as="li" role="menuitem" __baseCSS={{ listStyle: 'none' }}>
      <Box as="ul" role="menubar" css={css?.list}>
        <Box as="li" role="menuitem" __baseCSS={{ listStyle: 'none' }}>
          <Box as="h2" css={css?.category}>
            external links
          </Box>
          <Box as="ul" role="menubar" css={css?.list}>
            {NAVIGATION_CONFIG.links.map(({ title, url }) => (
              <NavigationItem
                key={url}
                css={css}
                title={title}
                href={url}
                ariaCurrent={url === asPath ? 'active' : undefined}
                target="_blank"
              ></NavigationItem>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const NavigationItem = ({
  title,
  css,
  variant,
  ...props
}: NavigationItemProps) => {
  return (
    <Box
      as="li"
      role="menuitem"
      __baseCSS={{ listStyle: 'none' }}
      css={css?.item}
    >
      <Link variant="navigation" {...props}>
        {title}
      </Link>
    </Box>
  );
};

const NavigationGroup = ({ name, items, css }: NavigationMenuGroupProps) => (
  <Box as="li" role="menuitem" __baseCSS={{ listStyle: 'none' }}>
    <Box as="ul" role="menubar" css={css?.list}>
      <Box as="h3" css={css?.group}>
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
    <Box as="li" role="menuitem" __baseCSS={{ listStyle: 'none' }}>
      <Box as="ul" role="menubar" css={css?.list}>
        <Box as="li" role="menuitem" __baseCSS={{ listStyle: 'none' }}>
          <Box as="h2" css={css?.category}>
            {name}
          </Box>
          <Box as="ul" role="menubar" css={css?.list}>
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
      <Box as="ul" role="menubar">
        {navigation.map(item =>
          'name' in item ? (
            <NavigationCategory key={item.name} css={styles} {...item} />
          ) : null
        )}
        <NavigationLinks css={styles} />
      </Box>
    </Box>
  );
};
