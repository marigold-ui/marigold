import type { PropsWithChildren } from 'react';

// Layout
// ---------------
const Layout = ({ children }: PropsWithChildren) => (
  <div className="p-(--page-padding) md:p-(--page-padding-md) xl:p-(--page-padding-xl)">
    {children}
  </div>
);

export default Layout;
