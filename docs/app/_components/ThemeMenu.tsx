'use client';

import { track } from '@vercel/analytics/react';
import { Menu } from '@marigold/components';
import { useThemeSwitch } from '@/ui/ThemeSwitch';
import { Theme } from '@/ui/icons/Theme';

export const ThemeMenu = () => {
  const { themes, updateTheme } = useThemeSwitch();
  const onAction = (current: string) => {
    updateTheme(current);
    track('Switch Theme', { theme: current });
  };

  return (
    <Menu
      aria-label="Choose a Theme"
      label={<Theme className="text-secondary-600" />}
      onAction={onAction}
      placement="bottom end"
    >
      {Object.keys(themes).map(name => (
        <Menu.Item key={name} id={name}>
          {name.toUpperCase()}
        </Menu.Item>
      ))}
    </Menu>
  );
};
