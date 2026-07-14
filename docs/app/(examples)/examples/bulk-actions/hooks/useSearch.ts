import { parseAsString, useQueryState } from 'nuqs';
import { usePagination } from './usePagination';

export const useSearch = () => {
  const [, setPage] = usePagination();
  const [search, setSearchState] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ history: 'push' })
  );

  // A new search changes the visible scope: back to page one, selection
  // cleared — the wrapped page setter (usePagination) handles both. Trim and
  // treat empty as "no search" so the URL never carries q="".
  const setSearch = (next: string) => {
    setPage(null);
    return setSearchState(next.trim() || null);
  };

  return [search, setSearch] as const;
};
