import type { VenueQueryParams } from '@/lib/data/venues-query';

// Centralized query-key factory.
//
// UI and hooks never write raw key strings; they go through this factory so a
// key shape only ever lives in one place. `list(params)` folds the active
// filter/sort/pagination/exclude state into the key, which is what makes
// background refetches and cache updates land on the right entry.
// https://tkdodo.eu/blog/effective-react-query-keys
export const venueKeys = {
  all: ['venues'] as const,
  lists: () => [...venueKeys.all, 'list'] as const,
  list: (params: VenueQueryParams) => [...venueKeys.lists(), params] as const,
  previews: () => [...venueKeys.all, 'preview'] as const,
  preview: (params: VenueQueryParams) =>
    [...venueKeys.previews(), params] as const,
};
