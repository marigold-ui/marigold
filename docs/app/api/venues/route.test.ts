import { venues } from '@/lib/data/venues';
import type { VenueQueryResult } from '@/lib/data/venues-query';
import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

const get = async (query: string): Promise<VenueQueryResult> => {
  const response = await GET(
    new NextRequest(`http://localhost/api/venues${query}`)
  );
  return response.json();
};

describe('GET /api/venues', () => {
  it('returns the full dataset with pageSize=all', async () => {
    const body = await get('?pageSize=all');
    expect(body.totalItems).toBe(venues.length);
    expect(body.items).toHaveLength(venues.length);
  });

  it('paginates', async () => {
    const body = await get('?page=1&pageSize=5');
    expect(body.items).toHaveLength(Math.min(5, venues.length));
    expect(body.safePage).toBe(1);
  });

  it('honors exclude', async () => {
    const id = venues[0].id;
    const body = await get(`?pageSize=all&exclude=${id}`);
    expect(body.totalItems).toBe(venues.length - 1);
    expect(body.items.some(v => v.id === id)).toBe(false);
  });

  it('honors search', async () => {
    const term = venues[0].name.split(' ')[0];
    const body = await get(`?pageSize=all&q=${encodeURIComponent(term)}`);
    expect(body.items.length).toBeGreaterThan(0);
    expect(
      body.items.every(v => v.name.toLowerCase().includes(term.toLowerCase()))
    ).toBe(true);
  });
});
