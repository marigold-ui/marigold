import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
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

/**
 * Ensures the overlay container exists for story-based tests.
 * Stories expect "storybook-root" container for overlay portals (Select, Dialog, etc.).
 * Call this before rendering overlay components from stories.
 */
export const ensureOverlayContainer = () => {
  if (!document.getElementById('storybook-root')) {
    const container = document.createElement('div');
    container.id = 'storybook-root';
    document.body.appendChild(container);
  }
};

/**
 * Render helper for overlay components when using stories.
 * Creates the required portal container and renders the component.
 */
export const renderWithOverlay = (ui: ReactNode): RenderResult => {
  ensureOverlayContainer();
  return render(ui as ReactElement);
};

export const makeFile = (name: string, type: string, size = 1024) =>
  new File([new Uint8Array(size)], name, { type });
