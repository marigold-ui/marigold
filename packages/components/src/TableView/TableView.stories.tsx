import { useEffect, useState } from 'react';
import { SortDescriptor } from '@react-types/shared';
import { NumericFormat } from '@marigold/system';
import preview from '../../../../.storybook/preview';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Center } from '../Center/Center';
import { Checkbox } from '../Checkbox/Checkbox';
import { Scrollable } from '../Scrollable/Scrollable';
import { Select } from '../Select/Select';
import { Stack } from '../Stack/Stack';
import { Switch } from '../Switch/Switch';
import { Text } from '../Text/Text';
import { TextArea } from '../TextArea/TextArea';
import type { Selection } from '../types';
import { TableView } from './TableView';

const meta = preview.meta({
  title: 'Components/TableView',
  component: TableView,
  argTypes: {
    selectionMode: {
      control: {
        type: 'select',
      },
      options: ['none', 'single', 'multiple'],
      description: 'selection mode',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['default', 'muted', 'grid'],
      description: 'variant for the table',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['default', 'compact', 'spacious'],
      description: 'size for the table',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    selectionMode: 'none',
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
    <TableView aria-label="label" {...args}>
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
        <TableView.Column>Email</TableView.Column>
        <TableView.Column>Location</TableView.Column>
        <TableView.Column>Status</TableView.Column>
        <TableView.Column align="right">Balance</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        {users.map(user => (
          <TableView.Row key={user.email}>
            <TableView.Cell>
              <Stack space="0.5">
                <Text weight="medium">{user.name}</Text>
                <Text size="xs" color="muted-foreground">
                  {user.handle}
                </Text>
              </Stack>
            </TableView.Cell>
            <TableView.Cell>{user.email}</TableView.Cell>
            <TableView.Cell>{user.location}</TableView.Cell>
            <TableView.Cell>
              <Badge>{user.status}</Badge>
            </TableView.Cell>
            <TableView.Cell align="right">
              <NumericFormat
                style="currency"
                currency="EUR"
                value={user.balance}
              />
            </TableView.Cell>
          </TableView.Row>
        ))}
      </TableView.Body>
    </TableView>
  ),
});

export const DynamicData = meta.story({
  args: {
    selectionMode: 'single',
  },
  render: args => {
    const columns = [
      { name: 'Name', id: 'name', isRowHeader: true },
      { name: 'Firstname', id: 'firstname', isRowHeader: false },
      { name: 'House', id: 'house', isRowHeader: false },
      { name: 'Year of birth', id: 'year', isRowHeader: false },
    ] as const;

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
    ] as const;

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(['2']));

    return (
      <Stack space={3}>
        <TableView
          aria-label="Example dynamic collection table"
          selectionMode="multiple"
          {...args}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <TableView.Header columns={columns}>
            {column => (
              <TableView.Column isRowHeader={column.isRowHeader} id={column.id}>
                {column.name}
              </TableView.Column>
            )}
          </TableView.Header>
          <TableView.Body items={rows}>
            {item => (
              <TableView.Row columns={columns}>
                {column => <TableView.Cell>{item[column.id]}</TableView.Cell>}
              </TableView.Row>
            )}
          </TableView.Body>
        </TableView>
        <div>Selected rows: {selectedKeys}</div>
      </Stack>
    );
  },
});

export const WidthsAndOverflow = meta.story({
  render: args => {
    const [overflow, setOverflow] = useState<'truncate' | 'wrap'>('wrap');

    return (
      <Stack space={3}>
        <div className="max-w-2xl resize-x overflow-x-auto border border-stone-800">
          <TableView
            {...args}
            aria-label="Table with custom column widths"
            overflow={overflow}
          >
            <TableView.Header>
              <TableView.Column width={40}>ID</TableView.Column>
              <TableView.Column minWidth={100}>Name</TableView.Column>
              <TableView.Column width={100}>Status</TableView.Column>
              <TableView.Column minWidth={100}>Location</TableView.Column>
              <TableView.Column minWidth={80} align="right">
                Balance
              </TableView.Column>
            </TableView.Header>
            <TableView.Body>
              {users.slice(0, 5).map((user, index) => (
                <TableView.Row key={user.email}>
                  <TableView.Cell>{index + 1}</TableView.Cell>
                  <TableView.Cell>{user.name}</TableView.Cell>
                  <TableView.Cell>
                    <Badge
                      variant={user.status === 'active' ? 'success' : 'warning'}
                    >
                      {user.status}
                    </Badge>
                  </TableView.Cell>
                  <TableView.Cell>{user.location}</TableView.Cell>
                  <TableView.Cell align="right">
                    <NumericFormat
                      value={user.balance}
                      style="currency"
                      currency="EUR"
                    />
                  </TableView.Cell>
                </TableView.Row>
              ))}
            </TableView.Body>
          </TableView>
        </div>
        <p className="text-muted-foreground block text-xs">
          Column widths: ID 40px, Name min 100px, Status 100px, Location min
          100px, Balance min 80px.
        </p>
        <Switch
          label="Truncate cell content"
          selected={overflow === 'truncate'}
          onChange={selected => setOverflow(selected ? 'truncate' : 'wrap')}
        />
      </Stack>
    );
  },
});

