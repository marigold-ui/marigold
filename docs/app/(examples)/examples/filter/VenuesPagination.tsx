'use client';

import { Inline, Pagination, Select, Text } from '@marigold/components';
import { usePagination } from './hooks/usePagination';
import { useVenues } from './hooks/useVenues';

const PAGE_SIZE_OPTIONS = [5, 10, 25] as const;

// Anchor that onPageChange scrolls back to so users land on the first row
// of the new page. VenuesTable sets the matching id on its wrapper.
export const VENUES_REGION_ID = 'venues-region';

const getFromTo = (page: number, pageSize: number, total: number) => {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return { from, to };
};

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

  const onPageSizeChange = (next: number) =>
    setPagination({ pageSize: next, page: null });

  const { from, to } = getFromTo(safePage, pageSize, totalItems);
  const summary = `Showing ${from}–${to} of ${totalItems}`;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
      <Text variant="muted" fontSize="sm">
        {summary}
      </Text>
      <Pagination
        key={totalPages}
        page={safePage}
        totalItems={totalItems}
        pageSize={pageSize}
        onChange={onPageChange}
      />
      <Inline space={2} alignY="center" alignX="right">
        <Text id="page-size" fontSize="sm">
          Results per page
        </Text>
        <Select
          aria-labelledby="page-size"
          width={20}
          selectedKey={pageSize}
          onChange={key => onPageSizeChange(Number(key))}
        >
          {PAGE_SIZE_OPTIONS.map(size => (
            <Select.Option key={size} id={size}>
              {size}
            </Select.Option>
          ))}
        </Select>
      </Inline>
    </div>
  );
};
