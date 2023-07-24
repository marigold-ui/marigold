'use client';

import { Button, Menu } from '@marigold/components';
import { ChevronDown } from '@marigold/icons';
import { useThemeSwitch } from './ThemeSwitch';

export const ThemeMenu = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <Menu.Trigger>
      <Button variant="ghost" size="small">
        <strong>Current Theme:</strong>
        {current ? current : themes.b2b.name}
        <ChevronDown className="h-4 w-4" />
      </Button>
      <Menu onAction={current => setTheme(current)}>
        {Object.keys(themes).map(name => (
          <Menu.Item key={name}>{name}</Menu.Item>
        ))}
      </Menu>
    </Menu.Trigger>
  );
};
