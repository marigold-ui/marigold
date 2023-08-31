/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';

import { useResponsiveValue } from './useResponsiveValue';

const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => {
    return {
      matches: matches.includes(query),
    };
  });

test("falls back to user's default index", () => {
  window.matchMedia = mockMatchMedia(['screen and (min-width: 640px)']);
  const { result } = renderHook(() => useResponsiveValue(['one', 'two'], 1));
  expect(result.current).toEqual('two');
});
