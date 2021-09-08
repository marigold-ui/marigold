import React, { useState, useContext } from 'react';
import { BaseTheme } from '@marigold/components';

import unicornTheme from '@marigold/theme-unicorn';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';

export const themes = {
  b2bTheme,
  coreTheme,
  unicornTheme,
};

// Context
// ---------------
export type ThemeSwitchContextType = {
  current: string | undefined;
  themes: { [name: string]: BaseTheme };
  setTheme: Function;
};

export const Context = React.createContext({
  current: undefined,
  themes: {},
} as ThemeSwitchContextType);

// Hook
// ---------------
export const useThemeSwitch = () => useContext(Context);

// Component
// ---------------
export type MarigoldThemeSwitchProps = {
  themes: { [name: string]: BaseTheme };
  initial?: string;
};

export const MarigoldThemeSwitch: React.FC<MarigoldThemeSwitchProps> = ({
  themes,
  initial,
  children,
}) => {
  const [theme, setTheme] = useState(initial);
  return (
    <Context.Provider value={{ current: theme, themes, setTheme }}>
      {children}
    </Context.Provider>
  );
};
