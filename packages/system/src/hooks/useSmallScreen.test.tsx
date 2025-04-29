import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useSmallScreen } from './useSmallScreen';

/**
 * We need to mock `matchMedia` because JDOM does not
 * implements it.
 */
const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => {
    return {
      matches: matches.includes(query),
    };
  });

test('check of the value is truthy', () => {
  window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

  const { result } = renderHook(() => useSmallScreen());
  expect(result.current).toBeTruthy();
});
