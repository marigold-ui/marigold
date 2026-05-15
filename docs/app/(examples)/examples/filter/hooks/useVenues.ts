import { venues } from '@/lib/data/venues';
import type { Venue } from '@/lib/data/venues';
import { MAX_PRICE, type VenueFilter, useFilter } from './useFilter';
import { usePagination } from './usePagination';
import { useSearch } from './useSearch';
import { type VenueSortDescriptor, useSort } from './useSort';

// Helpers
// ---------------
const matchesSearch = (venue: Venue, search: string) =>
  venue.name.toLowerCase().includes(search.toLowerCase().trim());

const filterVenues = (list: readonly Venue[], filter: VenueFilter) =>
  list.filter(venue => {
    // Each line short-circuits on the field's "no filter" sentinel.
    if (filter.capacity > 0 && venue.capacity < filter.capacity) return false;
    if (filter.price < MAX_PRICE && venue.price.to > filter.price) return false;
    if (filter.rating > 0 && venue.rating < filter.rating) return false;
    if (
      filter.traits.length > 0 &&
      !venue.traits.some(vt => filter.traits.includes(vt))
    ) {
      return false;
    }
    return true;
  });

// `sortVenues` copies its input so callers can pass readonly arrays safely;
// don't spread again at the call site.
const sortVenues = (list: readonly Venue[], sort: VenueSortDescriptor) => {
  const dir = sort.direction === 'ascending' ? 1 : -1;
  return [...list].sort((a, b) => {
    if (sort.column === 'price') return dir * (a.price.to - b.price.to);
    if (sort.column === 'capacity') return dir * (a.capacity - b.capacity);
    return dir * a.name.localeCompare(b.name);
  });
};

// Hook
// ---------------
// Reads URL state and produces the search/filter/sort/paginate pipeline.
// Safe to call from multiple components — nuqs deduplicates URL subscriptions,
// and the static dataset makes recomputation negligible.
export const useVenues = () => {
  const [search] = useSearch();
  const { filter, hasFilter } = useFilter();
  const [sort] = useSort();
  const [{ page, pageSize }] = usePagination();

  const searched = search
    ? venues.filter(v => matchesSearch(v, search))
    : venues;
  const filtered = filterVenues(searched, filter);
  const display = sortVenues(filtered, sort);

  const totalItems = display.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = display.slice((safePage - 1) * pageSize, safePage * pageSize);

  const isFiltered = search.length > 0 || hasFilter();

  return {
    display,
    paged,
    totalItems,
    totalPages,
    safePage,
    pageSize,
    isFiltered,
  } as const;
};
