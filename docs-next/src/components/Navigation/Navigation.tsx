import React from 'react';
import { Box, Link } from '@marigold/components';
import { navigationLinks, siteMetaData } from '../../config';
import { CSSObject, useComponentStyles } from '@marigold/system';
import { getNavigation } from 'docs-next/src/navigation.utils';

type Navigation = (NavigationCategory | NavigationCategoryWithGroup)[];

interface NavigationCategory {
  name: string;
  items: NavigationItem[];
}

interface NavigationCategoryWithGroup {
  name: string;
  groups: {
    name: string;
    items: NavigationItem[];
  }[];
}
interface NavigationItem {
  slug: string;
  title: string;
}

interface NavigationProps {
  children?: Navigation;
  css: {
    list: CSSObject;
    item: CSSObject;
  };
}

//TODO: lists category and get groups?
const NavigationCategory = (nav: Navigation) => {
  return (
    <div>
      <Box as="ul" />
    </div>
  );
};

// TODO: lists only items
const NavigationList = ({ css }: NavigationProps) => {
  //TODO: check if its a mdx page
  return (
    <Box as="ul" css={css.list}>
      {navigationLinks.map(child =>
        'title' in child ? <Box as="li" children={child.title} /> : <Box />
      )}
    </Box>
  );
};

// navigation component
export const Navigation = () => {
  const styles = useComponentStyles(
    'Navigation',
    {},
    { parts: ['container', 'header', 'list', 'item'] }
  );

  return (
    <Box as="nav" css={styles.container} aria-labelledby="primary-navigation">
      <NavigationCategory></NavigationCategory>
      <NavigationList css={styles}></NavigationList>
    </Box>
  );
};
