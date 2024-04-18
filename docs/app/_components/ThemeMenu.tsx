'use client';

import { Menu } from '@marigold/components';

import { useThemeSwitch } from '@/ui/ThemeSwitch';
import { Theme } from '@/ui/icons/Theme';

export const ThemeMenu = () => {
  const { themes, setTheme } = useThemeSwitch();

  return (
    <Menu
      label={<Theme className="text-secondary-600" />}
      onAction={current => setTheme(current)}
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
