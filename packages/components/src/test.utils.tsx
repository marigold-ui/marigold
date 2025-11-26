import { RenderOptions, render } from '@testing-library/react';
import { ReactElement } from 'react';
import { Theme, ThemeProvider, ThemeProviderProps } from '@marigold/system';

export type SetupProps<T extends Theme> = Omit<
  ThemeProviderProps<T>,
  'children'
>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const setup: Function = <T extends Theme>({ theme }: SetupProps<T>) => {
  return {
    render: (
      element: ReactElement<any>,
      options?: Omit<RenderOptions, 'wrapper'>
    ) =>
      render(element, {
        wrapper: ({ children }) => (
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        ),
        ...options,
      }),
  };
};

export const makeFile = (name: string, type: string, size = 1024) =>
  new File([new Uint8Array(size)], name, { type });
