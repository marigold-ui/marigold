import { parseAsInteger, useQueryState } from 'nuqs';
import { useSelection } from './useSelection';

// The page is part of the visible scope, and the selection is page-bounded:
// changing the page must clear it (bulk-actions pattern, "Scope"). Wrapping
// the setter here means no call site can forget the reset — the same rule the
// search and status hooks funnel through.
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
