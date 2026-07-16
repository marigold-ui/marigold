import type { EventQueryParams } from '@/lib/data/events-query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchEvents } from './eventsApi';
import { eventKeys } from './queryKeys';
import {
  usePageSize,
  usePagination,
  useSearch,
  useStatusFilter,
} from './useEventsParams';
import { useSession } from './useSession';

// Encapsulates the events list query. Components call `useEvents()` and stay
// presentational — they never see fetch, query keys, or URL parsing. The
// query key derives from the live URL (nuqs) state plus the client-owned
// session payload, so a bulk action that changes records automatically
// refetches the right slice — no manual invalidation anywhere.
//
// Safe to call from multiple components (table, action bar, pagination):
// react-query deduplicates identical keys, so they share one request.
export const useEvents = () => {
  const [search] = useSearch();
  const [status] = useStatusFilter();
  const [page] = usePagination();
  const [pageSize] = usePageSize();
  const { session, hasChanges } = useSession();

  const params: EventQueryParams = {
    q: search || undefined,
    status: status ?? undefined,
    page,
    pageSize,
    session: hasChanges ? session : undefined,
  };

  const query = useQuery({
    queryKey: eventKeys.list(params),
    queryFn: () => fetchEvents(params),
    // Keep showing the previous page while the next one loads so filtering and
    // paging never flash an empty table.
    placeholderData: keepPreviousData,
    // Surface fetch failures to the nearest error boundary (see page.tsx)
    // instead of handling them inline in every consumer.
    throwOnError: true,
  });

  const result = query.data;
  const isFiltered = search.length > 0 || status !== null;

  return {
    items: result?.items ?? [],
    totalItems: result?.totalItems ?? 0,
    totalPages: result?.totalPages ?? 1,
    safePage: result?.safePage ?? 1,
    // Fall back to the URL value so the initial-load skeleton already
    // mirrors the page size the response will have.
    pageSize: result?.pageSize ?? pageSize,
    isFiltered,
    // `isLoading` is the initial fetch only (no data yet). Background refetches
    // keep `data` and flip `isFetching` — surfaced globally by FetchingIndicator.
    isLoading: query.isLoading,
  } as const;
};
