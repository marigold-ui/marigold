import type { VenueQueryParams } from '@/lib/data/venues-query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { venueKeys } from './queryKeys';
import { useDeletedVenues } from './useDeletedVenues';
import { useFilter } from './useFilter';
import { usePagination } from './usePagination';
import { useSearch } from './useSearch';
import { useSort } from './useSort';
import { fetchVenues } from './venuesApi';

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
  const { filter, hasFilter } = useFilter();
  const [sort] = useSort();
  const [{ page, pageSize }] = usePagination();
  const { excludedIds } = useDeletedVenues();

  const params: VenueQueryParams = {
    q: search || undefined,
    capacity: filter.capacity,
    price: filter.price,
    rating: filter.rating,
    traits: filter.traits,
    column: sort.column,
    direction: sort.direction,
    page,
    pageSize,
    exclude: excludedIds,
  };

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
    // `params` lets imperative actions (e.g. "export all matching") re-run the
    // same query with a different page size.
    params,
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
