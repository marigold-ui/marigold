import { cleanup, renderHook } from '@testing-library/react';

import { useSmallScreen } from './useSmallScreen';

/**
 * We need to mock `matchMedia` because JSON does not
 * implements it.
 */
const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => {
    return {
      matches: matches.includes(query),
    };
  });

afterEach(cleanup);

test('check of the value is truthy', () => {
  window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

  const { result } = renderHook(() => useSmallScreen());
  expect(result.current).toBeTruthy();
});
