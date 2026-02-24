'use client';

import { ruiTheme } from '@/theme';
import type { PropsWithChildren } from 'react';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '@marigold/components';
import { cn } from '@marigold/system';

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
        <MarigoldProvider
          className={cn(
            'p-(--page-padding) md:p-(--page-padding-md) xl:p-(--page-padding-xl)',
            className
          )}
          theme={ruiTheme}
        >
          {children}
        </MarigoldProvider>
      </OverlayContainerProvider>
    </div>
  );
};
