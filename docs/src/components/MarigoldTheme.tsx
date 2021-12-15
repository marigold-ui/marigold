import React from 'react';
import { ThemeProvider, __defaultTheme } from '@marigold/system';
import { useThemeSwitch } from './ThemeSwitch';

/**
 * Component to wrap children in the current marigold theme
 */
export const MarigoldTheme: React.FC = ({ children }) => {
  const { current, themes } = useThemeSwitch();

  return (
    <ThemeProvider theme={(current && themes[current]) || __defaultTheme}>
      {children}
    </ThemeProvider>
  );
};
