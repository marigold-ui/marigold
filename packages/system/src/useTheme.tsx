import React, { createContext, useContext } from 'react';

const Context = createContext({});

export const useTheme = () => useContext(Context);

export type MarigoldProviderProps = { theme: any };
export const MarigoldProvider: React.FC<MarigoldProviderProps> = ({
  theme,
  children,
}) => <Context.Provider value={theme}>{children}</Context.Provider>;
