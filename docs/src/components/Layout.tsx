import React from 'react';
import { Box, Columns, Stack } from '@marigold/components';

import { Link } from './Link';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ThemeSelect } from './ThemeSelect';
import { Version } from './Version';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Columns columns={[2, 10]} space="xsmall" collapseAt="60em">
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
