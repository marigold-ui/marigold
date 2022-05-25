import React, { useState, useContext, ReactNode } from 'react';
import { type Theme } from '@marigold/components';

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
export interface ThemeSwitchContextType {
  current: string | undefined;
  themes: { [name: string]: Theme };
  setTheme: Function;
}

export const Context = React.createContext({
  current: undefined,
  themes: {},
} as ThemeSwitchContextType);

// Hook
// ---------------
export const useThemeSwitch = () => useContext(Context);

// Component
// ---------------
export interface MarigoldThemeSwitchProps {
  children?: ReactNode;
  themes: { [name: string]: Theme };
  initial?: string;
}

export const MarigoldThemeSwitch = ({
  themes,
  initial,
  children,
}: MarigoldThemeSwitchProps) => {
  const [theme, setTheme] = useState(initial);
  return (
    <Context.Provider value={{ current: theme, themes, setTheme }}>
      {children}
    </Context.Provider>
  );
};
