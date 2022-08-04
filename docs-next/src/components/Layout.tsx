import React, { ReactElement } from 'react';
import { Box } from '@marigold/components';

import { NavigationLayout } from './Navigation';
import { NavigationMenu } from '../navigation.utils';
import { Version } from './Version';

export interface LayoutProps {
  children: ReactElement;
  navigation: NavigationMenu;
}

export const Layout = ({ navigation, children }: LayoutProps) => {
  return (
    <>
      <Box
        css={{
          display: 'flex',
          flexDirection: ['column', 'row'],
          gap: 'medium-2',
          p: ['small-1', 'none'],
        }}
      >
        <NavigationLayout navigation={navigation}></NavigationLayout>
        <Box>{children}</Box>
      </Box>
      <Version />
    </>
  );
};
