/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';

import { SortDescriptor } from '@react-types/shared';

import { TextArea } from '@marigold/components';

import { Button } from '../Button';
import { Center } from '../Center';
import { Checkbox } from '../Checkbox';
import { Scrollable } from '../Scrollable';
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
    stickyHeader: {
      control: {
        type: 'boolean',
      },
      description: 'stick the header to the top of the table',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['none', 'grid', 'linedTable'],
      description: 'variant for the table',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['compact', 'expanded'],
      description: 'size for the table: for example: compact',
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
    <Table aria-label="label" {...args}>
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
  render: () => (
    <Table aria-label="Example table for nested columns">
      <Table.Header>
        <Table.Column title="Name">
          <Table.Column isRowHeader>First Name</Table.Column>
          <Table.Column isRowHeader>Last Name</Table.Column>
        </Table.Column>
        <Table.Column title="Information">
          <Table.Column>Age</Table.Column>
          <Table.Column>Birthday</Table.Column>
        </Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Sam</Table.Cell>
          <Table.Cell>Smith</Table.Cell>
          <Table.Cell>36</Table.Cell>
          <Table.Cell>May 3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Julia</Table.Cell>
          <Table.Cell>Jones</Table.Cell>
          <Table.Cell>24</Table.Cell>
          <Table.Cell>February 10</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Peter</Table.Cell>
          <Table.Cell>Parker</Table.Cell>
          <Table.Cell>28</Table.Cell>
          <Table.Cell>September 7</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Bruce</Table.Cell>
          <Table.Cell>Wayne</Table.Cell>
          <Table.Cell>32</Table.Cell>
          <Table.Cell>December 18</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
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
  render: args => (
    <Table
      aria-label="Table with multiple selection"
      selectionMode="multiple"
      size="compact"
      {...args}
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
  render: args => (
    <Table
      aria-label="Table with multiple selection"
      selectionMode="multiple"
      size="expanded"
      {...args}
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

export const WithAlignedColumns: Story = {
  render: args => (
    <Table aria-label="Table with selection" {...args}>
      <Table.Header>
        <Table.Column>Event</Table.Column>
        <Table.Column>Date</Table.Column>
        <Table.Column>Location</Table.Column>
        <Table.Column align="right">Price</Table.Column>
        <Table.Column align="right">Ticket Number</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key={1}>
          <Table.Cell>Music Festival</Table.Cell>
          <Table.Cell>2023-08-25</Table.Cell>
          <Table.Cell>Central Park</Table.Cell>
          <Table.Cell>$50</Table.Cell>
          <Table.Cell>123456789</Table.Cell>
        </Table.Row>
        <Table.Row key={2}>
          <Table.Cell>Movie Premiere</Table.Cell>
          <Table.Cell>2023-09-10</Table.Cell>
          <Table.Cell>Red Carpet Theater</Table.Cell>
          <Table.Cell>$100</Table.Cell>
          <Table.Cell>987654321</Table.Cell>
        </Table.Row>
        <Table.Row key={3}>
          <Table.Cell>Conference</Table.Cell>
          <Table.Cell>2023-10-05</Table.Cell>
          <Table.Cell>Convention Center</Table.Cell>
          <Table.Cell>$200</Table.Cell>
          <Table.Cell>246813579</Table.Cell>
        </Table.Row>
        <Table.Row key={4}>
          <Table.Cell>Sports Tournament</Table.Cell>
          <Table.Cell>2023-11-20</Table.Cell>
          <Table.Cell>Stadium</Table.Cell>
          <Table.Cell>$75</Table.Cell>
          <Table.Cell>135792468</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
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

export const ScrollableTable: Story = {
  render: args => {
    const [todos, setTodos] = useState<
      { userId: string; id: string; title: string; completed: boolean }[]
    >([]);
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(data => setTodos(data));
    }, []);
    const tableHeaders = todos.length ? Object.keys(todos[0]) : [];
    return (
      <>
        {tableHeaders.length ? (
          <Stack space={4}>
            <Scrollable height="400px">
              <Table
                aria-label="Todos Table"
                selectionMode="multiple"
                stickyHeader
                {...args}
              >
                <Table.Header>
                  {tableHeaders.map((header, index) => (
                    <Table.Column
                      width={
                        index === tableHeaders.length - 1 ? 'full' : 'auto'
                      }
                      key={index}
                    >
                      {header}
                    </Table.Column>
                  ))}
                </Table.Header>
                <Table.Body>
                  {todos.map(todo => (
                    <Table.Row key={`${todo.title}-${todo.id}`}>
                      <Table.Cell>{todo.id}</Table.Cell>
                      <Table.Cell>{todo.userId}</Table.Cell>
                      <Table.Cell>{todo.title}</Table.Cell>
                      <Table.Cell>{JSON.stringify(todo.completed)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Scrollable>
            <Center>Some content below the table</Center>
          </Stack>
        ) : (
          'Loading data ⬇️ ...... '
        )}
      </>
    );
  },
};

export const InputTable: Story = {
  render: args => {
    const columns = [
      { name: 'Name', key: 'name' },
      { name: 'Firstname', key: 'firstname' },
      { name: 'House', key: 'house' },
      { name: 'Year of birth', key: 'year' },
    ];

    const rowData: { [key: string]: string }[] = [
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
    const [data, setData] = React.useState(rowData);

    function handleChange(id: string, newValue: string, key: string): void {
      const changedData = data.map(item => {
        if (item.id === id) {
          return { ...item, [key]: newValue };
        }
        return { ...item };
      });
      setData(changedData);
    }

    return (
      <Stack space={3}>
        <Table
          aria-label="Example dynamic collection table"
          disableKeyboardNavigation
          {...args}
        >
          <Table.Header columns={columns}>
            {column => <Table.Column>{column.name}</Table.Column>}
          </Table.Header>
          <Table.Body items={data}>
            {item => (
              <Table.Row key={item.id}>
                {columnKey =>
                  columnKey !== 'house' ? (
                    <Table.Cell>{item[columnKey]}</Table.Cell>
                  ) : (
                    <Table.Cell>
                      <TextArea
                        value={item.house}
                        disabled={false}
                        onChange={(value: string) =>
                          handleChange(item.id, value, 'house')
                        }
                        rows={3}
                        aria-label={'house'}
                      />
                    </Table.Cell>
                  )
                }
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Stack>
    );
  },
};
