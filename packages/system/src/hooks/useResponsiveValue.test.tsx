import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { vi } from 'vitest';
import { useResponsiveValue } from '@marigold/system';
import { ThemeProvider } from './useTheme';

/**
 * We need to mock `matchMedia` because JSON does not
 * implements it.
 */
const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

test('return first value if no breakpoint matches', () => {
  window.matchMedia = mockMatchMedia([]);

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three'])
  );

  expect(result.current).toEqual('one');
});

test('return last if all breakpoints match', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 640px)',
    'screen and (min-width: 768px)',
    'screen and (min-width: 1024px)',
  ]);

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three', 'four'])
  );

  expect(result.current).toEqual('four');
});

test('return last provided value even if larger breakpoints match', () => {
  // This would result in the third array value being returned
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 640px)',
    'screen and (min-width: 768px)',
  ]);

  const { result } = renderHook(() => useResponsiveValue(['one', 'two']));

  expect(result.current).toEqual('two');
});

test('uses breakpoints from theme', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 640px)',
    'screen and (min-width: 768px)',
  ]);

  const theme = {
    name: 'test',
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    components: {},
  };
  const wrapper = ({ children }: { children?: ReactNode }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
  const { result } = renderHook(() => useResponsiveValue(['one', 'two']), {
    wrapper,
  });

  expect(result.current).toEqual('two');
});

test('responds to resize event', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 640px)',
    'screen and (min-width: 768px)',
    'screen and (min-width: 1024px)',
  ]);

  let resize: () => void;
  window.addEventListener = vi.fn().mockImplementation((event, cb) => {
    if (event === 'resize') resize = cb;
  });

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three', 'four'])
  );
  expect(result.current).toEqual('four');

  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 640px)',
    'screen and (min-width: 768px)',
  ]);
  act(() => resize());
  expect(result.current).toEqual('three');

  window.matchMedia = mockMatchMedia(['screen and (min-width: 640px)']);
  act(() => resize());
  expect(result.current).toEqual('two');

  window.matchMedia = mockMatchMedia([]);
  act(() => resize());
  expect(result.current).toEqual('one');
});

test('throws if default index is below 0', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
  ]);

  const { result } = renderHook(() => {
    try {
      return useResponsiveValue(['one', 'two', 'three'], -1);
    } catch (error) {
      return { error };
    }
  });

  expect((result.current as { error: unknown }).error).toMatchInlineSnapshot(
    `[RangeError: Default breakpoint index is out of bounds. Theme has 6 breakpoints, default is -1.]`
  );
});

test('throws if default index is out of bounds', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
  ]);

  const { result } = renderHook(() => {
    try {
      return useResponsiveValue(['one', 'two', 'three'], 100);
    } catch (error) {
      return { error };
    }
  });

  expect((result.current as { error: unknown }).error).toMatchInlineSnapshot(
    `[RangeError: Default breakpoint index is out of bounds. Theme has 6 breakpoints, default is 100.]`
  );
});
