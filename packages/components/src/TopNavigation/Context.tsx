import { createContext, useContext } from 'react';
import type { PropsWithChildren } from 'react';

export interface TopNavigationContextProps {
  variant?: string;
  size?: string;
}

export const TopNavigationContext = createContext<
  TopNavigationContextProps | undefined
>(undefined);

export const TopNavigationProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: TopNavigationContextProps }>) => (
  <TopNavigationContext.Provider value={value}>
    {children}
  </TopNavigationContext.Provider>
);

export const useTopNavigationContext = () => {
  const ctx = useContext(TopNavigationContext);
  if (!ctx) {
    throw new Error(
      'useTopNavigationContext must be used within a TopNavigationProvider'
    );
  }
  return ctx;
};
