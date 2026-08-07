import { SiteFooter } from '@/app/_components/SiteFooter';
import { baseOptions } from '@/lib/layout.shared';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => (
  <HomeLayout {...baseOptions()}>
    <div className="mx-auto w-full max-w-3xl px-(--page-padding-md) pt-24 pb-0 xl:px-(--page-padding-xl)">
      {/* fumadocs' own `.prose` — already theme-aware and `max-width: none`.
          No typography plugin here, so its variants would be no-ops. */}
      <div className="prose">{children}</div>
      <SiteFooter />
    </div>
  </HomeLayout>
);

export default Layout;
