import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { vi } from 'vitest';
import { Theme, ThemeProvider, ThemeProviderProps } from '@marigold/system';
import { theme } from '@marigold/theme-rui';

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

/**
 * Mock `matchMedia` for jsdom which does not implement it.
 * Returns a mock that supports the `addEventListener`/`removeEventListener`
 * API used by the `useSmallScreen` hook.
 */
export const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

/**
 * The media query `useSmallScreen` derives from the theme's `sm` breakpoint.
 * Assign `window.matchMedia = mockMatchMedia([smallScreenQuery])` to put a
 * test on a small screen.
 */
export const smallScreenQuery = `(width < ${theme.screens!.sm})`;
