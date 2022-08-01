import React, { ReactElement } from 'react';
import { Box, Aside, Center, Menu, Button } from '@marigold/components';

import { Navigation } from './Navigation';
import { NavigationMenu } from '../navigation.utils';
import { Logo } from './Logo';
import { Link } from './Link';
import { Version } from './Version';
import { useMediaQuery } from 'react-responsive';
import { BurgerMenu } from '@marigold/icons';
import { useResponsiveValue } from '@marigold/system';
import { MenuTrigger } from 'packages/components/src/Menu/MenuTrigger';

export interface LayoutProps {
  children: ReactElement;
  navigation: NavigationMenu;
}

export const Layout = ({ navigation, children }: LayoutProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  //const isMobile = useResponsiveValue(['800px'], 800);
  console.log(isMobile);

  return (
    <>
      {isMobile ? (
        <Aside space="medium-1" wrap="99%">
          <Box p="small-1">
            <Button>
              <BurgerMenu />
            </Button>
            <Navigation navigation={navigation} />

            <Navigation navigation={navigation} />
          </Box>
          <Box p="medium-1">{children}</Box>
        </Aside>
      ) : (
        <Aside space="medium-1">
          <Box>
            <Link href="/index">
              <Center>
                <Logo size="small" />
              </Center>
            </Link>
            <Navigation navigation={navigation} />
          </Box>
          <Box>{children}</Box>
        </Aside>
      )}
      <Version />
    </>
  );
};
