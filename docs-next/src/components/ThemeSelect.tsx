import * as React from 'react';
import { Select } from '@marigold/components';
import { useThemeSwitch } from '~/components';

export const ThemeSelect = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  console.log(current);
  return (
    <Select
      id="theme-select"
      selectedKey={current}
      value={current}
      onSelectionChange={current => setTheme(current)}
      aria-label="theme-select"
    >
      {Object.keys(themes).map(name => (
        <Select.Option key={name}>{name}</Select.Option>
      ))}
    </Select>
  );
};
