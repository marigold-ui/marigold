'use client';

import { useState } from 'react';
import {
  Inline,
  Pagination,
  PaginationProps,
  Select,
  Split,
  Stack,
  Table,
  TableProps,
  Text,
} from '@marigold/components';

export default (paginationProps: PaginationProps, tableProps: TableProps) => {
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const mockData: User[] = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'Admin' : 'User',
    status: i % 4 === 0 ? 'inactive' : 'active',
  }));

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, mockData.length);
  const currentData = mockData.slice(startIndex, endIndex);

  return (
    <Stack alignX="left" space={2}>
      <Table aria-label="label" stretch {...tableProps}>
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>Name</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body items={currentData}>
          {item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div className="w-full">
        <Inline alignY="center">
          <Text fontSize="sm">
            Showing {startIndex + 1} - {endIndex} of {mockData.length}
          </Text>
          <Split />
          <Pagination
            {...paginationProps}
            totalItems={mockData.length}
            pageSize={pageSize}
            page={currentPage}
            onChange={setCurrentPage}
          />
          <Split />
          <Inline alignY="center" space={4}>
            <Text fontSize="sm">Results per page</Text>
            <Select
              width={'fit'}
              value={pageSize.toString()}
              onChange={val => setPageSize(parseInt(`${val}`))}
            >
              <Select.Option id="10">10</Select.Option>
              <Select.Option id="20">20</Select.Option>
              <Select.Option id="30">30</Select.Option>
            </Select>
          </Inline>
        </Inline>
      </div>
    </Stack>
  );
};
