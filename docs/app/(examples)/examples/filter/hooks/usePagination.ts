import { parseAsInteger, useQueryStates } from 'nuqs';

// Small default page size keeps pagination engaged on the static 10-row demo
// dataset. Real apps typically default to 25 or 50.
export const usePagination = () =>
  useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(5),
    },
    { history: 'push' }
  );
