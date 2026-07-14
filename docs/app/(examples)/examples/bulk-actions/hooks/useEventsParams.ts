import { type EventStatus, eventStatuses } from '@/lib/data/events';
import { DEFAULT_PAGE_SIZE } from '@/lib/data/events-query';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs';
import { useSelection } from './useSelection';

// Search, status filter, page, and page size all live in the URL (nuqs) so
// the view is shareable and survives reloads. Together they define the
// visible scope, and the selection is page-bounded: any change to scope must
// clear it (bulk-actions pattern, "Scope"). Each setter is wrapped so no call
// site can forget the reset — page owns the clearing, and the other setters
// route through it by returning to page one.

export const usePagination = () => {
  const { clearSelection } = useSelection();
  const [page, setPageState] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ history: 'push' })
  );

  const setPage = (next: number | null) => {
    clearSelection();
    return setPageState(next);
  };

  return [page, setPage] as const;
};

export const usePageSize = () => {
  const [, setPage] = usePagination();
  const [pageSize, setPageSizeState] = useQueryState(
    'pageSize',
    parseAsInteger
      .withDefault(DEFAULT_PAGE_SIZE)
      .withOptions({ history: 'push' })
  );

  // A new page size reshuffles which rows land on every page, so it is a
  // scope change like the others. The default stays out of the URL.
  const setPageSize = (next: number) => {
    setPage(null);
    return setPageSizeState(next === DEFAULT_PAGE_SIZE ? null : next);
  };

  return [pageSize, setPageSize] as const;
};

export const useSearch = () => {
  const [, setPage] = usePagination();
  const [search, setSearchState] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ history: 'push' })
  );

  // Trim and treat empty as "no search" so the URL never carries q="".
  const setSearch = (next: string) => {
    setPage(null);
    return setSearchState(next.trim() || null);
  };

  return [search, setSearch] as const;
};

export const useStatusFilter = () => {
  const [, setPage] = usePagination();
  const [status, setStatusState] = useQueryState(
    'status',
    parseAsStringLiteral(eventStatuses).withOptions({ history: 'push' })
  );

  const setStatus = (next: EventStatus | null) => {
    setPage(null);
    return setStatusState(next);
  };

  return [status, setStatus] as const;
};
