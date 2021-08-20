import * as React from 'react';
import { useThemeSwitch } from './ThemeSwitch';
import { Item, Select } from '@marigold/components';
import { useStyles } from '@marigold/system';

export const ThemeSelect = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <Select
      id="theme-select"
      selectedKey={current}
      value={current}
      onSelectionChange={current => setTheme(current)}
      className={useStyles({ css: { width: '100%' } })}
    >
      {Object.keys(themes).map(name => (
        <Item key={name}>{name}</Item>
      ))}
    </Select>
  );
};
