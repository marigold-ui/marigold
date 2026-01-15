import type { PropsWithChildren } from 'react';
import { DefaultLayout } from '@/ui/layout/DefaultLayout';

// Layout
// ---------------
const Layout = ({ children }: PropsWithChildren) => (
  <DefaultLayout>{children}</DefaultLayout>
);

export default Layout;
