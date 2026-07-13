import { CalendarDate, isSameDay } from '@internationalized/date';
import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect, test, vi } from 'vitest';
import { useDatePresets, useDateRangePresets } from './usePresets';

const wrapper =
  (locale: string) =>
  ({ children }: { children: ReactNode }) => (
    <I18nProvider locale={locale}>{children}</I18nProvider>
  );

// Hoisted `as const` (readonly) arrays are the natural way to share a preset
// list; the hooks and `presets` props must keep accepting them.
const rangePresets = ['last-7-days', 'this-month'] as const;

test('resolves built-in keys to localized labels (de-DE)', () => {
  const { result } = renderHook(() => useDateRangePresets(rangePresets), {
    wrapper: wrapper('de-DE'),
  });

  expect(result.current.map(p => p.label)).toEqual([
    'Letzte 7 Tage',
    'Dieser Monat',
  ]);
  expect(result.current[0].id).toBe('last-7-days');
});

test('resolves built-in keys to localized labels (en-US)', () => {
  const { result } = renderHook(() => useDatePresets(['today', 'yesterday']), {
    wrapper: wrapper('en-US'),
  });

  expect(result.current.map(p => p.label)).toEqual(['Today', 'Yesterday']);
});

test('normalizes custom presets with static values', () => {
  const value = new CalendarDate(2026, 7, 1);

  const { result } = renderHook(
    () => useDatePresets([{ label: 'Season start', value }]),
    { wrapper: wrapper('en-US') }
  );

  expect(result.current[0].id).toBe('Season start');
  expect(result.current[0].label).toBe('Season start');
  expect(result.current[0].resolve()).toEqual(value);
});

test('normalizes custom presets with resolver functions and explicit id', () => {
  const range = {
    start: new CalendarDate(2026, 7, 1),
    end: new CalendarDate(2026, 7, 14),
  };

  const { result } = renderHook(
    () =>
      useDateRangePresets([
        { id: 'festival', label: 'Festival', value: () => range },
      ]),
    { wrapper: wrapper('en-US') }
  );

  expect(result.current[0].id).toBe('festival');
  expect(result.current[0].resolve()).toEqual(range);
});

test('labels the handoff range presets (en-US)', () => {
  const { result } = renderHook(
    () =>
      useDateRangePresets([
        'this-week',
        'next-7-days',
        'next-30-days',
        'this-quarter',
      ]),
    { wrapper: wrapper('en-US') }
  );

  expect(result.current.map(preset => preset.label)).toEqual([
    'This week',
    'Next 7 days',
    'Next 30 days',
    'This quarter',
  ]);
});

test('resolves this-week with the active locale (de-DE starts Monday)', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 6, 9, 12)); // Thursday, Jul 9 2026

  try {
    const { result } = renderHook(() => useDateRangePresets(['this-week']), {
      wrapper: wrapper('de-DE'),
    });
    const { start, end } = result.current[0].resolve();

    expect(isSameDay(start, new CalendarDate(2026, 7, 6))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 7, 12))).toBe(true);
  } finally {
    vi.useRealTimers();
  }
});
