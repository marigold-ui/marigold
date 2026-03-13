import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => (
  <div className="-m-(--page-padding) md:-m-(--page-padding-md) xl:-m-(--page-padding-xl)">
    {children}
  </div>
);

export default Layout;
