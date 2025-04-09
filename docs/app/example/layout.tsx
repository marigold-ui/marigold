import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';

// Layout
// ---------------
const Layout = ({ children }: PropsWithChildren) => (
  <NuqsAdapter>
    <div className="p-(--page-padding) md:p-(--page-padding-md) xl:p-(--page-padding-xl)">
      {children}
    </div>
  </NuqsAdapter>
);

export default Layout;
