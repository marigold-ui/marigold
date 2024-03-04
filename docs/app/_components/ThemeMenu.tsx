'use client';

import { Menu } from '@marigold/components';

import { useThemeSwitch } from '@/ui/ThemeSwitch';
import { Theme } from '@/ui/icons/Theme';

export const ThemeMenu = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <Menu
      onAction={current => setTheme(current)}
      label={
        <div className="mx-1 flex flex-nowrap items-center gap-2 text-sm">
          <Theme />
        </div>
      }
    >
      {Object.keys(themes).map(name => (
        <Menu.Item key={name} id={name}>
          {name.toUpperCase()}
        </Menu.Item>
      ))}
    </Menu>
  );
};
