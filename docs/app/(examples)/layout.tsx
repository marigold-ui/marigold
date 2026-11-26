import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';
import { Wrapper } from './wrapper';

// Render every example per request. The examples show dates relative to today
// (`_shared/demo-data.ts`), and a page prerendered at build time would carry
// the build day into the HTML and disagree with the browser after hydration.
export const dynamic = 'force-dynamic';

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
