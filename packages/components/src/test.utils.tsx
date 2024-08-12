import { RenderOptions, render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Theme, ThemeProvider, ThemeProviderProps } from '@marigold/system';

export interface SetupProps<T extends Theme>
  extends Omit<ThemeProviderProps<T>, 'children'> {}

export const setup = <T extends Theme>({ theme }: SetupProps<T>) => {
  return {
    render: (element: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
      render(element, {
        wrapper: ({ children }) => (
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        ),
        ...options,
      }),
  };
};
