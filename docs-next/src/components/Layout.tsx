import React, { ReactNode } from 'react';
import { Box, Columns, Stack, Aside } from '@marigold/components';

import { ThemeSelect } from './ThemeSelect';
import { Version } from './Version';
import { Navigation } from './Navigation';

export interface LayoutProps {
  children: ReactNode;
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
