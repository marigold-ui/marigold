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
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  argTypes: {},
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Pagination {...args} totalItems={100} pageSize={10} page={5} />
  ),
};

export const Controlled: Story = {
  render: args => {
    const [basicPage, setBasicPage] = useState(1);

    return (
      <div>
        <h1>Pagination Example</h1>
        <p>Selected Page: {basicPage}</p>
        <Pagination
          {...args}
          page={basicPage}
          totalItems={100}
          pageSize={10}
          onChange={setBasicPage}
        />
      </div>
    );
  },
};

export const OnePage: Story = {
  render: args => <Pagination {...args} totalItems={10} pageSize={10} />,
};

export const OneHundredPages: Story = {
  render: args => (
    <Pagination {...args} totalItems={1000} pageSize={10} defaultPage={93} />
  ),
};

export const NoData: Story = {
  render: args => <Pagination {...args} totalItems={0} pageSize={10} />,
};

export const FullScreenSize: Story = {
  render: args => (
    <Inline alignY="center">
      <Text fontSize="sm">Showing 93 of 100</Text>
      <Split />
      <Pagination {...args} totalItems={1000} pageSize={10} defaultPage={93} />
      <Split />
      <Select width={16} aria-label="Page size" defaultSelectedKey="10">
        <Select.Option id="10">10</Select.Option>
        <Select.Option id="20">20</Select.Option>
        <Select.Option id="30">30</Select.Option>
      </Select>
    </Inline>
  ),
};

export const WithTable: Story = {
  render: args => {
    interface User {
      id: number;
      name: string;
      email: string;
      role: string;
      status: 'active' | 'inactive';
    }

    const [currentPage, setCurrentPage] = useState(1);

    const mockData: User[] = Array.from({ length: 55 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : 'User',
      status: i % 4 === 0 ? 'inactive' : 'active',
    }));

    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = mockData.slice(startIndex, endIndex);
    console.log(currentData);

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
              Showing {startIndex + 1} - {endIndex} of{' '}
              {Math.ceil(mockData.length / pageSize)} pages
            </Text>
            <Split />
            <Pagination
              {...args}
              totalItems={mockData.length}
              pageSize={10}
              page={currentPage}
              onChange={setCurrentPage}
            />
            <Split />
            <FieldGroup labelWidth="60px">
              <Select width={28} label="Page size" defaultSelectedKey="10">
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
