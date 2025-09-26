import { renderHook } from '@testing-library/react';
import { useConfirmation } from './useConfirmation';

test('throw if ConfirmationProvider is missing', () => {
  expect(() =>
    renderHook(() => useConfirmation(), { wrapper: undefined })
  ).toThrow();
});
