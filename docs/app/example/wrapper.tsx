'use client';

import { MarigoldProvider, OverlayContainerProvider } from '@/ui';
import type { PropsWithChildren } from 'react';
import { useThemeSwitch } from '@/ui/ThemeSwitch';

export const Wrapper = ({ children }: PropsWithChildren) => {
  const { current, themes } = useThemeSwitch();
  const theme = themes[current];

  return (
    <div data-theme={current}>
      <OverlayContainerProvider value="portalContainer">
        <MarigoldProvider theme={theme}>
          <div className="p-(--page-padding) md:p-(--page-padding-md) xl:p-(--page-padding-xl)">
            {children}
          </div>
        </MarigoldProvider>
      </OverlayContainerProvider>
    </div>
  );
};
