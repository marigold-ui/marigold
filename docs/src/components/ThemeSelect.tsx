import * as React from 'react';
import { useThemeSwitch } from './ThemeSwitch';
import { Box, SelectProps } from '@marigold/components';
import unicornTheme from '@marigold/theme-unicorn';
import b2bTheme from '@marigold/theme-b2b';

export const marigoldThemes = {
  b2bTheme,
  unicornTheme,
};

export const ThemeSelect: React.FC<SelectProps> = () => {
  const { current, themes, setTheme } = useThemeSwitch();

  return (
    <Box
      as="select"
      variant="select.themeSwitch"
      id="theme-select"
      value={current}
      onChange={(e: { target: { value: any } }) => setTheme(e.target.value)}
    >
      {Object.keys(themes).map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </Box>
  );
};
