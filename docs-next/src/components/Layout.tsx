import React, { ReactNode } from 'react';
import { Box } from '@marigold/components';

import { NavigationLayout, NavigationTree, Version } from '~/components';

export interface LayoutProps {
  children: ReactNode;
  navigation: NavigationTree;
}

export const Layout = ({ navigation, children }: LayoutProps) => {
  return (
    <>
      <Box
        css={{
          display: 'flex',
          flexDirection: ['column', 'row'],
          gap: ['medium-1', 'large-1', 'large-2'],
          p: ['small-1', 'none'],
        }}
      >
        <NavigationLayout navigation={navigation}></NavigationLayout>
        <main>{children}</main>
      </Box>
      <Version />
    </>
  );
};
