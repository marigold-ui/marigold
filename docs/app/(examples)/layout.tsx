import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';
import '@marigold/theme-rui/page-scrollbar.css';
import { Wrapper } from './wrapper';

// Layout
// ---------------
const Layout = ({ children }: PropsWithChildren) => (
  <NuqsAdapter>
    <Wrapper className="min-h-dvh">{children}</Wrapper>
  </NuqsAdapter>
);

export default Layout;
