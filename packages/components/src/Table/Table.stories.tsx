import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import {
  Cell,
  Column,
  Row,
  Stack,
  Table,
  TableBody,
  TableHeader,
} from '@marigold/components';

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
    <TableHeader>
      <Column>Name</Column>
      <Column>Firstname</Column>
      <Column>House</Column>
      <Column>Year of birth</Column>
    </TableHeader>
    <TableBody>
      <Row key={1}>
        <Cell>Potter</Cell>
        <Cell>Harry</Cell>
        <Cell>Gryffindor</Cell>
        <Cell>1980</Cell>
      </Row>
      <Row key={2}>
        <Cell>Malfoy</Cell>
        <Cell>Draco</Cell>
        <Cell>Slytherin</Cell>
        <Cell>1980</Cell>
      </Row>
      <Row key={3}>
        <Cell>Diggory</Cell>
        <Cell>Cedric</Cell>
        <Cell>Hufflepuff</Cell>
        <Cell>1977</Cell>
      </Row>
      <Row key={4}>
        <Cell>Lovegood</Cell>
        <Cell>Luna</Cell>
        <Cell>Ravenclaw</Cell>
        <Cell>1981</Cell>
      </Row>
    </TableBody>
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
        <TableHeader columns={columns}>
          {column => <Column>{column.name}</Column>}
        </TableHeader>
        <TableBody items={rows}>
          {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
        </TableBody>
      </Table>
      <div>Selected rows: {selectedKeys}</div>
    </Stack>
  );
};
