import React from 'react';
import { ThemeProvider } from '@marigold/system';
import { useThemeSwitch } from './ThemeSwitch';

/**
 * Component to wrap children in the current marigold theme
 */
export const MarigoldTheme: React.FC = ({ children }) => {
  const { current, themes } = useThemeSwitch();

  return (
    <ThemeProvider theme={current && themes[current]}>{children}</ThemeProvider>
  );
};
