'use client';

import { useThemeSwitch } from '@/ui/ThemeSwitch';

export const PortalContaier = () => {
  const { current } = useThemeSwitch();

  return (
    <div data-theme={current}>
      <div id="portalContainer" className="not-prose" />
    </div>
  );
};
