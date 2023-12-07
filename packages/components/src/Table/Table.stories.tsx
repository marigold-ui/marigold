/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';

import { SortDescriptor } from '@react-types/shared';

import { Button } from '../Button';
import { Center } from '../Center';
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
  args: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Table aria-label="Table with selection" {...args}>
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
        <Table.Column>Firstname</Table.Column>
        <Table.Column>House</Table.Column>
        <Table.Column>Year of birth</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row id={1}>
          <Table.Cell>Potter</Table.Cell>
          <Table.Cell>Harry</Table.Cell>
          <Table.Cell>Gryffindor</Table.Cell>
          <Table.Cell>1980</Table.Cell>
        </Table.Row>
        <Table.Row id={2}>
          <Table.Cell>Malfoy</Table.Cell>
          <Table.Cell>Draco</Table.Cell>
          <Table.Cell>Slytherin</Table.Cell>
          <Table.Cell>1980</Table.Cell>
        </Table.Row>
        <Table.Row id={3}>
          <Table.Cell>Diggory</Table.Cell>
          <Table.Cell>Cedric</Table.Cell>
          <Table.Cell>Hufflepuff</Table.Cell>
          <Table.Cell>1977</Table.Cell>
        </Table.Row>
        <Table.Row id={4}>
          <Table.Cell>Lovegood</Table.Cell>
          <Table.Cell>Luna</Table.Cell>
          <Table.Cell>Ravenclaw</Table.Cell>
          <Table.Cell>1981</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const DisabledKeys: Story = {
  render: args => (
    <Table aria-label="Table with selection" disabledKeys={[2, 3]} {...args}>
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
        <Table.Column>Firstname</Table.Column>
        <Table.Column>House</Table.Column>
        <Table.Column>Year of birth</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row id={1}>
          <Table.Cell>Potter</Table.Cell>
          <Table.Cell>Harry</Table.Cell>
          <Table.Cell>Gryffindor</Table.Cell>
          <Table.Cell>1980</Table.Cell>
        </Table.Row>
        <Table.Row id={2}>
          <Table.Cell>Malfoy</Table.Cell>
          <Table.Cell>Draco</Table.Cell>
          <Table.Cell>Slytherin</Table.Cell>
          <Table.Cell>1980</Table.Cell>
        </Table.Row>
        <Table.Row id={3}>
          <Table.Cell>Diggory</Table.Cell>
          <Table.Cell>Cedric</Table.Cell>
          <Table.Cell>Hufflepuff</Table.Cell>
          <Table.Cell>1977</Table.Cell>
        </Table.Row>
        <Table.Row id={4}>
          <Table.Cell>Lovegood</Table.Cell>
          <Table.Cell>Luna</Table.Cell>
          <Table.Cell>Ravenclaw</Table.Cell>
          <Table.Cell>1981</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const Sorting: Story = {
  render: args => {
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
          {...args}
          aria-label="Example table with client side sorting"
          sortDescriptor={descriptor}
          onSortChange={sort}
          selectionMode="multiple"
        >
          <Table.Header>
            <Table.Column isRowHeader id="name" allowsSorting>
              Name
            </Table.Column>
            <Table.Column id="height" allowsSorting>
              Height
            </Table.Column>
            <Table.Column id="mass" allowsSorting>
              Mass
            </Table.Column>
            <Table.Column id="birth_year" allowsSorting>
              Birth Year
            </Table.Column>
          </Table.Header>
          <Table.Body items={list}>
            {item => (
              <Table.Row id={(item as any).name}>
                <Table.Cell>{(item as any).name}</Table.Cell>
                <Table.Cell>{(item as any).height}</Table.Cell>
                <Table.Cell>{(item as any).mass}</Table.Cell>
                <Table.Cell>{(item as any).birth_year}</Table.Cell>
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

export const EmptyState: Story = {
  render: args => (
    <Table {...args} aria-label="Search results">
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
        <Table.Column>Type</Table.Column>
        <Table.Column>Date Modified</Table.Column>
      </Table.Header>
      <Table.Body renderEmptyState={() => 'No results found.'}>{[]}</Table.Body>
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
            {column => (
              <Table.Column isRowHeader>{(column as any).name}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={rows}>
            {item => (
              <Table.Row id={(item as any).name}>
                <Table.Cell>{(item as any).name}</Table.Cell>
                <Table.Cell>{(item as any).firstname}</Table.Cell>
                <Table.Cell>{(item as any).house}</Table.Cell>
                <Table.Cell>{(item as any).year}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <div>Selected rows: {selected.join(', ')}</div>
      </Stack>
    );
  },
};

export const Compact: Story = {
  render: args => (
    <Table
      aria-label="Table with multiple selection"
      selectionMode="multiple"
      variant="compact"
      {...args}
    >
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
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
      variant="expanded"
      {...args}
    >
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
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
  render: args => (
    <Table
      aria-label="Table without interaction"
      selectionMode="none"
      {...args}
    >
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
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
      {col => <Table.Column isRowHeader>{(col as any).name}</Table.Column>}
    </Table.Header>
    <Table.Body items={rows}>
      {rows.map(item => (
        <Table.Row id={item.id}>
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
  render: args => {
    const [editable, setEditable] = React.useState(true);

    return (
      <Stack>
        <Checkbox checked={editable} onChange={setEditable}>
          Allow editing
        </Checkbox>
        <DataTable editable={editable} {...args} />
      </Stack>
    );
  },
};

export const SelectedTable: Story = {
  render: args => (
    <Table aria-label="Data Table" {...args}>
      <Table.Header columns={columns}>
        {col => <Table.Column isRowHeader>{(col as any).name}</Table.Column>}
      </Table.Header>
      <Table.Body items={rows}>
        {rows.map(item => (
          <Table.Row id={item.id}>
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

export const RowLink: Story = {
  render: args => (
    <Table {...args} aria-label="Bookmarks" selectionMode="multiple">
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
        <Table.Column>URL</Table.Column>
        <Table.Column>Date added</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row href="https://reservix.de/" target="_blank">
          <Table.Cell>Reservix Ticket Portal</Table.Cell>
          <Table.Cell>https://reservix.de/</Table.Cell>
          <Table.Cell>January 28, 2023</Table.Cell>
        </Table.Row>
        <Table.Row href="https://reservix.net/" target="_blank">
          <Table.Cell>Reservix net</Table.Cell>
          <Table.Cell>https://reservix.net/</Table.Cell>
          <Table.Cell>April 5, 2023</Table.Cell>
        </Table.Row>
        <Table.Row href="https://adticket.de/" target="_blank">
          <Table.Cell>ADticket</Table.Cell>
          <Table.Cell>https://adticket.de/</Table.Cell>
          <Table.Cell>July 12, 2023</Table.Cell>
        </Table.Row>
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
            <div className="h-[400px] overflow-y-scroll">
              <Table
                aria-label="Todos Table"
                selectionMode="multiple"
                {...args}
              >
                <Table.Header>
                  {tableHeaders.map((header, index) => (
                    <Table.Column
                      isRowHeader
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
            </div>
            <Center>Some content below the table</Center>
          </Stack>
        ) : (
          'Loading data ⬇️ ...... '
        )}
      </>
    );
  },
};

const nestedColumns = [
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
] as const;

const nestedRows = [
  { id: 1, first: 'Sam', last: 'Smith', age: 36, birthday: 'May 3' },
  { id: 2, first: 'Julia', last: 'Jones', age: 24, birthday: 'February 10' },
  { id: 3, first: 'Peter', last: 'Parker', age: 28, birthday: 'September 7' },
  { id: 4, first: 'Bruce', last: 'Wayne', age: 32, birthday: 'December 18' },
] as const;

export const DynamicNestedColumns: Story = {
  render: args => {
    return (
      <Table aria-label="Example table with dynamic nested columns" {...args}>
        <Table.Header columns={nestedColumns as any}>
          {column => (
            <Table.Column
              isRowHeader={(column as any).isRowHeader}
              childColumns={(column as any).children}
            >
              {(column as any).name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={nestedRows}>
          {item => (
            <Table.Row>
              <Table.Cell>{(item as any).first}</Table.Cell>
              <Table.Cell>{(item as any).last}</Table.Cell>
              <Table.Cell>{(item as any).age}</Table.Cell>
              <Table.Cell>{(item as any).birthday}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  },
};
