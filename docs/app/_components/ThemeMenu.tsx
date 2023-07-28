'use client';

import { Button, Menu } from '@marigold/components';
import { ChevronDown } from '@marigold/icons';
import { useThemeSwitch } from '@/ui/ThemeSwitch';

export const ThemeMenu = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <Menu.Trigger>
      <Button variant="ghost" size="small">
        <strong>Current Theme:</strong>
        <span className="uppercase">{current ? current : themes.b2b.name}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
      <Menu onAction={current => setTheme(current)}>
        {Object.keys(themes).map(name => (
          <Menu.Item key={name}>{name.toUpperCase()}</Menu.Item>
        ))}
      </Menu>
    </Menu.Trigger>
  );
};
