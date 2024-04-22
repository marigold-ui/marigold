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
  const themeQueryParam = searchParams?.get('theme');

  const [theme, setTheme] = useState<string>(initial);
  const router = useRouter();

  if (typeof sessionStorage !== 'undefined') {
    localTheme = sessionStorage.getItem('theme') as string;
  }

  const isInitialMount = useRef(true); // Ref to track initial mount

  useEffect(() => {
    // component did mount
    if (isInitialMount.current) {
      // Skip the effect on initial mount
      isInitialMount.current = false;

      if (themeQueryParam) {
        setTheme(themeQueryParam);
        sessionStorage.setItem('theme', themeQueryParam);
      } else if (localTheme) {
        setTheme(localTheme);
        router.push(`?theme=${localTheme}`);
      }

      return;
    }

    setTheme(theme);
    sessionStorage.setItem('theme', theme);
    router.push(`?theme=${theme}`, {
      scroll: false,
    });
  }, [theme]);

  return (
    <Context.Provider value={{ current: theme, themes, setTheme }}>
      {children}
    </Context.Provider>
  );
};
