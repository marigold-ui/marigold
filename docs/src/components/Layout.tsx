import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Column, Columns, Stack } from '@marigold/components';

import { Link } from './Link';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ThemeSelect } from './ThemeSelect';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Marigold Design System</title>
      </Helmet>
      <Columns space={8}>
        <Column width={[12, 2]}>
          <Stack space="small">
            <Box p="24px" pr="36px">
              <Link to="/">
                <Logo />
              </Link>
            </Box>
            <ThemeSelect />
            <Navigation />
          </Stack>
        </Column>
        <Column width={[12, 10]}>{children}</Column>
      </Columns>
    </>
  );
};
