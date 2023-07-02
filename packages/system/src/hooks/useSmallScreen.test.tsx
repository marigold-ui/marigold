import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useResponsiveValue } from './useResponsiveValue';
import { useSmallScreen } from './useSmallScreen';

/**
 * We need to mock `matchMedia` because JSON does not
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
  window.matchMedia = mockMatchMedia(['screen and (max-width: 400px)']);

  const { result } = renderHook(() => useSmallScreen());
  console.log('result -----------', result);
  expect(result.current).toBeTruthy();
});
