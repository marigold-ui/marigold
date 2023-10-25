/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SortDescriptor } from '@react-types/shared';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Select } from '../Select';
import { Stack } from '../Stack';
import { Table } from './Table';

const meta = {
  title: 'Components/Table',
  argTypes: {
    selectionMode: {
      control: {
        type: 'select',
      },
      options: ['none', 'single', 'multiple'],
      description: 'selection mode',
    },
    focusMode: {
      control: {
        type: 'select',
      },
      options: ['row', 'cell'],
      description: 'Focus Mode with Keyboard',
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'row' },
      },
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      description: 'Stretch to fill the container',
    },
    variant: {
      control: {
        type: 'text',
      },
      description: 'variant for the table: for example: compact',
    },
  },
  args: {
    focusMode: 'row',
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Table aria-label="Table with selection" {...args}>
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Firstname</Table.Column>
        <Table.Column>House</Table.Column>
        <Table.Column width="full">Year of birth</Table.Column>
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
  ),
};

export const ControlledTable: Story = {
  render: args => {
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
    const [selectedKeys, setSelectedKeys] = useState(new Set());
    const selected = Array.from(selectedKeys);
    return (
      <Stack space={3}>
        <Table
          aria-label="Example dynamic collection table"
          selectionMode="multiple"
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
        <div>Selected rows: {selected.join(', ')}</div>
      </Stack>
    );
  },
};

// https://react-spectrum.adobe.com/react-aria/useTable.html#nested-columns
export const NestedColumns: Story = {
  render: () => {
    const columns = [
      {
        name: 'Name',
        key: 'name',
        children: [
          { name: 'First Name', key: 'first', isRowHeader: true },
          { name: 'Last Name', key: 'last', isRowHeader: true },
        ],
      },
      {
        name: 'Information',
        key: 'info',
        children: [
          { name: 'Age', key: 'age' },
          { name: 'Birthday', key: 'birthday' },
        ],
      },
    ];

    const rows = [
      { id: 1, first: 'Sam', last: 'Smith', age: 36, birthday: 'May 3' },
      {
        id: 2,
        first: 'Julia',
        last: 'Jones',
        age: 24,
        birthday: 'February 10',
      },
      {
        id: 3,
        first: 'Peter',
        last: 'Parker',
        age: 28,
        birthday: 'September 7',
      },
      {
        id: 4,
        first: 'Bruce',
        last: 'Wayne',
        age: 32,
        birthday: 'December 18',
      },
    ];
    return (
      <Table aria-label="Example table with dynamic nested columns">
        <Table.Header columns={columns}>
          {column => (
            <Table.Column
              isRowHeader={column.isRowHeader}
              childColumns={column.children}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row>
              {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  },
};

export const Sorting: Story = {
  render: () => {
    const data = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
      },
      {
        name: 'C-3PO',
        height: '167',
        mass: '75',
        birth_year: '112BBY',
      },
      {
        name: 'R2-D2',
        height: '96',
        mass: '32',
        birth_year: '33BBY',
      },
      {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        birth_year: '41.9BBY',
      },
      {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        birth_year: '19BBY',
      },
      {
        name: 'Owen Lars',
        height: '178',
        mass: '120',
        birth_year: '52BBY',
      },
      {
        name: 'Beru Whitesun lars',
        height: '165',
        mass: '75',
        birth_year: '47BBY',
      },
      {
        name: 'R5-D4',
        height: '97',
        mass: '32',
        birth_year: 'unknown',
      },
      {
        name: 'Biggs Darklighter',
        height: '183',
        mass: '84',
        birth_year: '24BBY',
      },
      {
        name: 'Obi-Wan Kenobi',
        height: '182',
        mass: '77',
        birth_year: '57BBY',
      },
    ];
    const [list, setList] = useState(data);
    const [descriptor, setDescriptor] = useState<SortDescriptor>({});
    const sort = ({ column, direction }: SortDescriptor) => {
      const result = list.sort((a: any, b: any) => {
        const first = a[column!];
        const second = b[column!];
        let cmp =
          (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
        if (direction === 'descending') {
          cmp *= -1;
        }
        return cmp;
      });
      setDescriptor({ column, direction });
      setList(result);
    };

    return (
      <>
        <Table
          aria-label="Example table with client side sorting"
          sortDescriptor={descriptor}
          onSortChange={sort}
          selectionMode="multiple"
        >
          <Table.Header>
            <Table.Column key="name" allowsSorting>
              Name
            </Table.Column>
            <Table.Column key="height" allowsSorting>
              Height
            </Table.Column>
            <Table.Column key="mass" allowsSorting>
              Mass
            </Table.Column>
            <Table.Column key="birth_year" allowsSorting>
              Birth Year
            </Table.Column>
          </Table.Header>
          <Table.Body items={list}>
            {item => (
              <Table.Row key={item.name}>
                {columnKey => (
                  <Table.Cell>{(item as any)[columnKey]}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <br />
        <pre>
          Sort: {descriptor.column} / {descriptor.direction}
        </pre>
      </>
    );
  },
};

export const Compact: Story = {
  render: () => (
    <Table
      aria-label="Table with multiple selection"
      selectionMode="multiple"
      variant="compact"
    >
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
  ),
};

export const Expanded: Story = {
  render: () => (
    <Table
      aria-label="Table with multiple selection"
      selectionMode="multiple"
      variant="expanded"
    >
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
  ),
};

export const Static: Story = {
  render: () => (
    <Table aria-label="Table without interaction" selectionMode="none">
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
  ),
};

const columns = [
  { name: 'Name', key: 'name' },
  { name: 'Firstname', key: 'firstname' },
  { name: 'House', key: 'house' },
  { name: 'Year of birth', key: 'year' },
  { name: 'Bearbeiten', key: 'edit' },
];

const rows = [
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
] as const;

const DataTable = ({ editable }: { editable: boolean }) => (
  <Table aria-label="Data Table">
    <Table.Header columns={columns}>
      {col => <Table.Column>{col.name}</Table.Column>}
    </Table.Header>
    <Table.Body items={rows}>
      {rows.map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.firstname}</Table.Cell>
          <Table.Cell>{item.house}</Table.Cell>
          <Table.Cell>{item.year}</Table.Cell>
          <Table.Cell>
            <Button variant="ghost" disabled={!editable}>
              Bearbeiten
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export const WithParentProp: Story = {
  render: () => {
    const [editable, setEditable] = React.useState(true);

    return (
      <Stack>
        <Checkbox checked={editable} onChange={setEditable}>
          Allow editing
        </Checkbox>
        <DataTable editable={editable} />
      </Stack>
    );
  },
};

export const SelectedTable: Story = {
  render: () => (
    <Table aria-label="Data Table">
      <Table.Header columns={columns}>
        {col => <Table.Column>{col.name}</Table.Column>}
      </Table.Header>
      <Table.Body items={rows}>
        {rows.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.firstname}</Table.Cell>
            <Table.Cell>{item.house}</Table.Cell>
            <Table.Cell>{item.year}</Table.Cell>
            <Table.Cell>
              <Select disabledKeys={['Firefly']}>
                <Select.Option key="Harry Potter">Harry Potter</Select.Option>
                <Select.Option key="Lord of the Rings">
                  Lord of the Rings
                </Select.Option>
                <Select.Option key="Star Wars">Star Wars</Select.Option>
                <Select.Option key="Star Trek">Star Trek</Select.Option>
                <Select.Option key="Firefly">Firefly</Select.Option>
              </Select>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};
