'use client';

import { Inline, Pagination, Select, Text } from '@marigold/components';

const PAGE_SIZE_OPTIONS = [5, 10, 25] as const;

export interface ReportsPaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const ReportsPagination = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: ReportsPaginationProps) => {
  if (totalItems === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
      <Text variant="muted" fontSize="sm">
        Anzeigen {from} – {to} von {totalItems}
      </Text>
      <Pagination
        page={page}
        totalItems={totalItems}
        pageSize={pageSize}
        onChange={onPageChange}
      />
      <Inline space="related" alignY="center" alignX="right">
        <Text id="reports-page-size" fontSize="sm">
          Pro Seite
        </Text>
        <Select
          aria-labelledby="reports-page-size"
          width={20}
          value={pageSize}
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
