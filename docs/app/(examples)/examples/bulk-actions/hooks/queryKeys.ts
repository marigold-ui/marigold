import type { EventQueryParams } from '@/lib/data/events-query';

// Centralized query-key factory.
//
// UI and hooks never write raw key strings; they go through this factory so a
// key shape only ever lives in one place. `list(params)` folds the active
// search/filter/pagination state AND the session payload into the key — a
// bulk action that changes records therefore changes the key, and the list
// refetches the right slice on its own.
// https://tkdodo.eu/blog/effective-react-query-keys
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (params: EventQueryParams) => [...eventKeys.lists(), params] as const,
};
