'use client';

import { MarigoldProvider, OverlayContainerProvider } from '@/ui';
import type { PropsWithChildren } from 'react';
import { useThemeSwitch } from '@/ui/ThemeSwitch';

export interface WrapperProps {
  theme?: string;
}

export const Wrapper = ({
  theme,
  children,
}: PropsWithChildren<WrapperProps>) => {
  const { current, themes } = useThemeSwitch();
  const selectedTheme = themes[theme ?? current];
  return (
    <div data-theme={current}>
      <OverlayContainerProvider value="portalContainer">
        <MarigoldProvider theme={selectedTheme}>
          <div className="h-[calc(100dvh-var(--page-header-height))] p-(--page-padding) md:p-(--page-padding-md) xl:p-(--page-padding-xl)">
            {children}
          </div>
        </MarigoldProvider>
      </OverlayContainerProvider>
    </div>
  );
};
