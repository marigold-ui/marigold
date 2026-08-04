import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useResponsiveValue } from '@marigold/system';
import { testTheme, themeWrapper as wrapper } from './test.utils';

const originalMatchMedia = window.matchMedia;

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

test("falls back to user's default index", () => {
  window.matchMedia = mockMatchMedia([
    `screen and (min-width: ${testTheme.screens!.sm})`,
  ]);

  const { result } = renderHook(() => useResponsiveValue(['one', 'two'], 1), {
    wrapper,
  });

  expect(result.current).toEqual('two');
});
