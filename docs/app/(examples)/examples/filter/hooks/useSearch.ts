import { parseAsString, useQueryState } from 'nuqs';
import { usePagination } from './usePagination';

export const useSearch = () => {
  const [, setPagination] = usePagination();
  const [search, _setSearch] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ history: 'push' })
  );

  // Trim and treat empty as "no search" so the URL never carries q="" or
  // whitespace-only values.
  const setSearch = (next: string) => {
    setPagination({ page: null });
    return _setSearch(next.trim() || null);
  };

  return [search, setSearch] as const;
};
