import { describe, expect, it } from 'vitest';
import { daysAgo, daysBetween, daysFromNow, monthsAgo } from './dates';

const now = new Date('2026-11-26T23:30:00Z');

describe('dates', () => {
  it('anchors days at 12:00 UTC of the current UTC day', () => {
    expect(daysAgo(0, now).toISOString()).toBe('2026-11-26T12:00:00.000Z');
    expect(daysAgo(3, now).toISOString()).toBe('2026-11-23T12:00:00.000Z');
    expect(daysFromNow(10, now).toISOString()).toBe('2026-12-06T12:00:00.000Z');
  });

  it('returns the first of the month, across a year boundary', () => {
    expect(monthsAgo(0, now).toISOString()).toBe('2026-11-01T12:00:00.000Z');
    expect(monthsAgo(11, now).toISOString()).toBe('2025-12-01T12:00:00.000Z');
  });

  it('counts whole calendar days between two dates', () => {
    expect(daysBetween(new Date('2026-06-02T12:00:00Z'), now)).toBe(177);
  });
});
