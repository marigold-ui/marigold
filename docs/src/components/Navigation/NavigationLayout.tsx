import React from 'react';
import { Box, Center, Button, Columns } from '@marigold/components';
import { useResponsiveValue } from '@marigold/system';

import { Link, Logo, NavigationTree } from '~/components';

import { Navigation, NavigationLinks } from './Navigation';
const useIsSmallScreen = () => useResponsiveValue([true, false, false], 2);

export interface NavigationLayoutProps {
  tree: NavigationTree;
  links: NavigationLinks;
}

export const NavigationLayout = ({ tree, links }: NavigationLayoutProps) => {
  const isSmallScreen = useIsSmallScreen();
  const [showNavigation, setShowNavigation] = React.useState(false);
  const show = isSmallScreen ? showNavigation : true;

  return (
    <Box css={{ py: ['none', 'medium-1'] }}>
      {isSmallScreen && (
        <Columns space="small-1" columns={[2, 8, 2]} collapseAt="0px">
          <Box css={{ m: 'auto' }}>
            <Button
              variant="navigationSmall"
              onPress={() => setShowNavigation(!showNavigation)}
              aria-label="Open the navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth={2}
                height={24}
                width={24}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </Box>
          <Box />
          <Box>
            <Link href="/">
              <Center>
                <Logo />
              </Center>
            </Link>
          </Box>
        </Columns>
      )}
      <Box
        css={
          show
            ? {
                position: ['absolute', 'static'],
                bg: 'background.page',
                width: ['100%', 'auto'],
                ml: '-1rem',
                whiteSpace: 'nowrap',
                zIndex: 1,
              }
            : {}
        }
      >
        {!isSmallScreen && (
          <Link href="/">
            <Center>
              <Logo />
            </Center>
          </Link>
        )}
        {show && <Navigation tree={tree} links={links} />}
      </Box>
    </Box>
  );
};
