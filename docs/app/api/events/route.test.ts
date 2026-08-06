import { events } from '@/lib/data/events';
import type { EventQueryResult } from '@/lib/data/events-query';
import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

const get = async (query: string): Promise<EventQueryResult> => {
  const response = await GET(
    new NextRequest(`http://localhost/api/events${query}`)
  );
  return response.json();
};

describe('GET /api/events', () => {
  it('returns the full dataset with pageSize=all', async () => {
    const body = await get('?pageSize=all');
    expect(body.totalItems).toBe(events.length);
    expect(body.items).toHaveLength(events.length);
  });

  it('paginates with the default page size', async () => {
    const body = await get('?page=1');
    expect(body.items).toHaveLength(10);
    expect(body.safePage).toBe(1);
  });

  it('filters by status', async () => {
    const body = await get('?pageSize=all&status=Draft');
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items.every(event => event.status === 'Draft')).toBe(true);
  });

  it('applies the session payload', async () => {
    const id = events[0].id;
    const session = JSON.stringify({ overrides: {}, deleted: [id] });
    const body = await get(
      `?pageSize=all&session=${encodeURIComponent(session)}`
    );
    expect(body.totalItems).toBe(events.length - 1);
    expect(body.items.some(event => event.id === id)).toBe(false);
  });

  it('ignores a malformed session payload', async () => {
    const body = await get('?pageSize=all&session=not-json');
    expect(body.totalItems).toBe(events.length);
  });
});
