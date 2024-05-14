'use client';

import { type Theme } from '@/ui';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

// Context
// ---------------
export interface ThemeSwitchContextType {
  current: string | undefined;
  themes: { [name: string]: Theme };
  updateTheme: Function;
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
  let localTheme: string = '';

  const searchParams = useSearchParams();
  const themeQueryParam = searchParams?.get('theme');

  const [theme, setTheme] = useState<string>(() => initial);
  const router = useRouter();

  if (typeof localStorage !== 'undefined') {
    localTheme = localStorage.getItem('theme') as string;
  }

  const isInitialMount = useRef(true); // Ref to track initial mount

  const updateTheme = useCallback(
    (theme: string) => {
      setTheme(theme);
      localStorage.setItem('theme', theme);

      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);

      searchParams.set('theme', theme);
      const newUrl = `${currentUrl.pathname}?${searchParams.toString()}${currentUrl.hash}`;

      router.replace(newUrl, {
        scroll: false,
      });
    },
    [router]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (themeQueryParam) {
        updateTheme(themeQueryParam);
      } else if (localTheme) {
        updateTheme(localTheme);
      } else {
        updateTheme(initial);
      }
    }
  }, [localTheme, themeQueryParam, updateTheme, initial]);

  return (
    <Context.Provider value={{ current: theme, themes, updateTheme }}>
      {children}
    </Context.Provider>
  );
};
