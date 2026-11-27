'use client';

import { Inline, Pagination, Select, Split, Text } from '@marigold/components';
import { VENUES_REGION_ID } from './VenuesTable';
import { usePagination } from './hooks/usePagination';
import { useVenues } from './hooks/useVenues';

const PAGE_SIZE_OPTIONS = [5, 10, 25] as const;

export const VenuesPagination = () => {
  const { safePage, pageSize, totalItems, totalPages } = useVenues();
  const [, setPagination] = usePagination();

  if (totalItems === 0) return null;

  const onPageChange = (next: number) => {
    setPagination({ page: next });
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    document.getElementById(VENUES_REGION_ID)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const from = (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalItems);
  return (
    <Inline alignY="center">
      <Text variant="muted" fontSize="sm">
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
      <Inline space="related" alignY="center">
        <Text id="page-size" fontSize="sm">
          Results per page
        </Text>
        <Select
          aria-labelledby="page-size"
          width={20}
          selectedKey={pageSize}
          onChange={key => setPagination({ pageSize: Number(key), page: null })}
        >
          {PAGE_SIZE_OPTIONS.map(size => (
            <Select.Option key={size} id={size}>
              {size}
            </Select.Option>
          ))}
        </Select>
      </Inline>
    </Inline>
  );
};
