import { useEffect } from 'react';
import { useState } from 'storybook/preview-api';
import { SortDescriptor } from '@react-types/shared';
import { NumericFormat } from '@marigold/system';
import preview from '../../../../config/storybook/.storybook/preview';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Center } from '../Center/Center';
import { Checkbox } from '../Checkbox/Checkbox';
import { Scrollable } from '../Scrollable/Scrollable';
import { Select } from '../Select/Select';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TextArea } from '../TextArea/TextArea';
import type { Selection } from '../types';
import { Table } from './Table';

const meta = preview.meta({
  title: 'Components/Table',
  component: Table,
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
    alignY: {
      control: {
        type: 'select',
      },
      options: ['top', 'middle'],
      description: 'alignment of the table content in the Y axis',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['default', 'master', 'muted', 'muted', 'admin', 'grid'],
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
});

// Data
// ---------------
const users = [
  {
    name: 'Hans Müller',
    email: 'hans.mueller@example.de',
    handle: '@schnitzelmeister',
    location: 'Berlin, BE',
    status: 'active',
    balance: 1250.75,
  },
  {
    name: 'Fritz Schneider',
    email: 'fritz.schneider@example.de',
    handle: '@wurstwhiz',
    location: 'München, BY',
    status: 'inactive',
    balance: 980.5,
  },
  {
    name: 'Klaus Becker',
    email: 'klaus.becker@example.de',
    handle: '@pretzelpirate',
    location: 'Hamburg, HH',
    status: 'suspended',
    balance: 0.0,
  },
  {
    name: 'Helga Fischer',
    email: 'helga.fischer@example.de',
    handle: '@bavarianbanter',
    location: 'Stuttgart, BW',
    status: 'active',
    balance: 2300.1,
  },
  {
    name: 'Ursula Weber',
    email: 'ursula.weber@example.de',
    handle: '@bratwurstbabe',
    location: 'Frankfurt, HE',
    status: 'active',
    balance: 150.25,
  },
  {
    name: 'Dieter Koch',
    email: 'dieter.koch@example.de',
    handle: '@sauerkrautsmile',
    location: 'Düsseldorf, NW',
    status: 'inactive',
    balance: 450.6,
  },
  {
    name: 'Ingrid Richter',
    email: 'ingrid.richter@example.de',
    handle: '@schnitzeljester',
    location: 'Dortmund, NW',
    status: 'active',
    balance: 1025.0,
  },
  {
    name: 'Werner Hoffmann',
    email: 'werner.hoffmann@example.de',
    handle: '@krankenclown',
    location: 'Leipzig, SN',
    status: 'suspended',
    balance: 0.0,
  },
  {
    name: 'Gisela Braun',
    email: 'gisela.braun@example.de',
    handle: '@ludwiglaughs',
    location: 'Bremen, HB',
    status: 'active',
    balance: 750.85,
  },
  {
    name: 'Matthias Wolf',
    email: 'matthias.wolf@example.de',
    handle: '@funktastisch',
    location: 'Dresden, SN',
    status: 'inactive',
    balance: 500.0,
  },
];
// Stories
// ---------------
export const Basic = meta.story({
  render: args => (
    <Table aria-label="label" {...args}>
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Location</Table.Column>
        <Table.Column>Status</Table.Column>
        <Table.Column align="right">Balance</Table.Column>
      </Table.Header>
      <Table.Body>
        {users.map(user => (
          <Table.Row key={user.email}>
            <Table.Cell>
              <Stack space="0.5">
                <Text weight="medium">{user.name}</Text>
                <Text size="xs" color="muted-foreground">
                  {user.handle}
                </Text>
              </Stack>
            </Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.location}</Table.Cell>
            <Table.Cell>
              <Badge>{user.status}</Badge>
            </Table.Cell>
            <Table.Cell>
              <NumericFormat
                style="currency"
                currency="EUR"
                value={user.balance}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
});

export const ControlledTable = meta.story({
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
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
    const selected = Array.from(selectedKeys);
    return (
      <Stack space={3}>
        <Table
          aria-label="Example dynamic collection table"
          selectionMode="multiple"
          {...args}
          onSelectionChange={setSelectedKeys}
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
});

// https://react-spectrum.adobe.com/react-aria/useTable.html#nested-columns
export const NestedColumns = meta.story({
  render: args => (
    <Table aria-label="Example table for nested columns" {...args}>
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
});

export const Empty = meta.story({
  render: args => (
    <Table
      aria-label="Example table for nested columns"
      emptyState={() => 'No results found.'}
      {...args}
    >
      <Table.Header>
        <Table.Column>First Name</Table.Column>
        <Table.Column>Last Name</Table.Column>
        <Table.Column>Age</Table.Column>
        <Table.Column>Birthday</Table.Column>
      </Table.Header>
      <Table.Body>{[]}</Table.Body>
    </Table>
  ),
});

export const Sorting = meta.story({
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
    const [descriptor, setDescriptor] = useState<SortDescriptor>({
      column: '',
      direction: 'ascending',
    });
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
          {...args}
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
});

export const Compact = meta.story({
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
});

export const Expanded = meta.story({
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
});

export const Static = meta.story({
  render: args => (
    <Table
      aria-label="Table without interaction"
      selectionMode="none"
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
});

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

const DataTable = ({ editable, ...rest }: { editable: boolean }) => (
  <Table aria-label="Data Table" {...rest}>
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

export const WithParentProp = meta.story({
  render: args => {
    const [editable, setEditable] = useState(true);

    return (
      <Stack>
        <Checkbox
          label="Allow editing"
          checked={editable}
          onChange={setEditable}
        />
        <DataTable editable={editable} {...args} />
      </Stack>
    );
  },
});

export const WithAlignedColumns = meta.story({
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
});

export const SelectedTable = meta.story({
  render: args => (
    <Table aria-label="Data Table" {...args}>
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
});

export const ScrollableTable = meta.story({
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
});

export const InputTable = meta.story({
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
    const [data, setData] = useState(rowData);

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
          alignY="top"
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
});

export const DestructiveAction = meta.story({
  render: args => {
    const users = [
      {
        id: '1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        status: 'active',
      },
      {
        id: '2',
        name: 'John Smith',
        email: 'john.smith@example.com',
        status: 'inactive',
      },
      {
        id: '3',
        name: 'Emily Johnson',
        email: 'emily.johnson@example.com',
        status: 'suspended',
      },
      {
        id: '4',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        status: 'active',
      },
      {
        id: '5',
        name: 'Olivia Wilson',
        email: 'olivia.wilson@example.com',
        status: 'inactive',
      },
      {
        id: '6',
        name: 'William Lee',
        email: 'william.lee@example.com',
        status: 'active',
      },
      {
        id: '7',
        name: 'Sophia Martinez',
        email: 'sophia.martinez@example.com',
        status: 'suspended',
      },
      {
        id: '8',
        name: 'James Anderson',
        email: 'james.anderson@example.com',
        status: 'inactive',
      },
      {
        id: '9',
        name: 'Charlotte Thomas',
        email: 'charlotte.thomas@example.com',
        status: 'active',
      },
      {
        id: '10',
        name: 'Benjamin Harris',
        email: 'benjamin.harris@example.com',
        status: 'suspended',
      },
    ];

    return (
      <Table
        aria-label="User Management Table"
        selectionMode="multiple"
        size="expanded"
        {...args}
      >
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column align="right">Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Badge>{user.status}</Badge>
              </Table.Cell>
              <Table.Cell>
                <Button variant="secondary" size="small">
                  Edit
                </Button>{' '}
                <Button variant="destructive-ghost" size="small">
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
});
