'use client';

import { ruiTheme } from '@/theme';
import { MarigoldProvider, OverlayContainerProvider } from '@/ui';
import type { PropsWithChildren } from 'react';

export interface WrapperProps {
  className?: string;
}

export const Wrapper = ({
  className,
  children,
}: PropsWithChildren<WrapperProps>) => {
  return (
    <div data-theme="rui">
      <OverlayContainerProvider container="portalContainer">
        <MarigoldProvider className={className} theme={ruiTheme}>
          <div className="p-(--page-padding) md:p-(--page-padding-md) xl:p-(--page-padding-xl)">
            {children}
          </div>
        </MarigoldProvider>
      </OverlayContainerProvider>
    </div>
  );
};
