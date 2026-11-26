import { describe, expect, it } from 'vitest';
import { asOfToday, events } from './events';

describe('asOfToday', () => {
  const first = events[0];

  it('keeps the written dates on the day they were written for', () => {
    expect(asOfToday(first, new Date('2026-06-02T08:00:00Z')).date).toBe(
      first.date
    );
  });

  it('moves every date by the days since then', () => {
    const shifted = asOfToday(first, new Date('2026-06-12T23:30:00Z'));
    const days =
      (Date.parse(shifted.date) - Date.parse(first.date)) /
      (24 * 60 * 60 * 1000);
    expect(days).toBe(10);
  });

  it('keeps the rest of the event as it is', () => {
    const { date: _date, ...rest } = asOfToday(first, new Date('2027-01-01'));
    const { date: _original, ...original } = first;
    expect(rest).toEqual(original);
  });
});
