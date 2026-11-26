import { people } from '@/lib/data/people';
import type { Person } from '@/lib/data/people';

// The one fictional customer every example belongs to. Riverside Events GmbH
// is invented, like everything it owns: the venues in `lib/data/venues.ts`, the
// staff in `lib/data/people.ts`, and the figures below. Domains use the
// reserved `example.com`.

// Organisation
// ---------------
export const organisation = {
  name: 'Riverside Events GmbH',
  plan: 'Team',
  seats: 25,
  // A demo value in the German format, not a real VAT ID.
  vatId: 'DE 123 456 789',
  domain: 'example.com',
} as const;

// Signed-in user
// ---------------
// One of the staff, so the person in the top bar also shows up in Users.
const findCurrentUser = (): Person => {
  const person = people.find(({ id }) => id === 'soundcheck');
  if (!person) {
    throw new Error('demo-data: the signed-in user is missing from people.ts');
  }
  return person;
};

export const currentUser = findCurrentUser();

// User status
// ---------------
// One label and badge variant per status, so no page prints the raw lowercase
// value. Colour only where it carries meaning (ADR-0009).
export const userStatus = {
  active: { label: 'Active', variant: 'success' },
  invited: { label: 'Invited', variant: 'info' },
  suspended: { label: 'Suspended', variant: 'error' },
} as const;

// Dates relative to today
// ---------------
// The helpers live in `lib/data/dates.ts`, shared with the events fixture. Call
// them while rendering, not at module level: the examples layout renders per
// request (`dynamic = 'force-dynamic'`), so "today" is never the build day.
export { daysAgo, daysFromNow, monthsAgo } from '@/lib/data/dates';

// Business figures
// ---------------
// One set of numbers for the current month, shared by Dashboard and Analytics
// so the two pages agree.

// Tickets sold this month per venue, keyed by the ids in `lib/data/venues.ts`.
// The values add up to `ticketsSold` below.
export const ticketsSoldByVenue: Record<string, number> = {
  '4': 2480,
  '10': 1960,
  '1': 1310,
  '6': 1120,
  '5': 740,
  '8': 520,
  '2': 160,
  '7': 120,
  '3': 80,
  '9': 50,
};

export const businessNumbers = {
  ticketsSold: Object.values(ticketsSoldByVenue).reduce((a, b) => a + b, 0),
  revenue: 214_300,
  eventsOnSale: 24,
} as const;
