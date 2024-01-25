'use client';

import { useThemeSwitch } from '@/ui/ThemeSwitch';

import { theme as docsTheme } from '../../theme';

export const PortalContainer = () => {
  const { current, themes } = useThemeSwitch();

  return (
    <div
      id="portalContainer"
      data-theme={docsTheme ? docsTheme : current ? current : themes.b2b.name}
    />
  );
};
