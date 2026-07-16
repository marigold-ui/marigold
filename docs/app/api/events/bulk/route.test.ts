import { events } from '@/lib/data/events';
import type { BulkResult } from '@/lib/data/events-query';
import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

const post = async (body: unknown) =>
  POST(
    new NextRequest('http://localhost/api/events/bulk', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  );

const withVenue = events.find(event => event.venue !== null)!;
const withoutVenue = events.find(event => event.venue === null)!;

describe('POST /api/events/bulk', () => {
  it('splits publish into succeeded and failed', async () => {
    const response = await post({
      action: 'publish',
      ids: [withVenue.id, withoutVenue.id],
    });
    const body: BulkResult = await response.json();

    expect(response.status).toBe(200);
    expect(body.succeeded).toEqual([withVenue.id]);
    expect(body.failed).toEqual([
      { id: withoutVenue.id, reason: 'No venue assigned' },
    ]);
  });

  it('honors the session overlay when authorizing', async () => {
    const response = await post({
      action: 'publish',
      ids: [withoutVenue.id],
      session: {
        overrides: { [withoutVenue.id]: { venue: 'Jazzhaus' } },
        deleted: [],
      },
    });
    const body: BulkResult = await response.json();

    expect(body.succeeded).toEqual([withoutVenue.id]);
    expect(body.failed).toEqual([]);
  });

  it('rejects an invalid body', async () => {
    const response = await post({ action: 'explode', ids: [] });
    expect(response.status).toBe(400);
  });
});
