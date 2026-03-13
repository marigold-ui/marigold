'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MarigoldProvider theme={theme}>
      <RootProvider>{children}</RootProvider>
    </MarigoldProvider>
  );
};
