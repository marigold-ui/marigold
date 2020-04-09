import React from 'react';
import { Global, ThemeContext } from './emotion';

/**
 * CSS snippet and idea from:
 * https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/
 */
const ReduceMotion = () => (
  <Global
    styles={{
      '@media screen and (prefers-reduced-motion: reduce), (update: slow)': {
        '*': {
          animationDuration: '0.001ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.001ms !important',
        },
      },
    }}
  />
);

// TODO: change any to theme when theme component exists
export type MarigoldProviderProps<T extends any> = React.PropsWithChildren<{
  theme: T;
}>;

export const MarigoldProvider = <T extends any>({
  theme,
  children,
}: MarigoldProviderProps<T>) => (
  <ThemeContext.Provider value={theme}>
    <>
      <ReduceMotion />
      {children}
    </>
  </ThemeContext.Provider>
);
