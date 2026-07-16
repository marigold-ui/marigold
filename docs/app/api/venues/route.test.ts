import { venues } from '@/lib/data/venues';
import type { VenueFacets, VenueQueryResult } from '@/lib/data/venues-query';
import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

const get = async (
  query: string
): Promise<VenueQueryResult & { facets?: VenueFacets }> => {
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

  it('filters by type (match any)', async () => {
    const body = await get('?pageSize=all&types=0&types=2');
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items.every(v => [0, 2].includes(v.type))).toBe(true);
  });

  // Widens the per-venue literal array types so `.includes` accepts any number.
  const has = (list: readonly number[], value: number) => list.includes(value);

  it('filters by amenities (must offer all)', async () => {
    const body = await get('?pageSize=all&amenities=0&amenities=6');
    expect(
      body.items.every(v => has(v.amenities, 0) && has(v.amenities, 6))
    ).toBe(true);
  });

  it('filters by parking and seating (match any)', async () => {
    const body = await get('?pageSize=all&parking=0&seating=1');
    expect(
      body.items.every(v => has(v.parking, 0) && has(v.seatingTypes, 1))
    ).toBe(true);
  });

  it('ignores non-numeric option indexes', async () => {
    const body = await get('?pageSize=all&types=abc');
    expect(body.totalItems).toBe(venues.length);
  });

  it('omits facets unless requested', async () => {
    const body = await get('?pageSize=all');
    expect(body.facets).toBeUndefined();
  });

  it('returns plain frequencies as facets when nothing is filtered', async () => {
    const body = await get('?pageSize=all&facets=true');
    const expected = venues.filter(v => v.type === 0).length;
    expect(body.facets?.types[0]).toBe(expected);
  });

  it('facet counts ignore their own dimension (match any)', async () => {
    // With type 0 selected, the count for type 1 must stay unaffected.
    const body = await get('?pageSize=all&facets=true&types=0');
    const expected = venues.filter(v => v.type === 1).length;
    expect(body.facets?.types[1]).toBe(expected);
  });

  it('facet counts apply the other dimensions', async () => {
    // Type counts respect the rating filter, and vice versa.
    const body = await get('?pageSize=all&facets=true&rating=4');
    const expected = venues.filter(v => v.type === 0 && v.rating >= 4).length;
    expect(body.facets?.types[0]).toBe(expected);
  });

  it('amenity facet counts preview adding the option (match all)', async () => {
    // With amenity 0 required, the count for amenity 1 previews requiring both.
    const body = await get('?pageSize=all&facets=true&amenities=0');
    const expected = venues.filter(
      v => has(v.amenities, 0) && has(v.amenities, 1)
    ).length;
    expect(body.facets?.amenities[1]).toBe(expected);
  });

  it('rating facet counts ignore the rating filter itself', async () => {
    const body = await get('?pageSize=all&facets=true&rating=5');
    const expected = venues.filter(v => v.rating >= 3).length;
    expect(body.facets?.rating[3]).toBe(expected);
  });
});
