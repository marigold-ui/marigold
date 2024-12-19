import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  FieldGroup,
  Inline,
  Select,
  Split,
  Stack,
  Table,
  Text,
} from '@marigold/components';
import { Pagination, PaginationProps } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  argTypes: {
    totalItems: {
      control: {
        type: 'number',
      },
      description: 'The number of total items.',
    },
    pageSize: {
      control: {
        type: 'number',
      },
      description: 'The number of items per page.',
    },
    controlLabels: {
      control: 'object',
      description: 'Labels for the pagination controls.',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: 'e.g. ["Previous", "Next"]' },
      },
    },
  },
  args: {
    totalItems: 100,
    pageSize: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ totalItems, pageSize, ...rest }: Partial<PaginationProps>) => (
    <Pagination
      {...rest}
      totalItems={totalItems!}
      pageSize={pageSize!}
      defaultPage={5}
    />
  ),
};

export const Controlled: Story = {
  render: ({ totalItems, pageSize, ...rest }: Partial<PaginationProps>) => {
    const [basicPage, setBasicPage] = useState(1);

    return (
      <div>
        <h1>Pagination Example</h1>
        <p>Selected Page: {basicPage}</p>
        <Pagination
          {...rest}
          totalItems={totalItems!}
          pageSize={pageSize!}
          page={basicPage}
          onChange={setBasicPage}
        />
      </div>
    );
  },
};

export const OnePage: Story = {
  parameters: {
    controls: { exclude: ['totalItems', 'pageSize'] },
  },
  render: args => <Pagination {...args} totalItems={10} pageSize={10} />,
};

export const OneHundredPages: Story = {
  render: ({ pageSize, ...rest }: Partial<PaginationProps>) => (
    <Pagination
      {...rest}
      totalItems={1000}
      pageSize={pageSize!}
      defaultPage={93}
    />
  ),
};

export const NoData: Story = {
  parameters: {
    controls: { exclude: ['totalItems', 'pageSize'] },
  },
  render: args => <Pagination {...args} totalItems={0} pageSize={10} />,
};

export const FullScreenSize: Story = {
  render: ({ pageSize, ...rest }: Partial<PaginationProps>) => (
    <div className="w-[900px]">
      <Inline alignY="center">
        <Text fontSize="sm">Showing "visible results" of "total results"</Text>
        <Split />
        <Pagination
          {...rest}
          totalItems={1000}
          defaultPage={93}
          pageSize={pageSize!}
        />
        <Split />
        <FieldGroup labelWidth="100px">
          <Select
            width={40}
            aria-label="Page size"
            defaultSelectedKey="10"
            label="Results per page"
          >
            <Select.Option id="10">10</Select.Option>
            <Select.Option id="20">20</Select.Option>
            <Select.Option id="30">30</Select.Option>
          </Select>
        </FieldGroup>
      </Inline>
    </div>
  ),
};

export const WithTable: Story = {
  parameters: {
    controls: { exclude: ['totalItems', 'pageSize'] },
  },
  render: args => {
    interface User {
      id: number;
      name: string;
      email: string;
      role: string;
      status: 'active' | 'inactive';
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const mockData: User[] = Array.from({ length: 55 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : 'User',
      status: i % 4 === 0 ? 'inactive' : 'active',
    }));

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = mockData.slice(startIndex, endIndex);

    return (
      <div className="w-[800px]">
        <Stack alignX="left" space={4}>
          <Table aria-label="label" stretch {...args}>
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
          <Inline alignY="center" space={4}>
            <Text fontSize="sm">
              Showing {startIndex + 1} - {endIndex} of {mockData.length}
            </Text>
            <Split />
            <Pagination
              {...args}
              totalItems={mockData.length}
              pageSize={pageSize}
              page={currentPage}
              onChange={setCurrentPage}
            />
            <Split />
            <FieldGroup labelWidth="100px">
              <Select
                width={40}
                label="Results per page"
                selectedKey={pageSize.toString()}
                onChange={val => setPageSize(parseInt(val.toString()))}
              >
                <Select.Option id="10">10</Select.Option>
                <Select.Option id="20">20</Select.Option>
                <Select.Option id={'30'}>30</Select.Option>
              </Select>
            </FieldGroup>
          </Inline>
        </Stack>
      </div>
    );
  },
};

export const WithButtonLabels: Story = {
  parameters: {
    controls: { exclude: ['totalItems', 'pageSize'] },
  },
  render: ({ pageSize, ...rest }: Partial<PaginationProps>) => (
    <Pagination
      {...rest}
      totalItems={100}
      pageSize={pageSize!}
      page={5}
      controlLabels={['Previous', 'Next']}
    />
  ),
};
