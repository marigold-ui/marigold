'use client';

import { MarigoldProvider, Menu } from '@marigold/components';
import { ChevronDown } from '@marigold/icons';

import { useThemeSwitch } from '@/ui/ThemeSwitch';

import { theme as docsTheme } from '../../theme';

export const ThemeMenu = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <Menu
      onAction={current => setTheme(current)}
      label={
        <div className="flex flex-nowrap items-center gap-2 text-sm">
          <strong>Theme:</strong>
          <span className="uppercase">
            {current ? current : themes.b2b.name}
          </span>
          <ChevronDown className="size-4" />
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
