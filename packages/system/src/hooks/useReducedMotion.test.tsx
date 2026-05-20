import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useReducedMotion } from './useReducedMotion';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

test('returns true when prefers-reduced-motion is set', () => {
  window.matchMedia = mockMatchMedia([REDUCED_MOTION_QUERY]);

  const { result } = renderHook(() => useReducedMotion());

  expect(result.current).toBe(true);
});

test('returns false when prefers-reduced-motion is not set', () => {
  window.matchMedia = mockMatchMedia([]);

  const { result } = renderHook(() => useReducedMotion());

  expect(result.current).toBe(false);
});

test('queries the prefers-reduced-motion media feature', () => {
  window.matchMedia = mockMatchMedia([REDUCED_MOTION_QUERY]);

  renderHook(() => useReducedMotion());

  expect(window.matchMedia).toHaveBeenCalledWith(REDUCED_MOTION_QUERY);
});

test('updates when the media query change event fires', async () => {
  let changeHandler: (() => void) | undefined;
  const mq = {
    matches: false,
    addEventListener: vi.fn((_event: string, handler: () => void) => {
      changeHandler = handler;
    }),
    removeEventListener: vi.fn(),
  };
  window.matchMedia = vi.fn().mockReturnValue(mq);
  const { result } = renderHook(() => useReducedMotion());
  const { act } = await import('@testing-library/react');

  act(() => {
    mq.matches = true;
    changeHandler!();
  });

  expect(result.current).toBe(true);
});
