import {
  endOfMonth,
  endOfWeek,
  getLocalTimeZone,
  isSameDay,
  startOfMonth,
  startOfWeek,
  today,
} from '@internationalized/date';
import type { DateValue } from 'react-aria-components/Calendar';

// Types
// ---------------
export interface DateRange {
  start: DateValue;
  end: DateValue;
}

export type BuiltInDatePresetKey = 'today' | 'yesterday' | 'tomorrow';

// Day presets are also valid range presets: they resolve to a single-day
// range (start === end === the day), see `builtInDateRangePresets` below.
export type BuiltInDateRangePresetKey =
  | BuiltInDatePresetKey
  | 'this-week'
  | 'next-7-days'
  | 'next-30-days'
  | 'last-7-days'
  | 'last-30-days'
  | 'this-month'
  | 'this-quarter';

export interface CustomDatePreset {
  /**
   * Identifier used to key the preset. Defaults to the label.
   */
  id?: string;
  label: string;
  /**
   * The date the preset selects. Pass a function to resolve the value at
   * selection time, so relative presets stay correct in long-lived views.
   */
  value: DateValue | (() => DateValue);
}

export interface CustomDateRangePreset {
  /**
   * Identifier used to key the preset. Defaults to the label.
   */
  id?: string;
  label: string;
  /**
   * The range the preset selects. Pass a function to resolve the value at
   * selection time, so relative presets stay correct in long-lived views.
   */
  value: DateRange | (() => DateRange);
}

export type DatePreset = BuiltInDatePresetKey | CustomDatePreset;
export type DateRangePreset = BuiltInDateRangePresetKey | CustomDateRangePreset;

// Built-in presets
// ---------------
interface BuiltInPreset<T> {
  messageKey: string;
  /**
   * Built-in resolvers receive the active locale so week-based presets can
   * respect the locale's first day of the week. Falls back to `en-US`, the
   * repo's fallback message locale.
   */
  resolve: (locale?: string) => T;
}

export const builtInDatePresets: Record<
  BuiltInDatePresetKey,
  BuiltInPreset<DateValue>
> = {
  today: {
    messageKey: 'presetToday',
    resolve: () => today(getLocalTimeZone()),
  },
  yesterday: {
    messageKey: 'presetYesterday',
    resolve: () => today(getLocalTimeZone()).subtract({ days: 1 }),
  },
  tomorrow: {
    messageKey: 'presetTomorrow',
    resolve: () => today(getLocalTimeZone()).add({ days: 1 }),
  },
};

// A single day is a range whose start and end are that same day. Derived
// from `builtInDatePresets` so the date math and message keys have one
// source of truth.
const toDayRangePreset = (
  day: BuiltInPreset<DateValue>
): BuiltInPreset<DateRange> => ({
  messageKey: day.messageKey,
  resolve: () => {
    const value = day.resolve();
    return { start: value, end: value };
  },
});

// "Last N days" includes today: start = today - (N - 1), end = today.
export const builtInDateRangePresets: Record<
  BuiltInDateRangePresetKey,
  BuiltInPreset<DateRange>
> = {
  today: toDayRangePreset(builtInDatePresets.today),
  yesterday: toDayRangePreset(builtInDatePresets.yesterday),
  tomorrow: toDayRangePreset(builtInDatePresets.tomorrow),
  'this-week': {
    messageKey: 'presetThisWeek',
    resolve: (locale = 'en-US') => {
      const now = today(getLocalTimeZone());
      return { start: startOfWeek(now, locale), end: endOfWeek(now, locale) };
    },
  },
  'next-7-days': {
    messageKey: 'presetNext7Days',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: now, end: now.add({ days: 6 }) };
    },
  },
  'next-30-days': {
    messageKey: 'presetNext30Days',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: now, end: now.add({ days: 29 }) };
    },
  },
  'last-7-days': {
    messageKey: 'presetLast7Days',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: now.subtract({ days: 6 }), end: now };
    },
  },
  'last-30-days': {
    messageKey: 'presetLast30Days',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: now.subtract({ days: 29 }), end: now };
    },
  },
  'this-month': {
    messageKey: 'presetThisMonth',
    resolve: () => {
      const now = today(getLocalTimeZone());
      return { start: startOfMonth(now), end: endOfMonth(now) };
    },
  },
  'this-quarter': {
    messageKey: 'presetThisQuarter',
    resolve: () => {
      const now = today(getLocalTimeZone());
      // Calendar quarters: Jan–Mar, Apr–Jun, Jul–Sep, Oct–Dec.
      const start = now.set({
        month: now.month - ((now.month - 1) % 3),
        day: 1,
      });
      return { start, end: endOfMonth(start.add({ months: 2 })) };
    },
  },
};

// Helpers
// ---------------
export const isSameRange = (a: DateRange, b: DateRange) =>
  isSameDay(a.start, b.start) && isSameDay(a.end, b.end);

export const isOutOfBounds = (
  range: DateRange,
  minValue?: DateValue | null,
  maxValue?: DateValue | null
) =>
  Boolean(
    (minValue && range.start.compare(minValue) < 0) ||
    (maxValue && range.end.compare(maxValue) > 0)
  );
