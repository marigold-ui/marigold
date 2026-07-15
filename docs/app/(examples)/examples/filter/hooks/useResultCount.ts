import type { VenueQueryParams } from '@/lib/data/venues-query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { venueKeys } from './queryKeys';
import { useDeletedVenues } from './useDeletedVenues';
import { type FilterFormData, formToFilter, useFilter } from './useFilter';
import { useSearch } from './useSearch';
import { fetchVenues } from './venuesApi';

// Debounce keyed by content, so a NumberField being typed into only fires
// one count query instead of one per keystroke.
const useDebouncedValue = <T>(value: T, ms: number): T => {
  const [debounced, setDebounced] = useState(value);
  const serialized = JSON.stringify(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(JSON.parse(serialized)), ms);
    return () => clearTimeout(timeout);
  }, [serialized, ms]);

  return debounced;
};

/**
 * Live result count for the drawer's draft filter state, so the Apply button
 * can preview the outcome ("Show 4 results") before the user commits.
 *
 * Runs the same query as the list with `pageSize: 1`, we only read
 * `totalItems`. Returns `undefined` until the first count arrives.
 */
export const useResultCount = (
  draft: FilterFormData | null,
  enabled: boolean
) => {
  const [search] = useSearch();
  const { filter } = useFilter();
  const { excludedIds } = useDeletedVenues();

  // No draft yet (drawer just opened): preview the currently applied filter.
  const draftFilter = useDebouncedValue(
    draft ? formToFilter(draft) : filter,
    300
  );

  const params: VenueQueryParams = {
    q: search || undefined,
    ...draftFilter,
    pageSize: 1,
    exclude: excludedIds,
  };

  const { data } = useQuery({
    queryKey: venueKeys.count(params),
    queryFn: () => fetchVenues(params),
    enabled,
    placeholderData: keepPreviousData,
  });

  return data?.totalItems;
};
