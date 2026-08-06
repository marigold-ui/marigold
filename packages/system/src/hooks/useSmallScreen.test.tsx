import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { testTheme, themeWrapper as wrapper } from './test.utils';
import { useSmallScreen } from './useSmallScreen';

const smallScreenQuery = `(width < ${testTheme.screens!.sm})`;

/**
 * We need to mock `matchMedia` because jsdom does not
 * implement it.
 */
const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

test('returns true when screen is below sm breakpoint', () => {
  window.matchMedia = mockMatchMedia([smallScreenQuery]);

  const { result } = renderHook(() => useSmallScreen(), { wrapper });

  expect(result.current).toBeTruthy();
});

test('returns false when screen is at or above sm breakpoint', () => {
  window.matchMedia = mockMatchMedia([]);

  const { result } = renderHook(() => useSmallScreen(), { wrapper });

  expect(result.current).toBeFalsy();
});

test('uses breakpoint derived from theme.screens.sm', () => {
  window.matchMedia = mockMatchMedia([smallScreenQuery]);

  renderHook(() => useSmallScreen(), { wrapper });

  expect(window.matchMedia).toHaveBeenCalledWith(smallScreenQuery);
});

test('updates when media query change event fires', async () => {
  let currentMatches = false;
  let changeHandler: (() => void) | undefined;
  window.matchMedia = vi.fn().mockImplementation(() => ({
    get matches() {
      return currentMatches;
    },
    addEventListener: vi.fn((_event: string, handler: () => void) => {
      changeHandler = handler;
    }),
    removeEventListener: vi.fn(),
  }));

  const { result } = renderHook(() => useSmallScreen(), { wrapper });

  expect(result.current).toBe(false);

  const { act } = await import('@testing-library/react');
  act(() => {
    currentMatches = true;
    changeHandler!();
  });

  expect(result.current).toBe(true);
});
