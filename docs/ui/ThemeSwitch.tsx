'use client';

import { MarigoldProvider, type Theme } from '@/ui';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { theme as docsTheme } from '../theme';

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
  initial: string;
}

export const MarigoldThemeSwitch = ({
  themes,
  initial,
  children,
}: MarigoldThemeSwitchProps) => {
  const [theme, setTheme] = useState(initial);
  useEffect(() => setTheme(theme), [theme]);

  return (
    <MarigoldProvider theme={docsTheme}>
      <Context.Provider value={{ current: theme, themes, setTheme }}>
        {children}
      </Context.Provider>
    </MarigoldProvider>
  );
};
