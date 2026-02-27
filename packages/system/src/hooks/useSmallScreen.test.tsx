import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useSmallScreen } from './useSmallScreen';

const originalMatchMedia = window.matchMedia;

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => {
    return {
      matches: matches.includes(query),
    };
  });

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

test('check of the value is truthy', () => {
  window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

  const { result } = renderHook(() => useSmallScreen());
  expect(result.current).toBeTruthy();
});
