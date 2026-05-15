import { parseAsString, useQueryState } from 'nuqs';
import { usePagination } from './usePagination';

export const useSearch = () => {
  const [, setPage] = usePagination();
  const [search, _setSearch] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ history: 'push' })
  );

  const setSearch = (next: string | null) => {
    setPage(null);
    return _setSearch(next);
  };

  return [search, setSearch] as const;
};
