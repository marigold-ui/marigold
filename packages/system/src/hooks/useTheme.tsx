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

/**
 * @internal
 */
export const __defaultTheme: Theme = {
  name: '',
  components: {},
};

const InternalContext = createContext<Theme>(__defaultTheme);

export const useTheme = () => {
  const theme = useContext(InternalContext);

  return theme;
};

export interface ThemeProviderProps<T extends Theme>
  extends VariantProps<typeof Box>,
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      'className'
    > {
  theme: T;
  children: ReactNode;
}

export function ThemeProvider<T extends Theme>({
  theme,
  children,
}: ThemeProviderProps<T>) {
  const classNamess = theme?.root ? theme.root() : '';
  return (
    <div data-theme={theme.name} classNames={classNamess}>
      <InternalContext.Provider value={theme}>
        {children}
      </InternalContext.Provider>
    </div>
  );
}
