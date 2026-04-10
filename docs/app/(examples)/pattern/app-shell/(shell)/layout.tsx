'use client';

import type { PropsWithChildren } from 'react';
import { ShellLayout } from '../../../_shared';
import { config } from './navigation';

const Layout = ({ children }: PropsWithChildren) => (
  <ShellLayout config={config}>{children}</ShellLayout>
);

export default Layout;
