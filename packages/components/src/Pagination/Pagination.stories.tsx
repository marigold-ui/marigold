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
  render: args => (
    <div className="w-[450px]">
      <Stack alignX="left">
        <Table aria-label="label" stretch {...args}>
          <Table.Header>
            <Table.Column>Name</Table.Column>
            <Table.Column>Firstname</Table.Column>
            <Table.Column>House</Table.Column>
            <Table.Column>Year of birth</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key={1}>
              <Table.Cell>Potter</Table.Cell>
              <Table.Cell>Harry</Table.Cell>
              <Table.Cell>Gryffindor</Table.Cell>
              <Table.Cell>1980</Table.Cell>
            </Table.Row>
            <Table.Row key={2}>
              <Table.Cell>Malfoy</Table.Cell>
              <Table.Cell>Draco</Table.Cell>
              <Table.Cell>Slytherin</Table.Cell>
              <Table.Cell>1980</Table.Cell>
            </Table.Row>
            <Table.Row key={3}>
              <Table.Cell>Diggory</Table.Cell>
              <Table.Cell>Cedric</Table.Cell>
              <Table.Cell>Hufflepuff</Table.Cell>
              <Table.Cell>1977</Table.Cell>
            </Table.Row>
            <Table.Row key={4}>
              <Table.Cell>Lovegood</Table.Cell>
              <Table.Cell>Luna</Table.Cell>
              <Table.Cell>Ravenclaw</Table.Cell>
              <Table.Cell>1981</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Inline alignY="center">
          <Text fontSize="sm">Showing 1-10 of 10 pages</Text>
          <Split />
          <Pagination
            {...args}
            totalItems={100}
            pageSize={10}
            defaultPage={1}
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
  ),
};
