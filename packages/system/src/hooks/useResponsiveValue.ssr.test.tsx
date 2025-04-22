/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useResponsiveValue } from '@marigold/system';

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => {
    return {
      matches: matches.includes(query),
    };
  });

test("falls back to user's default index", () => {
  window.matchMedia = mockMatchMedia(['screen and (min-width: 640px)']);
  const { result } = renderHook(() => useResponsiveValue(['one', 'two'], 1));
  expect(result.current).toEqual('two');
});
