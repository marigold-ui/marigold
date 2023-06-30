import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useSmallScreen } from '@marigold/system';

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
  window.matchMedia = mockMatchMedia(['screen and (min-width: 768px)']);
  const { result } = renderHook(() => useSmallScreen());

  expect(result.current).toEqual(true);
});
