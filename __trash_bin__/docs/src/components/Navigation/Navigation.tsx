import { Badge } from '@marigold/components';
import { Box, CSSObject, useComponentStyles } from '@marigold/system';
import { Link, LinkProps } from '~/components/Link';

// Props
// ---------------
export type NavigationTree = (NavigationMenuCategory | NavigationMenuItem)[];

export type NavigationLinks = { title: string; url: string }[];

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
  badge?: string;
}

export interface NavigationProps {
  tree: NavigationTree;
  links: NavigationLinks;
  css?: CSSObject;
}

interface NavigationItemProps extends LinkProps, NavigationStyles {
  title: string;
  badge?: string;
}

interface NavigationMenuGroupProps
  extends NavigationMenuGroup,
    NavigationStyles {}
interface NavigationCategoryProps
  extends NavigationMenuCategory,
    NavigationStyles {}

interface NavigationLinksProps extends NavigationStyles {
  links: NavigationLinks;
}

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
const NavigationLinks = ({ css, links }: NavigationLinksProps) => {
  return (
    <Box as="li" role="menuitem" __baseCSS={{ listStyle: 'none' }}>
      <Box as="ul" role="menubar" css={css?.list}>
        <Box as="li" role="menuitem" __baseCSS={{ listStyle: 'none' }}>
          <Box as="h2" css={css?.category}>
            external links
          </Box>
          <Box as="ul" role="menubar" css={css?.list}>
            {links.map(({ title, url }) => (
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
};

const NavigationItem = ({
  title,
  css,
  variant,
  badge,
  ...props
}: NavigationItemProps) => (
  <Box
    as="li"
    role="menuitem"
    css={[
      css?.item,
      {
        display: 'flex',
        alignItems: 'center',
        gap: 'small-1',
      },
    ]}
  >
    <Link variant="navigation" {...props}>
      {title}
    </Link>
    {badge && <Badge variant={badge.toLowerCase()}>{badge}</Badge>}
  </Box>
);

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
          badge={item.badge}
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
                badge={i.badge}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const Navigation = ({ tree, links }: NavigationProps) => {
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
        {tree.map(item =>
          'name' in item ? (
            <NavigationCategory key={item.name} css={styles} {...item} />
          ) : null
        )}
        <NavigationLinks links={links} css={styles} />
      </Box>
    </Box>
  );
};
