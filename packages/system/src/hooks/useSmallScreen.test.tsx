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
