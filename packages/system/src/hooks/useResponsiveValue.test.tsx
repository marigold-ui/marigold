import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { vi } from 'vitest';
import { useResponsiveValue } from '@marigold/system';
import type { Theme } from '../types/theme';
import { testTheme, themeWrapper as wrapper } from './test.utils';
import { ThemeProvider } from './useTheme';

const { sm, md, lg } = testTheme.screens!;

const originalMatchMedia = window.matchMedia;

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  vi.restoreAllMocks();
});

test('return first value if no breakpoint matches', () => {
  window.matchMedia = mockMatchMedia([]);

  const { result } = renderHook(
    () => useResponsiveValue(['one', 'two', 'three']),
    { wrapper }
  );

  expect(result.current).toEqual('one');
});

test('return last if all breakpoints match', () => {
  window.matchMedia = mockMatchMedia([
    `screen and (min-width: ${sm})`,
    `screen and (min-width: ${md})`,
    `screen and (min-width: ${lg})`,
  ]);

  const { result } = renderHook(
    () => useResponsiveValue(['one', 'two', 'three', 'four']),
    { wrapper }
  );

  expect(result.current).toEqual('four');
});

test('return last provided value even if larger breakpoints match', () => {
  window.matchMedia = mockMatchMedia([
    `screen and (min-width: ${sm})`,
    `screen and (min-width: ${md})`,
  ]);

  const { result } = renderHook(() => useResponsiveValue(['one', 'two']), {
    wrapper,
  });

  expect(result.current).toEqual('two');
});

test('uses breakpoints from theme', () => {
  window.matchMedia = mockMatchMedia([
    `screen and (min-width: ${sm})`,
    `screen and (min-width: ${md})`,
  ]);
  const customTheme: Theme = {
    name: 'custom',
    screens: { sm, md, lg },
    components: {},
  };
  const customWrapper = ({ children }: { children?: ReactNode }) => (
    <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
  );

  const { result } = renderHook(() => useResponsiveValue(['one', 'two']), {
    wrapper: customWrapper,
  });

  expect(result.current).toEqual('two');
});

test('responds to matchMedia change', () => {
  const listeners: Array<() => void> = [];
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: [
      `screen and (min-width: ${sm})`,
      `screen and (min-width: ${md})`,
      `screen and (min-width: ${lg})`,
    ].includes(query),
    addEventListener: (_: string, cb: () => void) => listeners.push(cb),
    removeEventListener: vi.fn(),
  }));

  const { result } = renderHook(
    () => useResponsiveValue(['one', 'two', 'three', 'four']),
    { wrapper }
  );

  expect(result.current).toEqual('four');

  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: [
      `screen and (min-width: ${sm})`,
      `screen and (min-width: ${md})`,
    ].includes(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  act(() => listeners.forEach(cb => cb()));

  expect(result.current).toEqual('three');

  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: [`screen and (min-width: ${sm})`].includes(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  act(() => listeners.forEach(cb => cb()));

  expect(result.current).toEqual('two');

  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  act(() => listeners.forEach(cb => cb()));

  expect(result.current).toEqual('one');
});

test('throws if default index is below 0', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
  ]);

  const { result } = renderHook(
    () => {
      try {
        return useResponsiveValue(['one', 'two', 'three'], -1);
      } catch (error) {
        return { error };
      }
    },
    { wrapper }
  );

  expect((result.current as { error: unknown }).error).toMatchInlineSnapshot(
    `[RangeError: Default breakpoint index is out of bounds. Theme has 6 breakpoints, default is -1.]`
  );
});

test('throws if default index is out of bounds', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
  ]);

  const { result } = renderHook(
    () => {
      try {
        return useResponsiveValue(['one', 'two', 'three'], 100);
      } catch (error) {
        return { error };
      }
    },
    { wrapper }
  );

  expect((result.current as { error: unknown }).error).toMatchInlineSnapshot(
    `[RangeError: Default breakpoint index is out of bounds. Theme has 6 breakpoints, default is 100.]`
  );
});
