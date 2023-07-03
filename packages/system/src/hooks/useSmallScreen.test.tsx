import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

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

test('check of the value is truthy', () => {
  window.matchMedia = mockMatchMedia(['screen and (max-width: 700px)']);

  const { result } = renderHook(() => useSmallScreen());
  console.log('result.current', result.current);
  expect(result.current).toBeFalsy();
});
