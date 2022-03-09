import React from 'react';
import { Box, Column, Columns, Stack } from '@marigold/components';

import { Link } from './Link';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ThemeSelect } from './ThemeSelect';
import { Version } from './Version';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Columns space="xsmall">
        <Column width={[12, 2]}>
          <Stack space="small">
            <Box p="medium">
              <Link to="/">
                <Logo size="small" />
              </Link>
            </Box>
            <ThemeSelect />
            <Navigation />
          </Stack>
        </Column>
        <Column width={[12, 10]}>{children}</Column>
      </Columns>
      <Version />
    </>
  );
};
