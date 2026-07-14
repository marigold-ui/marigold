import { describe, expect, it } from 'vitest';
import { events } from './events';
import { type EventsSession, authorizeBulk, queryEvents } from './events-query';

const emptySession: EventsSession = { overrides: {}, deleted: [] };

describe('queryEvents', () => {
  it('returns the full dataset with pageSize=all', () => {
    const result = queryEvents({ pageSize: 'all' });
    expect(result.totalItems).toBe(events.length);
    expect(result.items).toHaveLength(events.length);
  });

  it('paginates and clamps the page', () => {
    const result = queryEvents({ page: 999, pageSize: 10 });
    expect(result.safePage).toBe(result.totalPages);
    expect(result.items.length).toBeGreaterThan(0);
  });

  it('searches name and venue', () => {
    const byName = queryEvents({ q: 'jazz night', pageSize: 'all' });
    expect(byName.totalItems).toBeGreaterThan(0);

    const byVenue = queryEvents({ q: 'jazzhaus', pageSize: 'all' });
    expect(byVenue.items.every(event => event.venue === 'Jazzhaus')).toBe(true);
  });

  it('filters by status', () => {
    const result = queryEvents({ status: 'Draft', pageSize: 'all' });
    expect(result.totalItems).toBeGreaterThan(0);
    expect(result.items.every(event => event.status === 'Draft')).toBe(true);
  });

  it('applies session overrides before filtering', () => {
    const draft = events.find(event => event.status === 'Draft')!;
    const session: EventsSession = {
      ...emptySession,
      overrides: { [draft.id]: { status: 'On sale' } },
    };

    const onSale = queryEvents({ status: 'On sale', pageSize: 'all', session });
    expect(onSale.items.some(event => event.id === draft.id)).toBe(true);
  });

  it('removes session-deleted events', () => {
    const id = events[0].id;
    const session: EventsSession = { ...emptySession, deleted: [id] };

    const result = queryEvents({ pageSize: 'all', session });
    expect(result.totalItems).toBe(events.length - 1);
    expect(result.items.some(event => event.id === id)).toBe(false);
  });
});

describe('authorizeBulk', () => {
  const withVenue = events.find(event => event.venue !== null)!;
  const withoutVenue = events.find(event => event.venue === null)!;

  it('splits publish into succeeded and failed by venue', () => {
    const result = authorizeBulk('publish', [withVenue.id, withoutVenue.id]);
    expect(result.succeeded).toEqual([withVenue.id]);
    expect(result.failed).toEqual([
      { id: withoutVenue.id, reason: 'No venue assigned' },
    ]);
  });

  it('lets publish pass once the session assigned a venue', () => {
    const session: EventsSession = {
      ...emptySession,
      overrides: { [withoutVenue.id]: { venue: 'Jazzhaus' } },
    };

    const result = authorizeBulk('publish', [withoutVenue.id], session);
    expect(result.succeeded).toEqual([withoutVenue.id]);
    expect(result.failed).toEqual([]);
  });

  it('rejects unknown and session-deleted ids', () => {
    const session: EventsSession = {
      ...emptySession,
      deleted: [withVenue.id],
    };

    const result = authorizeBulk('archive', ['nope', withVenue.id], session);
    expect(result.succeeded).toEqual([]);
    expect(result.failed).toHaveLength(2);
  });

  it('authorizes non-publish actions regardless of venue', () => {
    const result = authorizeBulk('archive', [withoutVenue.id]);
    expect(result.succeeded).toEqual([withoutVenue.id]);
  });
});
