import type { VenueQueryParams } from '@/lib/data/venues-query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { venueKeys } from './queryKeys';
import { useDeletedVenues } from './useDeletedVenues';
import { useFilter } from './useFilter';
import { usePagination } from './usePagination';
import { useSearch } from './useSearch';
import { useSort } from './useSort';
import { fetchVenues } from './venuesApi';

// The query params derived from the URL state, without fetching. Imperative
// actions outside the table's error boundary (the export in the filter bar)
// use this to re-run the same query without subscribing to its errors.
export const useVenueParams = (): VenueQueryParams => {
  const [search] = useSearch();
  const { filter } = useFilter();
  const [sort] = useSort();
  const [{ page, pageSize }] = usePagination();
  const { excludedIds } = useDeletedVenues();

  return {
    q: search || undefined,
    capacity: filter.capacity,
    price: filter.price,
    rating: filter.rating,
    traits: filter.traits,
    types: filter.types,
    city: filter.city,
    available: filter.available,
    amenities: filter.amenities,
    parking: filter.parking,
    seating: filter.seating,
    column: sort.column,
    direction: sort.direction,
    page,
    pageSize,
    exclude: excludedIds,
  };
};

// Encapsulates the venues list query. Components call `useVenues()` and stay
// presentational — they never see fetch, query keys, or URL parsing. The query
// key is derived from the live URL (nuqs) state plus the client-owned
// `excludedIds`, so any change refetches the right slice and background
// refetches/cache updates always target the correct entry.
//
// Safe to call from multiple components (table, pagination): react-query
// deduplicates identical keys, so they share one request and one cache entry.
export const useVenues = () => {
  const [search] = useSearch();
  const { hasFilter } = useFilter();
  const [{ pageSize }] = usePagination();
  const params = useVenueParams();

  const query = useQuery({
    queryKey: venueKeys.list(params),
    queryFn: () => fetchVenues(params),
    // Keep showing the previous page while the next one loads so filtering and
    // paging never flash an empty table.
    placeholderData: keepPreviousData,
    // Surface fetch failures to the nearest error boundary (see page.tsx)
    // instead of handling them inline in every consumer.
    throwOnError: true,
  });

  const result = query.data;
  const isFiltered = search.length > 0 || hasFilter();

  return {
    items: result?.items ?? [],
    totalItems: result?.totalItems ?? 0,
    totalPages: result?.totalPages ?? 1,
    safePage: result?.safePage ?? 1,
    pageSize: result?.pageSize ?? pageSize,
    isFiltered,
    // `isLoading` is the initial fetch only (no data yet). Background refetches
    // keep `data` and flip `isFetching` — surfaced globally by FetchingIndicator.
    isLoading: query.isLoading,
  } as const;
};
