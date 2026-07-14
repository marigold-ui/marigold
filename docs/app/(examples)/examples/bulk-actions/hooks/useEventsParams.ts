import { type EventStatus, eventStatuses } from '@/lib/data/events';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs';
import { useSelection } from './useSelection';

// Search, status filter, and page all live in the URL (nuqs) so the view is
// shareable and survives reloads. Together they define the visible scope, and
// the selection is page-bounded: any change to scope must clear it
// (bulk-actions pattern, "Scope"). Each setter is wrapped so no call site can
// forget the reset — page owns the clearing, and search/status route through
// it by returning to page one.

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
