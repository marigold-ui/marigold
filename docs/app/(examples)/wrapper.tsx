'use client';

import { ruiTheme } from '@/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import {
  I18nProvider,
  MarigoldProvider,
  OverlayContainerProvider,
} from '@marigold/components';
import { getQueryClient } from './get-query-client';

export interface WrapperProps {
  className?: string;
}

export const Wrapper = ({
  className,
  children,
}: PropsWithChildren<WrapperProps>) => {
  // New client per server request, single reused client in the browser.
  // See get-query-client.ts for why this is preferred over useState here.
  const queryClient = getQueryClient();

  return (
    <div data-theme="rui" className={className}>
      <QueryClientProvider client={queryClient}>
        <OverlayContainerProvider container="portalContainer">
          <I18nProvider locale="en-US">
            <MarigoldProvider theme={ruiTheme}>{children}</MarigoldProvider>
          </I18nProvider>
        </OverlayContainerProvider>
      </QueryClientProvider>
    </div>
  );
};
