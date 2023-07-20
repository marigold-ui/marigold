'use client';

import { Button, Menu } from '@marigold/components';
import { ChevronDown } from '@marigold/icons';
import { useThemeSwitch } from './ThemeSwitch';

export const ThemeMenu = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <Menu.Trigger>
      <Button>
        {current ? current : themes.b2b.name} theme
        <ChevronDown />
      </Button>
      <Menu onAction={current => setTheme(current)}>
        {Object.keys(themes).map(name => (
          <Menu.Item key={name}>{name}</Menu.Item>
        ))}
      </Menu>
    </Menu.Trigger>
  );
};
