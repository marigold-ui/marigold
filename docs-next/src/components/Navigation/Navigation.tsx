import React from 'react';
import Link from 'next/link';
import { Box, CSSObject, useComponentStyles } from '@marigold/system';
import { NavigationItem, NavigationTree, useNavigation } from './useNavigation';

// Props
// ---------------
interface NavigationItemProps extends NavigationItem {
  css: CSSObject;
}

interface NavigationSectionProps {
  children: NavigationTree;
  name: string;
  css: {
    header: CSSObject;
    list: CSSObject;
    item: CSSObject;
  };
}

// Components
// ---------------
const NavigationItemComponent = ({ title, slug, css }: NavigationItemProps) => (
  <Box css={css}>
    <Link
      href={slug.startsWith('/') || slug.startsWith('http') ? slug : `/${slug}`}
    >
      {title}
    </Link>
  </Box>
);

const NavigationSection = ({ name, children, css }: NavigationSectionProps) => {
  console.log('NavigationSection', name, children);
  return (
    <div>
      {Boolean(name.length) && <Box as="h2" css={css.header}></Box>}
      <Box as="ul" css={css.list}>
        {children.map(child =>
          'title' in child ? (
            <NavigationItemComponent
              css={css.item}
              key={child.slug}
              {...child}
            />
          ) : (
            <NavigationSection css={css} key={child.name} {...child} />
          )
        )}
      </Box>
    </div>
  );
};

const Navigation = () => {
  const tree = useNavigation();
  const styles = useComponentStyles(
    'Navigation',
    {},
    { parts: ['container', 'header', 'list', 'item'] }
  );
  return (
    <Box as="nav" css={styles.container} aria-labelledby="primary-navigation">
      <NavigationSection
        css={styles}
        name="Useful Links"
        children={[
          {
            title: 'Github',
            slug: 'https://github.com/marigold-ui/marigold/',
          },
          {
            title: 'Issues',
            slug: 'https://github.com/marigold-ui/marigold/issues',
          },
          {
            title: 'Changelog',
            slug: 'https://github.com/marigold-ui/marigold/blob/main/packages/components/CHANGELOG.md',
          },
          {
            title: 'Slack Channel',
            slug: 'https://reservix.slack.com/archives/C02727BNZ3J',
          },
        ]}
      />
    </Box>
  );
};

export default Navigation;
