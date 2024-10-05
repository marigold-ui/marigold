'use client';

import { useThemeSwitch } from '@/ui/ThemeSwitch';

export const PortalContaier = () => {
  const { current, themes } = useThemeSwitch();
  const theme = themes[current];

  return (
    <div data-theme={current}>
      <div id="portalContainer" className={`not-prose ${theme.root?.()}`} />
    </div>
  );
};
