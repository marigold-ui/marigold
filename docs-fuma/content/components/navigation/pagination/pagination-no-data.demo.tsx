'use client';

import {
  Inline,
  Pagination,
  PaginationProps,
  Select,
  Split,
  Text,
} from '@marigold/components';

export default (paginationProps: PaginationProps) => (
  <div className="w-full">
    <Inline alignY="center">
      <Text>Showing 0 of 0</Text>
      <Split />
      <Pagination {...paginationProps} totalItems={20} pageSize={5} />
      <Split />
      <Inline alignY="center" space={4}>
        <Text fontSize="sm">Results per page</Text>
        <Select width={'fit'} aria-label="Page size" defaultSelectedKey="5">
          <Select.Option id="5">5</Select.Option>
          <Select.Option id="10">10</Select.Option>
        </Select>
      </Inline>
    </Inline>
  </div>
);
