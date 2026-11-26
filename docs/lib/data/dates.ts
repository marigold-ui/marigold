// Dates for the mock data, relative to today. Every date is anchored at 12:00
// UTC, so the server and the browser land on the same calendar day in every
// time zone from UTC-12 to UTC+11.

export const DAY = 24 * 60 * 60 * 1000;

const todayUtc = (now: Date) =>
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

export const daysAgo = (days: number, now = new Date()) =>
  new Date(todayUtc(now) + 12 * 60 * 60 * 1000 - days * DAY);

export const daysFromNow = (days: number, now = new Date()) =>
  daysAgo(-days, now);

/** The first day of the month, `months` months before the current one. */
export const monthsAgo = (months: number, now = new Date()) =>
  new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - months, 1, 12));

/** Whole days between the UTC calendar day of `from` and of `to`. */
export const daysBetween = (from: Date, to: Date) =>
  Math.round((todayUtc(to) - todayUtc(from)) / DAY);
