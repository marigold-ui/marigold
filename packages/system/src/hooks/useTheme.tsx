import React, { ReactNode, useContext } from 'react';
import { Theme } from '../types';

/**
 * @internal
 */
export const __defaultTheme: Theme = {};

const Context = React.createContext<any>(__defaultTheme);

export interface ThemeProviderProps {
  theme: any;
  children: ReactNode;
}
export const useTheme = () => {
  const theme = useContext(Context);

  return theme;
};

export const ThemeProvider = ({ children, theme }: any) => {
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
