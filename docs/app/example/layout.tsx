import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';
import { Wrapper } from './wrapper';

// Layout
// ---------------
const Layout = ({ children }: PropsWithChildren) => (
  <NuqsAdapter>
    <Wrapper>{children}</Wrapper>
  </NuqsAdapter>
);

export default Layout;
