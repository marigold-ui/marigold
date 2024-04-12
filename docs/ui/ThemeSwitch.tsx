'use client';

import { type Theme } from '@/ui';
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

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
  let localTheme: string;

  const searchParams = useSearchParams();
  const themeParam = searchParams?.get('theme');

  const [theme, setTheme] = useState<string>(initial);
  const router = useRouter();

  if (typeof sessionStorage !== 'undefined') {
    localTheme = sessionStorage.getItem('theme') as string;
  }

  useEffect(() => {
    if (themeParam) {
      setTheme(themeParam);
      sessionStorage.setItem('theme', themeParam);
    }
    if (localTheme) {
      setTheme(localTheme);
      router.push(`?theme=${localTheme}`);
    }
  }, []);

  const isInitialMount = useRef(true); // Ref to track initial mount

  useEffect(() => {
    if (isInitialMount.current) {
      // Skip the effect on initial mount
      isInitialMount.current = false;
      return;
    }
    setTheme(theme);
    sessionStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Context.Provider value={{ current: theme, themes, setTheme }}>
      {children}
    </Context.Provider>
  );
};
