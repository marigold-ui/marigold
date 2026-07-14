'use client';

import { Inline, Pagination, Select, Split, Text } from '@marigold/components';
import { EVENTS_REGION_ID } from './EventsTable';
import { useEvents } from './hooks/useEvents';
import { usePageSize, usePagination } from './hooks/useEventsParams';

// The composition the Pagination docs prescribe: the results indicator on
// the left, the pager centered, and the quantity selector on the right,
// using the default text strings ("Showing X - Y of Z", "Results per page").
export const EventsPagination = () => {
  const { safePage, pageSize, totalItems, totalPages } = useEvents();
  const [, setPage] = usePagination();
  const [, setPageSize] = usePageSize();

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
    <Inline alignY="center">
      <Text fontSize="sm">
        Showing {from} - {to} of {totalItems}
      </Text>
      <Split />
      <Pagination
        key={totalPages}
        page={safePage}
        totalItems={totalItems}
        pageSize={pageSize}
        onChange={onPageChange}
      />
      <Split />
      <Inline alignY="center" space={4}>
        <Text fontSize="sm">Results per page</Text>
        <Select
          width={20}
          aria-label="Results per page"
          value={String(pageSize)}
          onChange={next => setPageSize(Number(next))}
        >
          <Select.Option id="10">10</Select.Option>
          <Select.Option id="20">20</Select.Option>
          <Select.Option id="30">30</Select.Option>
        </Select>
      </Inline>
    </Inline>
  );
};
