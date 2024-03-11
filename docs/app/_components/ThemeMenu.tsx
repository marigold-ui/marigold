'use client';

import { Menu } from '@marigold/components';

import { useThemeSwitch } from '@/ui/ThemeSwitch';
import { Theme } from '@/ui/icons/Theme';

export const ThemeMenu = () => {
  const { themes, setTheme } = useThemeSwitch();

  return (
    <Menu onAction={current => setTheme(current)} label={<Theme />}>
      {Object.keys(themes).map(name => (
        <Menu.Item key={name} id={name}>
          {name.toUpperCase()}
        </Menu.Item>
      ))}
    </Menu>
  );
};
