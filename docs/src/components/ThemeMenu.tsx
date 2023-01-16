import { Button, Menu } from '@marigold/components';
import { ChevronDown } from '@marigold/icons';
import { useThemeSwitch } from './ThemeSwitch';

export const ThemeMenu = () => {
  const { current, themes, setTheme } = useThemeSwitch();
  return (
    <Menu.Trigger>
      <Button variant="outline">
        {current} <ChevronDown />
      </Button>
      <Menu onSelect={current => setTheme(current)}>
        {Object.keys(themes).map(name => (
          <Menu.Item key={name}>{name}</Menu.Item>
        ))}
      </Menu>
    </Menu.Trigger>
  );
};
