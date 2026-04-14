import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { defaultTheme } from '../defaultTheme';
import { useSmallScreen } from './useSmallScreen';

const expectedQuery = `(width < ${defaultTheme.screens.sm})`;

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
  window.matchMedia = mockMatchMedia([expectedQuery]);
  const { result } = renderHook(() => useSmallScreen());
  expect(result.current).toBeTruthy();
});

test('returns false when screen is at or above sm breakpoint', () => {
  window.matchMedia = mockMatchMedia([]);
  const { result } = renderHook(() => useSmallScreen());
  expect(result.current).toBeFalsy();
});

test('uses breakpoint derived from defaultTheme.screens.sm', () => {
  window.matchMedia = mockMatchMedia([expectedQuery]);
  renderHook(() => useSmallScreen());
  expect(window.matchMedia).toHaveBeenCalledWith(expectedQuery);
});

test('updates when media query change event fires', async () => {
  let changeHandler: ((e: Partial<MediaQueryListEvent>) => void) | undefined;

  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    addEventListener: vi.fn(
      (_event: string, handler: (e: Partial<MediaQueryListEvent>) => void) => {
        changeHandler = handler;
      }
    ),
    removeEventListener: vi.fn(),
  }));

  const { result } = renderHook(() => useSmallScreen());
  expect(result.current).toBe(false);

  const { act } = await import('@testing-library/react');
  act(() => {
    changeHandler!({ matches: true } as MediaQueryListEvent);
  });

  expect(result.current).toBe(true);
});
