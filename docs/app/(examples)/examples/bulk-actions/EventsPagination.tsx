'use client';

import { Inline, Pagination, Text } from '@marigold/components';
import { EVENTS_REGION_ID } from './EventsTable';
import { useEvents } from './hooks/useEvents';
import { usePagination } from './hooks/useEventsParams';

export const EventsPagination = () => {
  const { safePage, pageSize, totalItems, totalPages } = useEvents();
  const [, setPage] = usePagination();

  if (totalItems === 0) return null;

  // `setPage` is the wrapped setter from usePagination: it clears the
  // selection along with changing the page, keeping the selection bounded to
  // what the user can see.
  const onPageChange = (next: number) => {
    setPage(next);
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    document.getElementById(EVENTS_REGION_ID)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const from = (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalItems);

  return (
    <Inline alignX="between" alignY="center" space={6}>
      <Text variant="muted" fontSize="sm">
        Showing {from}–{to} of {totalItems}
      </Text>
      <Pagination
        key={totalPages}
        page={safePage}
        totalItems={totalItems}
        pageSize={pageSize}
        onChange={onPageChange}
      />
    </Inline>
  );
};
