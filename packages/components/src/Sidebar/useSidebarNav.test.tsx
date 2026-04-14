import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import {
  panelPosition,
  useLastDistinctValue,
  useRovingItem,
} from './useSidebarNav';

describe('panelPosition utility', () => {
  test('panelPosition returns active for root when stack is empty', () => {
    expect(panelPosition('root', [])).toBe('active');
  });

  test('panelPosition returns before for root when stack has entries', () => {
    expect(panelPosition('root', ['branch-a'])).toBe('before');
  });

  test('panelPosition returns active for key at top of stack', () => {
    expect(panelPosition('branch-a', ['branch-a'])).toBe('active');
  });

  test('panelPosition returns before for key earlier in stack', () => {
    expect(panelPosition('branch-a', ['branch-a', 'branch-b'])).toBe('before');
  });

  test('panelPosition returns after for key not in stack', () => {
    expect(panelPosition('branch-c', ['branch-a'])).toBe('after');
  });
});

describe('useRovingItem error outside provider', () => {
  test('useRovingItem throws outside RovingTabIndexProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useRovingItem('some-key'));
    }).toThrow('useRovingItem must be used within a RovingTabIndexProvider');

    spy.mockRestore();
  });
});

describe('useLastDistinctValue hook', () => {
  test('useLastDistinctValue returns undefined on first render', () => {
    const { result } = renderHook(() => useLastDistinctValue('a'));

    expect(result.current).toBeUndefined();
  });

  test('useLastDistinctValue returns previous value after change', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLastDistinctValue(value),
      { initialProps: { value: 'a' } }
    );

    expect(result.current).toBeUndefined();

    rerender({ value: 'b' });

    expect(result.current).toBe('a');
  });
});
