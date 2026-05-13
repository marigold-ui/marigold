'use client';

import type { PropsWithChildren } from 'react';
import { ShellLayout } from '../_shared';
import { config } from './navigation';

const Layout = ({ children }: PropsWithChildren) => (
  <div className="-m-(--page-padding) md:-m-(--page-padding-md) xl:-m-(--page-padding-xl)">
    <ShellLayout config={config}>{children}</ShellLayout>
  </div>
);

export default Layout;
