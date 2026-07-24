import { MAX_PRICE, type Venue, venues } from './venues';

// Shared, server-importable query logic for the venues dataset.
//
// This module is the single source of truth for how venues are searched,
// filtered, sorted and paginated. It is imported by the stateless route
// handler (app/api/venues) AND used as the contract the client mirrors in its
// query keys. Keeping it pure (no React, no I/O) means the same code can run on
// the server and be unit-tested in isolation.

export type VenueSortColumn = 'name' | 'capacity' | 'price';
export type VenueSortDirection = 'ascending' | 'descending';

export interface VenueQueryParams {
  /** Free-text search, matched against the venue name. */
  q?: string;
  /** Minimum capacity. `0` (the default) means "no capacity filter". */
  capacity?: number;
  /** Maximum price. `MAX_PRICE` (the default) means "no price filter". */
  price?: number;
  /** Minimum rating. `0` (the default) means "no rating filter". */
  rating?: number;
  /** Venue must carry at least one of these traits. `[]` means "no filter". */
  traits?: string[];
  column?: VenueSortColumn;
  direction?: VenueSortDirection;
  /** 1-based page. */
  page?: number;
  /** Page size, or `'all'` to skip pagination (used by the CSV export). */
  pageSize?: number | 'all';
  /**
   * Venue ids to remove before anything else runs. The client owns this set
   * (see useDeletedVenues) so deletions stay per-visitor and the server keeps
   * no state of its own.
   */
  exclude?: string[];
}

export interface VenueQueryResult {
  items: Venue[];
  totalItems: number;
  totalPages: number;
  safePage: number;
  pageSize: number;
}

const compareVenues = (
  a: Venue,
  b: Venue,
  column: VenueSortColumn,
  direction: VenueSortDirection
) => {
  const dir = direction === 'ascending' ? 1 : -1;
  if (column === 'price') return dir * (a.price.to - b.price.to);
  if (column === 'capacity') return dir * (a.capacity - b.capacity);
  return dir * a.name.localeCompare(b.name);
};

const DEFAULT_PAGE_SIZE = 5;

/**
 * Pure search → filter → sort → paginate pipeline over the static venue
 * fixture. Deterministic and side-effect free, so it can run on the server and
 * be unit-tested directly.
 */
export const queryVenues = (
  params: VenueQueryParams = {}
): VenueQueryResult => {
  const {
    q = '',
    capacity = 0,
    price = MAX_PRICE,
    rating = 0,
    traits = [],
    column = 'name',
    direction = 'ascending',
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    exclude = [],
  } = params;

  const excluded = new Set(exclude);
  const search = q.trim().toLowerCase();

  // Each line short-circuits on the field's "no filter" default value.
  const filtered = venues.filter(venue => {
    if (excluded.has(venue.id)) return false;
    if (search && !venue.name.toLowerCase().includes(search)) return false;
    if (capacity > 0 && venue.capacity < capacity) return false;
    if (price < MAX_PRICE && venue.price.to > price) return false;
    if (rating > 0 && venue.rating < rating) return false;
    if (traits.length > 0 && !venue.traits.some(t => traits.includes(t))) {
      return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) =>
    compareVenues(a, b, column, direction)
  );
  const totalItems = sorted.length;

  if (pageSize === 'all') {
    return {
      items: sorted,
      totalItems,
      totalPages: 1,
      safePage: 1,
      pageSize: totalItems,
    };
  }

  const size = pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const items = sorted.slice((safePage - 1) * size, safePage * size);

  return { items, totalItems, totalPages, safePage, pageSize: size };
};

/**
 * The single venue id this demo refuses to delete, so the DELETE route has a
 * realistic "server says no" path to drive the error/rollback/toast example.
 */
export const PROTECTED_VENUE_ID = '1';
