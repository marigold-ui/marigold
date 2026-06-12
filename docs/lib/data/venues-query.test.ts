import { describe, expect, it } from 'vitest';
import { venues } from './venues';
import { queryVenues } from './venues-query';

const TOTAL = venues.length;

describe('queryVenues', () => {
  it('paginates with a default page size', () => {
    const result = queryVenues();
    expect(result.totalItems).toBe(TOTAL);
    expect(result.pageSize).toBe(5);
    expect(result.totalPages).toBe(Math.ceil(TOTAL / 5));
    expect(result.items).toHaveLength(Math.min(5, TOTAL));
    expect(result.safePage).toBe(1);
  });

  it('returns the requested page', () => {
    const page2 = queryVenues({ page: 2, pageSize: 5 });
    expect(page2.safePage).toBe(2);
    expect(page2.items).toHaveLength(Math.max(0, TOTAL - 5));
    // No overlap with page 1.
    const page1Ids = queryVenues({ page: 1, pageSize: 5 }).items.map(v => v.id);
    expect(page2.items.every(v => !page1Ids.includes(v.id))).toBe(true);
  });

  it('clamps an out-of-range page to the last page', () => {
    const result = queryVenues({ page: 999, pageSize: 5 });
    expect(result.safePage).toBe(result.totalPages);
  });

  it('returns everything for pageSize "all"', () => {
    const result = queryVenues({ pageSize: 'all' });
    expect(result.items).toHaveLength(TOTAL);
    expect(result.totalPages).toBe(1);
  });

  it('excludes ids before anything else', () => {
    const id = venues[0].id;
    const result = queryVenues({ pageSize: 'all', exclude: [id] });
    expect(result.totalItems).toBe(TOTAL - 1);
    expect(result.items.some(v => v.id === id)).toBe(false);
  });

  it('searches by name, case-insensitively', () => {
    const term = venues[0].name.split(' ')[0];
    const result = queryVenues({ pageSize: 'all', q: term.toLowerCase() });
    expect(result.items.length).toBeGreaterThan(0);
    expect(
      result.items.every(v => v.name.toLowerCase().includes(term.toLowerCase()))
    ).toBe(true);
  });

  it('filters by minimum capacity', () => {
    const threshold = venues[Math.floor(TOTAL / 2)].capacity;
    const result = queryVenues({ pageSize: 'all', capacity: threshold });
    const expected = venues.filter(v => v.capacity >= threshold).length;
    expect(result.totalItems).toBe(expected);
    expect(result.items.every(v => v.capacity >= threshold)).toBe(true);
  });

  it('filters by matching at least one trait', () => {
    const trait: string = venues[0].traits[0];
    const hasTrait = (traits: readonly string[]) =>
      traits.some(t => t === trait);
    const result = queryVenues({ pageSize: 'all', traits: [trait] });
    expect(result.items.every(v => hasTrait(v.traits))).toBe(true);
    expect(result.totalItems).toBe(
      venues.filter(v => hasTrait(v.traits)).length
    );
  });

  it('sorts by capacity in both directions', () => {
    const asc = queryVenues({
      pageSize: 'all',
      column: 'capacity',
      direction: 'ascending',
    }).items.map(v => v.capacity);
    const desc = queryVenues({
      pageSize: 'all',
      column: 'capacity',
      direction: 'descending',
    }).items.map(v => v.capacity);

    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    expect(desc).toEqual([...asc].reverse());
  });
});
