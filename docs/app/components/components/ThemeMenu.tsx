'use client';

import { Button, Inline, Menu } from '@marigold/components';
import { ChevronDown } from '@marigold/icons';
import { useThemeSwitch } from './ThemeSwitch';

export const ThemeMenu = () => {
  const { current, themes, setTheme } = useThemeSwitch();
  return (
    <Menu.Trigger>
      <Button>
        <Inline space={7}>
          {current} <ChevronDown />
        </Inline>
      </Button>
      <Menu onAction={current => setTheme(current)} className="bg-black">
        {Object.keys(themes).map(name => (
          <Menu.Item key={name}>{name}</Menu.Item>
        ))}
      </Menu>
    </Menu.Trigger>
  );
};
