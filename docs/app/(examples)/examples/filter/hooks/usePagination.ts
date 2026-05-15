import { parseAsInteger, useQueryState } from 'nuqs';

// Small page size keeps pagination engaged on the static 10-row demo dataset.
// Real apps typically use 25 or 50.
export const PAGE_SIZE = 5;

export const usePagination = () =>
  useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ history: 'push' })
  );
