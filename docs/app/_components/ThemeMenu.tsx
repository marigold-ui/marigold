'use client';

import { Menu } from '@marigold/components';
import { ChevronDown } from '@marigold/icons';

import { useThemeSwitch } from '@/ui/ThemeSwitch';

export const ThemeMenu = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <Menu
      onAction={current => setTheme(current)}
      label={
        <>
          <strong>Current Theme:</strong>
          <span className="uppercase">
            {current ? current : themes.b2b.name}
          </span>
          <ChevronDown className="h-4 w-4" />
        </>
      }
    >
      {Object.keys(themes).map((name, index) => (
        <Menu.Item id={name} key={index}>
          {name.toUpperCase()}
        </Menu.Item>
      ))}
    </Menu>
  );
};
