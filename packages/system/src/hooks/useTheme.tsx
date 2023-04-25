import React, { createContext, ReactNode, useContext } from 'react';
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

export interface ThemeProviderProps<T extends Theme> extends VariantProps<any> {
  theme: T;
  children: ReactNode;
}

export function ThemeProvider<T extends Theme>({
  theme,
  children,
}: ThemeProviderProps<T>) {
  return (
    <Box
      as="div"
      data-theme={theme.name}
      className={theme?.root ? theme.root() : ''}
    >
      <InternalContext.Provider value={theme}>
        {children}
      </InternalContext.Provider>
    </Box>
  );
}
