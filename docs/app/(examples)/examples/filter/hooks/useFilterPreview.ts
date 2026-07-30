import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { venueKeys } from './queryKeys';
import { useDeletedVenues } from './useDeletedVenues';
import { type FilterFormData, formToFilter, useFilter } from './useFilter';
import { useSearch } from './useSearch';
import { type FetchVenuesParams, fetchVenues } from './venuesApi';

// Debounce keyed by content, so a NumberField being typed into only fires
// one preview query instead of one per keystroke.
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
 * Live preview of the drawer's draft filter state, from one debounced query:
 * the total result count for the Apply button ("Show 4 results") and the
 * per-option facet counts shown next to the panel's options.
 *
 * Runs the same query as the list with `pageSize: 1` and `facets: true`.
 * Both values are `undefined` until the first preview arrives.
 */
export const useFilterPreview = (
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

  const params: FetchVenuesParams = {
    q: search || undefined,
    ...draftFilter,
    pageSize: 1,
    exclude: excludedIds,
    facets: true,
  };

  const { data } = useQuery({
    queryKey: venueKeys.preview(params),
    queryFn: () => fetchVenues(params),
    enabled,
    placeholderData: keepPreviousData,
  });

  return { resultCount: data?.totalItems, facets: data?.facets };
};
