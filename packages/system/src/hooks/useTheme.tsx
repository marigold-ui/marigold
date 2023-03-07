import React, { ReactNode, useContext } from 'react';
import { Theme } from '../types';

import * as unicorn from 'themes/theme-unicorn/src/index';

const themes = {
  unicorn: unicorn,
};

/**
 * @internal
 */
export const __defaultTheme = {};

const Context = React.createContext(themes);

export interface ThemeProviderProps {
  theme: typeof themes;
  children: ReactNode;
}
export const useTheme = () => {
  const theme = useContext(Context);

  console.log('context', theme);
  return theme;
};

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  return <Context.Provider value={theme}>{children}</Context.Provider>;
};

// const InternalContext = createContext<any>(__defaultTheme);

// export const useTheme = () => {
//   const theme = useContext(InternalContext);

//   console.log('usetheme', theme);
//   return theme;
// };

// export function ThemeProvider<T extends Theme>({
//   theme,
//   children,
// }: ThemeProviderProps<T>) {
//   console.log('themeprovider', theme);
//   return (
//     <InternalContext.Provider value={theme}>
//       {children}
//     </InternalContext.Provider>
//   );
// }
