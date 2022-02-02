import React from 'react';
import { cleanup } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useResponsiveValue } from './useResponsiveValue';
import { ThemeProvider } from './useTheme';

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */
const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

afterEach(cleanup);

test('return first value if no breakpoint matches', () => {
  window.matchMedia = mockMatchMedia([]);

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three'])
  );

  expect(result.current).toEqual('one');
});

test('return last if all breakpoints match', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
    'screen and (min-width: 64em)',
  ]);

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three', 'four'])
  );

  expect(result.current).toEqual('four');
});

test('return last provided value even if larger breakpoints match', () => {
  // This would result in returnen the third array value
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
  ]);

  const { result } = renderHook(() => useResponsiveValue(['one', 'two']));

  expect(result.current).toEqual('two');
});

test('uses breakpoints from theme', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 25em)',
    'screen and (min-width: 50em)',
  ]);

  const theme = { breakpoints: ['25em', '50em', '65em'] };
  const wrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
  const { result } = renderHook(() => useResponsiveValue(['one', 'two']), {
    wrapper,
  });

  expect(result.current).toEqual('two');
});

test('responds to resize event', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
    'screen and (min-width: 64em)',
  ]);

  let resize: Function;
  window.addEventListener = jest.fn().mockImplementation((event, cb) => {
    if (event === 'resize') resize = cb;
  });

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three', 'four'])
  );
  expect(result.current).toEqual('four');

  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
  ]);
  act(() => resize());
  expect(result.current).toEqual('three');

  window.matchMedia = mockMatchMedia(['screen and (min-width: 40em)']);
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

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three'], -1)
  );

  expect(result.error).toMatchInlineSnapshot(
    `[RangeError: Default breakpoint index is out of bounds. Theme has 3 breakpoints, default is -1.]`
  );
});

test('throws if default index is out of bounds', () => {
  window.matchMedia = mockMatchMedia([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
  ]);

  const { result } = renderHook(() =>
    useResponsiveValue(['one', 'two', 'three'], 100)
  );

  expect(result.error).toMatchInlineSnapshot(
    `[RangeError: Default breakpoint index is out of bounds. Theme has 3 breakpoints, default is 100.]`
  );
});
