import React, { ReactNode } from 'react';
import { Box } from '@marigold/components';

import { NavigationLayout, NavigationTree, Version } from '~/components';
import { useRouter } from 'next/router';

export interface LayoutProps {
  children: ReactNode;
  navigation: NavigationTree;
}

export const Layout = ({ navigation, children }: LayoutProps) => {
  const { asPath } = useRouter();
  return (
    <>
      <Box
        css={{
          display: 'flex',
          flexDirection: ['column', 'row'],
          gap: ['medium-1', 'large-1', 'large-2'],
          p: ['medium-1', 'none'],
        }}
      >
        <NavigationLayout navigation={navigation} key={asPath} />
        <Box as="main" css={{ width: ['100%', '70vw'] }}>
          {children}
        </Box>
      </Box>
      <Version />
    </>
  );
};
