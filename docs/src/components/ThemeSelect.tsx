import * as React from 'react';
import { useThemeSwitch } from './ThemeSwitch';
import { Box } from '@marigold/components';

export const ThemeSelect: React.FC = () => {
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
