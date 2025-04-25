import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';
import { Wrapper } from './wrapper';

// Layout
// ---------------
const Layout = ({ children }: PropsWithChildren) => (
  <NuqsAdapter>
    <Wrapper className="min-h-dvh" theme="rui">
      {children}
    </Wrapper>
  </NuqsAdapter>
);

export default Layout;
