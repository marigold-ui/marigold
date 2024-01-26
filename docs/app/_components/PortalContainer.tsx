'use client';

import { useThemeSwitch } from '@/ui/ThemeSwitch';

export const PortalContainer = () => {
  const { current, themes } = useThemeSwitch();

  return (
    <div
      id="portalContainer"
      data-theme={current ? current : themes.b2b.name}
    />
  );
};
