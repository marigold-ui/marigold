import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface TopNavigationContextProps {
  classNames: ComponentClassNames<'TopNavigation'>;
  variant?: string;
  size?: string;
}

export const TopNavigationContext =
  createContext<TopNavigationContextProps | null>(null);

export const useTopNavigationContext = () => {
  const context = use(TopNavigationContext);
  if (context === null) {
    throw new Error(
      'useTopNavigationContext must be used within a <TopNavigation> component'
    );
  }
  return context;
};
