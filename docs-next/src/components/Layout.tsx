import React, { ReactNode } from 'react';
import { Box, Aside } from '@marigold/components';

import { Navigation } from './Navigation';
import { NavigationMenu } from '../navigation.utils';

export interface LayoutProps {
  children: ReactNode;
  navigation: NavigationMenu;
}

export const Layout = ({ navigation, children }: LayoutProps) => {
  return (
    <>
      <Aside space="medium-1">
        <Navigation navigation={navigation} />
        <Box>{children}</Box>
      </Aside>
    </>
  );
};
