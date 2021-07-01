import React from 'react';
import { Helmet } from 'react-helmet';
import { Column, Columns } from '@marigold/components';

import { Link } from './Link';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

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
      <Columns space={16}>
        <Column width={3}>
          <>
            <Link to="/">
              <Logo />
            </Link>
            <Navigation />
          </>
        </Column>
        <Column width={9}>{children}</Column>
      </Columns>
    </>
  );
};
