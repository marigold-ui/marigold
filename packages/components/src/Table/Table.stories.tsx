import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Stack } from '../Stack';
import { Table } from './Table';

export default {
  title: 'Components/Table',
  argTypes: {
    selectionMode: {
      control: {
        type: 'select',
      },
      options: ['none', 'single', 'multiple'],
      description: 'selection mode',
      defaultValue: 'none',
    },
    align: {
      control: {
        type: 'select',
      },
      options: ['left', 'right', 'center'],
      description: 'cell element alignment',

      defaultValue: 'left',
    },
    alignHeader: {
      control: {
        type: 'select',
      },
      options: ['left', 'right', 'center'],
      description: 'header element alignment',
      defaultValue: 'left',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Table> = args => (
  <Table aria-label="Table with selection" {...args}>
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
);

export const ControlledTable: ComponentStory<typeof Table> = args => {
  const columns = [
    { name: 'Name', key: 'name' },
    { name: 'Firstname', key: 'firstname' },
    { name: 'House', key: 'house' },
    { name: 'Year of birth', key: 'year' },
  ];

  const rows: { [key: string]: string }[] = [
    {
      id: '1',
      name: 'Potter',
      firstname: 'Harry',
      house: 'Gryffindor',
      year: '1980',
    },
    {
      id: '2',
      name: 'Malfoy',
      firstname: 'Draco',
      house: 'Slytherin',
      year: '1980',
    },
    {
      id: '3',
      name: 'Diggory',
      firstname: 'Cedric',
      house: 'Hufflepuff',
      year: '1977',
    },
    {
      id: '4',
      name: 'Lovegood',
      firstname: 'Luna',
      house: 'Ravenclaw',
      year: '1981',
    },
  ];

  const [selectedKeys, setSelectedKeys] = React.useState(new Set());
  return (
    <Stack space="small">
      <Table
        aria-label="Example dynamic collection table"
        {...args}
        onSelectionChange={key => setSelectedKeys(new Set(key))}
      >
        <Table.Header columns={columns}>
          {column => <Table.Column>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row>
              {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div>Selected rows: {selectedKeys}</div>
    </Stack>
  );
};
