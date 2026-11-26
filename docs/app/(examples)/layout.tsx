import { SiteFooter } from '@/app/_components/SiteFooter';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';
import { Wrapper } from './wrapper';

// Render every example per request. The examples show dates relative to today
// (`_shared/demo-data.ts`), and a page prerendered at build time would carry
// the build day into the HTML and disagree with the browser after hydration.
export const dynamic = 'force-dynamic';

// Layout
// ---------------
// Footer on the group layout: every /examples route is public, so all of them
// need the legal links. Outside `Wrapper` to keep fumadocs chrome, not `rui`.
const Layout = ({ children }: PropsWithChildren) => (
  <NuqsAdapter>
    <Wrapper className="min-h-dvh">{children}</Wrapper>
    <div className="mx-auto w-full max-w-(--breakpoint-lg) px-(--page-padding-md) xl:px-(--page-padding-xl)">
      <SiteFooter />
    </div>
  </NuqsAdapter>
);

export default Layout;
