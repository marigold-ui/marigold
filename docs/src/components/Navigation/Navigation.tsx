import React from 'react';
import { Box } from '@marigold/components';

import { Link } from '../Link';
import { NavigationItem, NavigationTree, useNavigation } from './useNavigation';

interface NavigationSectionProps {
  name: string;
  children: NavigationTree;
}

// Helper
// ---------------
const dirToText = (dir: string) =>
  dir
    .split('/')[0]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Components
// ---------------
const NavigationItemComponent = ({ title, slug }: NavigationItem) => (
  <Box variant="navigation.item">
    <Link
      to={slug.startsWith('/') || slug.startsWith('http') ? slug : `/${slug}`}
    >
      {title}
    </Link>
  </Box>
);

const NavigationSection = ({ name, children }: NavigationSectionProps) => {
  return (
    <div>
      {Boolean(name.length) && (
        <Box as="h2" variant="navigation.header">
          {dirToText(name)}
        </Box>
      )}
      <Box as="ul" variant="navigation.list">
        {children.map(child =>
          'title' in child ? (
            <NavigationItemComponent key={child.slug} {...child} />
          ) : (
            <>
              <NavigationSection key={child.name} {...child} />
              <NavigationSection
                key={children.{title}}
                name="Useful Links"
                children={[
                  {
                    title: 'Github Repo',
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
            </>
          )
        )}
      </Box>
    </div>
  );
};

export const Navigation: React.FC = () => {
  const tree = useNavigation();

  return (
    <Box
      as="nav"
      variant="navigation.wrapper"
      aria-labelledby="primary-navigation"
    >
      <NavigationSection name="" children={tree} />
    </Box>
  );
};
