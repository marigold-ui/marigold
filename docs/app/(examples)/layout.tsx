import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';
import { Wrapper } from './wrapper';

// Layout
// ---------------
// No docs footer: an example is a standalone app. The legal links every
// public page needs sit in the shell's rail footer instead (`ShellLayout`).
const Layout = ({ children }: PropsWithChildren) => (
  <NuqsAdapter>
    <Wrapper className="min-h-dvh">{children}</Wrapper>
  </NuqsAdapter>
);

export default Layout;
