import * as React from 'react';
import { useThemeSwitch } from './ThemeSwitch';
import { Item, Select } from '@marigold/components';

export const ThemeSelect = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <Select
      id="theme-select"
      selectedKey={current}
      value={current}
      onSelectionChange={current => setTheme(current)}
      menuWidth="160px"
    >
      {Object.keys(themes).map(name => (
        <Item key={name}>{name}</Item>
      ))}
    </Select>
  );
};
