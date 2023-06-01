import React, { ReactNode } from 'react';
import { Box } from '@marigold/components';

import {
  NavigationLayout,
  NavigationLinks,
  NavigationTree,
  Version,
} from '~/components';
import { useRouter } from 'next/router';

export interface LayoutProps {
  children: ReactNode;
  navigation: { tree: NavigationTree; links: NavigationLinks };
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
        <NavigationLayout {...navigation} key={asPath} />
        <Box as="main" css={{ width: ['100%', '70vw'] }}>
          {children}
        </Box>
      </Box>
      <Version />
    </>
  );
};
