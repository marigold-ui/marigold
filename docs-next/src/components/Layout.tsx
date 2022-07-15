import React, { ReactNode } from 'react';
import { Box, Columns, Stack } from '@marigold/components';

import { Link } from './Link';
import { Logo } from './Logo';
import { NavigationMenu } from './Navigation';
import { ThemeSelect } from './ThemeSelect';
import { Version } from './Version';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Columns columns={[2, 10]} space="medium" collapseAt="60em">
        <Stack space="small">
          <Box p="medium">
            <Link to="/">
              <Logo size="small" />
            </Link>
          </Box>
          <ThemeSelect />
          <Navigation />
        </Stack>
        <Box>{children}</Box>
      </Columns>
      <Version />
    </>
  );
};
