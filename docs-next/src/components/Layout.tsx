import React, { ReactNode } from 'react';
import { Box } from '@marigold/components';

import { NavigationMenu } from '~/navigation.utils';
import { NavigationLayout, Version } from '~/components';

export interface LayoutProps {
  children: ReactNode;
  navigation: NavigationMenu;
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

        <div>{children}</div>
      </Box>
      <Version />
    </>
  );
};