export const Empty = meta.story({
  render: args => (
    <TableView aria-label="Example table for nested columns" {...args}>
      <TableView.Header>
        <TableView.Column>First Name</TableView.Column>
        <TableView.Column>Last Name</TableView.Column>
        <TableView.Column>Age</TableView.Column>
        <TableView.Column>Birthday</TableView.Column>
      </TableView.Header>
      <TableView.Body emptyState={() => 'No results found.'}>
        {[]}
      </TableView.Body>
    </TableView>
  ),
});

export const Sorting = meta.story({
  render: args => {
    const columns = [
      { name: 'Name', id: 'name', isRowHeader: true },
      { name: 'Height', id: 'height', isRowHeader: false },
      { name: 'Mass', id: 'mass', isRowHeader: false },
      { name: 'Birth Year', id: 'birth_year', isRowHeader: false },
    ] as const;

    const data = [
      {
        id: '1',
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
      },
      {
        id: '2',
        name: 'C-3PO',
        height: '167',
        mass: '75',
        birth_year: '112BBY',
      },
      {
        id: '3',
        name: 'R2-D2',
        height: '96',
        mass: '32',
        birth_year: '33BBY',
      },
      {
        id: '4',
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        birth_year: '41.9BBY',
      },
      {
        id: '5',
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        birth_year: '19BBY',
      },
      {
        id: '6',
        name: 'Owen Lars',
        height: '178',
        mass: '120',
        birth_year: '52BBY',
      },
      {
        id: '7',
        name: 'Beru Whitesun lars',
        height: '165',
        mass: '75',
        birth_year: '47BBY',
      },
      {
        id: '8',
        name: 'R5-D4',
        height: '97',
        mass: '32',
        birth_year: 'unknown',
      },
      {
        id: '9',
        name: 'Biggs Darklighter',
        height: '183',
        mass: '84',
        birth_year: '24BBY',
      },
      {
        id: '10',
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
        <TableView
          aria-label="Example table with client side sorting"
          sortDescriptor={descriptor}
          onSortChange={sort}
          selectionMode="multiple"
          {...args}
        >
          <TableView.Header columns={columns}>
            {column => (
              <TableView.Column
                isRowHeader={column.isRowHeader}
                id={column.id}
                allowsSorting
              >
                {column.name}
              </TableView.Column>
            )}
          </TableView.Header>
          <TableView.Body items={list}>
            {item => (
              <TableView.Row columns={columns}>
                {column => <TableView.Cell>{item[column.id]}</TableView.Cell>}
              </TableView.Row>
            )}
          </TableView.Body>
        </TableView>
        <br />
        <pre>
          Sort: {descriptor.column} / {descriptor.direction}
        </pre>
      </>
    );
  },
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
              <TableView
                aria-label="Todos Table"
                selectionMode="multiple"
                stickyHeader
                {...args}
              >
                <TableView.Header>
                  {tableHeaders.map((header, index) => (
                    <TableView.Column
                      width={
                        index === tableHeaders.length - 1 ? 'full' : 'auto'
                      }
                      key={index}
                    >
                      {header}
                    </TableView.Column>
                  ))}
                </TableView.Header>
                <TableView.Body>
                  {todos.map(todo => (
                    <TableView.Row key={`${todo.title}-${todo.id}`}>
                      <TableView.Cell>{todo.id}</TableView.Cell>
                      <TableView.Cell>{todo.userId}</TableView.Cell>
                      <TableView.Cell>{todo.title}</TableView.Cell>
                      <TableView.Cell>
                        {JSON.stringify(todo.completed)}
                      </TableView.Cell>
                    </TableView.Row>
                  ))}
                </TableView.Body>
              </TableView>
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
        <TableView
          aria-label="Example dynamic collection table"
          disableKeyboardNavigation
          alignY="top"
          {...args}
        >
          <TableView.Header columns={columns}>
            {column => <TableView.Column>{column.name}</TableView.Column>}
          </TableView.Header>
          <TableView.Body items={data}>
            {item => (
              <TableView.Row key={item.id}>
                {columnKey =>
                  columnKey !== 'house' ? (
                    <TableView.Cell>{item[columnKey]}</TableView.Cell>
                  ) : (
                    <TableView.Cell>
                      <TextArea
                        value={item.house}
                        disabled={false}
                        onChange={(value: string) =>
                          handleChange(item.id, value, 'house')
                        }
                        rows={3}
                        aria-label={'house'}
                      />
                    </TableView.Cell>
                  )
                }
              </TableView.Row>
            )}
          </TableView.Body>
        </TableView>
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
      <TableView
        aria-label="User Management Table"
        selectionMode="multiple"
        size="expanded"
        {...args}
      >
        <TableView.Header>
          <TableView.Column>Name</TableView.Column>
          <TableView.Column>Email</TableView.Column>
          <TableView.Column>Status</TableView.Column>
          <TableView.Column align="right">Actions</TableView.Column>
        </TableView.Header>
        <TableView.Body>
          {users.map(user => (
            <TableView.Row key={user.id}>
              <TableView.Cell>{user.name}</TableView.Cell>
              <TableView.Cell>{user.email}</TableView.Cell>
              <TableView.Cell>
                <Badge>{user.status}</Badge>
              </TableView.Cell>
              <TableView.Cell>
                <Button variant="secondary" size="small">
                  Edit
                </Button>{' '}
                <Button variant="destructive-ghost" size="small">
                  Delete
                </Button>
              </TableView.Cell>
            </TableView.Row>
          ))}
        </TableView.Body>
      </TableView>
    );
  },
});
