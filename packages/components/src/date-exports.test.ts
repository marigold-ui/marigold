import { describe, expect, it } from 'vitest';
import * as Marigold from './index';
import {
  CalendarDate,
  type DateDuration,
  type DateValue,
  Time,
  type TimeValue,
  parseDate,
  parseTime,
} from './index';

// The date values an app needs to pass to the date components, re-exported so
// it does not have to install `@internationalized/date` itself (DST-1994).
const values = [
  'CalendarDate',
  'CalendarDateTime',
  'Time',
  'ZonedDateTime',
  'fromDate',
  'getLocalTimeZone',
  'isSameDay',
  'isWeekend',
  'maxDate',
  'minDate',
  'now',
  'parseAbsoluteToLocal',
  'parseDate',
  'parseDateTime',
  'parseTime',
  'parseZonedDateTime',
  'toCalendarDate',
  'toCalendarDateTime',
  'toTime',
  'today',
] as const;

describe('date exports', () => {
  it.each(values)('exports %s', name => {
    expect(typeof Marigold[name]).toBe('function');
  });

  it('parses into the exported classes and types', () => {
    const date: DateValue = parseDate('2026-11-26');
    const time: TimeValue = parseTime('09:30');
    const week: DateDuration = { weeks: 1 };

    expect(date).toBeInstanceOf(CalendarDate);
    expect(time).toBeInstanceOf(Time);
    expect(date.add(week).toString()).toBe('2026-12-03');
  });
});
