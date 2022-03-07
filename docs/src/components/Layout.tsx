import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Column, Columns, Stack, Text } from '@marigold/components';

import { Link } from './Link';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ThemeSelect } from './ThemeSelect';
import { Version } from './Version';

export const Layout: React.FC = ({ children }) => {
  const devMode = process.env.NODE_ENV === 'development';
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
      {devMode && (
        <Box
          bg="#f3f3f3"
          css={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          <Text color="#1d67b6">localhost</Text>
        </Box>
      )}
      <Columns space="xsmall">
        <Column width={[12, 2]}>
          <Stack space="small">
            <Box p="medium">
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
      <Version />
    </>
  );
};
