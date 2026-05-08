'use client';

import type { PropsWithChildren } from 'react';
import { ToastProvider } from '@marigold/components';
import { ShellLayout } from '../_shared';
import { config } from './navigation';

const Layout = ({ children }: PropsWithChildren) => (
  <ShellLayout config={config}>
    {children}
    <ToastProvider position="bottom-right" />
  </ShellLayout>
);

export default Layout;
