import { type EventStatus, eventStatuses } from '@/lib/data/events';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { usePagination } from './usePagination';

export const useStatusFilter = () => {
  const [, setPage] = usePagination();
  const [status, setStatusState] = useQueryState(
    'status',
    parseAsStringLiteral(eventStatuses).withOptions({ history: 'push' })
  );

  // A changed filter changes the visible scope: back to page one, selection
  // cleared — the wrapped page setter (usePagination) handles both.
  const setStatus = (next: EventStatus | null) => {
    setPage(null);
    return setStatusState(next);
  };

  return [status, setStatus] as const;
};
