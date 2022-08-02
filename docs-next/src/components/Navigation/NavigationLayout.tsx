import React from 'react';
import { Box, Center, Button, Columns } from '@marigold/components';

import { Navigation } from './Navigation';
import { NavigationMenu } from '../../navigation.utils';
import { Logo } from '../Logo';
import { Link } from '../Link';
import { useResponsiveValue } from '@marigold/system';

const useIsSmallScreen = () => useResponsiveValue([true, false, false], 0);

export interface LayoutProps {
  navigation: NavigationMenu;
}

export const NavigationLayout = ({ navigation }: LayoutProps) => {
  const isSmallScreen = useIsSmallScreen();
  const [showNavigation, setShowNavigation] = React.useState(false);
  const show = isSmallScreen ? showNavigation : true;

  return (
    <Box>
      {isSmallScreen && (
        <Columns space="small-1" columns={[2, 8, 2]} collapseAt="0px">
          <Box>
            <Button
              variant="navigationSmall"
              onPress={() => setShowNavigation(!showNavigation)}
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
            <Link href="/index">
              <Center>
                <Logo size="small" />
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
                width: ['100vw', '100%'],
                zIndex: 1,
              }
            : {}
        }
      >
        {!isSmallScreen && (
          <Link href="/index">
            <Center>
              <Logo size="small" />
            </Center>
          </Link>
        )}
        {show && <Navigation navigation={navigation} />}
      </Box>
    </Box>
  );
};
