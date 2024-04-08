'use client';

import { type Theme } from '@/ui';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

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

  let localTheme = sessionStorage.getItem('theme');

  const [theme, setTheme] = useState(queryTheme ?? localTheme ?? initial);
  console.log('currentTheme', queryTheme ?? localTheme ?? initial);
  useEffect(() => {
    sessionStorage.setItem('theme', theme);
    setTheme(theme);
  }, [theme]);

  return (
    <Context.Provider value={{ current: theme, themes, setTheme }}>
      {children}
    </Context.Provider>
  );
};
