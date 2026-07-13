import { CalendarDate, isSameDay } from '@internationalized/date';
import { vi } from 'vitest';
import {
  builtInDatePresets,
  builtInDateRangePresets,
  isSameRange,
} from './presets';

describe('built-in presets', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Wed Jul 8 2026, local time
    vi.setSystemTime(new Date(2026, 6, 8, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('today resolves to the current day', () => {
    const result = builtInDatePresets.today.resolve();

    expect(result).toEqual(new CalendarDate(2026, 7, 8));
  });

  test('yesterday resolves to the previous day', () => {
    const result = builtInDatePresets.yesterday.resolve();

    expect(result).toEqual(new CalendarDate(2026, 7, 7));
  });

  test('tomorrow resolves to the next day', () => {
    const result = builtInDatePresets.tomorrow.resolve();

    expect(result).toEqual(new CalendarDate(2026, 7, 9));
  });

  test('last-7-days spans 7 days ending today', () => {
    const range = builtInDateRangePresets['last-7-days'].resolve();

    expect(range).toEqual({
      start: new CalendarDate(2026, 7, 2),
      end: new CalendarDate(2026, 7, 8),
    });
  });

  test('last-30-days spans 30 days ending today', () => {
    const range = builtInDateRangePresets['last-30-days'].resolve();

    expect(range).toEqual({
      start: new CalendarDate(2026, 6, 9),
      end: new CalendarDate(2026, 7, 8),
    });
  });

  test('this-month spans the current calendar month', () => {
    const range = builtInDateRangePresets['this-month'].resolve();

    expect(range).toEqual({
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 31),
    });
  });

  test('every built-in has a message key', () => {
    const presets = [
      ...Object.values(builtInDatePresets),
      ...Object.values(builtInDateRangePresets),
    ];

    for (const preset of presets) {
      expect(preset.messageKey).toMatch(/^preset/);
    }
  });

  test.each(['today', 'yesterday', 'tomorrow'] as const)(
    '%s is a valid range preset resolving to a single-day range matching the day catalog',
    key => {
      const day = builtInDatePresets[key].resolve();

      const range = builtInDateRangePresets[key].resolve();

      expect(range).toEqual({ start: day, end: day });
    }
  );

  test.each(['today', 'yesterday', 'tomorrow'] as const)(
    '%s range preset shares its message key with the day catalog',
    key => {
      expect(builtInDateRangePresets[key].messageKey).toBe(
        builtInDatePresets[key].messageKey
      );
    }
  );
});

describe('isSameRange', () => {
  test('true for identical day ranges', () => {
    const a = {
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 8),
    };
    const b = {
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 8),
    };

    const result = isSameRange(a, b);

    expect(result).toBe(true);
  });

  test('false when an endpoint differs', () => {
    const a = {
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 8),
    };
    const b = {
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 9),
    };

    const result = isSameRange(a, b);

    expect(result).toBe(false);
  });
});

describe('handoff range presets', () => {
  const setToday = (year: number, month: number, day: number) => {
    vi.useFakeTimers();
    // Local noon avoids UTC/local date flips around midnight.
    vi.setSystemTime(new Date(year, month - 1, day, 12));
  };

  afterEach(() => {
    vi.useRealTimers();
  });

  test('this-week starts on Monday for de-DE', () => {
    setToday(2026, 7, 9); // Thursday

    const { start, end } =
      builtInDateRangePresets['this-week'].resolve('de-DE');

    expect(isSameDay(start, new CalendarDate(2026, 7, 6))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 7, 12))).toBe(true);
  });

  test('this-week starts on Sunday for en-US', () => {
    setToday(2026, 7, 9);

    const { start, end } =
      builtInDateRangePresets['this-week'].resolve('en-US');

    expect(isSameDay(start, new CalendarDate(2026, 7, 5))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 7, 11))).toBe(true);
  });

  test('next-7-days includes today', () => {
    setToday(2026, 7, 9);

    const { start, end } = builtInDateRangePresets['next-7-days'].resolve();

    expect(isSameDay(start, new CalendarDate(2026, 7, 9))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 7, 15))).toBe(true);
  });

  test('next-30-days includes today', () => {
    setToday(2026, 7, 9);

    const { start, end } = builtInDateRangePresets['next-30-days'].resolve();

    expect(isSameDay(start, new CalendarDate(2026, 7, 9))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 8, 7))).toBe(true);
  });

  test('this-quarter covers the calendar quarter of today', () => {
    setToday(2026, 7, 9);

    const { start, end } = builtInDateRangePresets['this-quarter'].resolve();

    expect(isSameDay(start, new CalendarDate(2026, 7, 1))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 9, 30))).toBe(true);
  });

  test('this-quarter at the year end resolves to Q4', () => {
    setToday(2026, 12, 31);

    const { start, end } = builtInDateRangePresets['this-quarter'].resolve();

    expect(isSameDay(start, new CalendarDate(2026, 10, 1))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 12, 31))).toBe(true);
  });

  test('this-quarter at the year start resolves to Q1', () => {
    setToday(2026, 1, 1);

    const { start, end } = builtInDateRangePresets['this-quarter'].resolve();

    expect(isSameDay(start, new CalendarDate(2026, 1, 1))).toBe(true);
    expect(isSameDay(end, new CalendarDate(2026, 3, 31))).toBe(true);
  });
});
