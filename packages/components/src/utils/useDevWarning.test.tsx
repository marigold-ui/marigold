import { renderHook } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
import { useDevWarning } from './useDevWarning';

let warnMock: MockInstance;

beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});

afterEach(() => {
  warnMock.mockRestore();
});

test('warns once, however often the component re-renders', () => {
  const { rerender } = renderHook(() => useDevWarning(true, 'message'));
  rerender();
  rerender();

  expect(warnMock).toHaveBeenCalledTimes(1);
  expect(warnMock).toHaveBeenCalledWith('message');
});

test('warns once per instance', () => {
  renderHook(() => useDevWarning(true, 'message'));
  renderHook(() => useDevWarning(true, 'message'));

  expect(warnMock).toHaveBeenCalledTimes(2);
});

test('does not warn while the condition is false', () => {
  renderHook(() => useDevWarning(false, 'message'));

  expect(warnMock).not.toHaveBeenCalled();
});

test('warns once when the condition becomes true later', () => {
  const { rerender } = renderHook(
    ({ shouldWarn }) => useDevWarning(shouldWarn, 'message'),
    { initialProps: { shouldWarn: false } }
  );
  rerender({ shouldWarn: true });
  rerender({ shouldWarn: false });
  rerender({ shouldWarn: true });

  expect(warnMock).toHaveBeenCalledTimes(1);
});
