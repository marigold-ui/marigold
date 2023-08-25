/**
 * @jest-environment node
 */
import { renderHook } from '@testing-library/react';

import { useResponsiveValue } from './useResponsiveValue';

test("falls back to user's default index", () => {
  const { result } = renderHook(() => useResponsiveValue(['one', 'two'], 1));
  expect(result.current).toEqual('two');
});
