import React, { ReactElement } from 'react';
import { Box, Aside, Center } from '@marigold/components';

import { Navigation } from './Navigation';
import { NavigationMenu } from '../navigation.utils';
import { Logo } from './Logo';
import { Link } from './Link';

export interface LayoutProps {
  children: ReactElement;
  navigation: NavigationMenu;
}

export const Layout = ({ navigation, children }: LayoutProps) => (
  <Aside space="medium-1">
    <Box p="medium">
      <Link href="/index">
        <Center>
          <Logo size="small" />
        </Center>
      </Link>
      <Navigation navigation={navigation} />
    </Box>
    <Box>{children}</Box>
  </Aside>
);
