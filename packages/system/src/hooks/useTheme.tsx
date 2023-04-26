import React, {
  createContext,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useContext,
} from 'react';
import { VariantProps } from 'tailwind-variants';
import { Theme } from '../types';
import { Box } from '../components';
import { HtmlProps } from '@marigold/types';

/**
 * @internal
 */
export const __defaultTheme: Theme = {
  name: 'default',
  components: {},
  root: '',
};

const InternalContext = createContext<Theme>(__defaultTheme);

export const useTheme = () => {
  const theme = useContext(InternalContext);

  return theme;
};

export interface ThemeProviderProps<T extends Theme> {
  theme: T;
  children: ReactNode;
}

export function ThemeProvider<T extends Theme>({
  theme,
  children,
}: ThemeProviderProps<T>) {
  console.log(theme.name);
  return (
    <div data-theme={theme.name} className={theme?.root ? theme.root() : ''}>
      <InternalContext.Provider value={theme}>
        {children}
      </InternalContext.Provider>
    </div>
  );
}
