'use client';

import { type Theme } from '@/ui';
import React, { ReactNode, useContext, useEffect } from 'react';
import { useSessionStorage } from 'react-use';

import { useSearchParams } from 'next/navigation';

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
  const queryTheme = useSearchParams().get('theme');

  const [theme, setTheme] = useSessionStorage('theme', queryTheme ?? initial);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <Context.Provider value={{ current: theme, themes, setTheme }}>
      {children}
    </Context.Provider>
  );
};
