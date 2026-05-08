'use client';

import { ruiTheme } from '@/theme';
import type { PropsWithChildren } from 'react';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '@marigold/components';

export interface WrapperProps {
  className?: string;
}

export const Wrapper = ({
  className,
  children,
}: PropsWithChildren<WrapperProps>) => {
  return (
    <div data-theme="rui" className={className}>
      <OverlayContainerProvider container="portalContainer">
        <MarigoldProvider theme={ruiTheme}>{children}</MarigoldProvider>
      </OverlayContainerProvider>
    </div>
  );
};
