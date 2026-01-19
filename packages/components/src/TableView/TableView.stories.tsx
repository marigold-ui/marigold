import preview from '@storybook/preview';
import { useEffect } from 'react';
import { useState } from 'storybook/preview-api';
import { SortDescriptor } from '@react-types/shared';
import { NumericFormat } from '@marigold/system';
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
  args: {},
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
            <TableView.Cell>
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
        <TableView
          aria-label="Example dynamic collection table"
          selectionMode="multiple"
          {...args}
          onSelectionChange={setSelectedKeys}
        >
          <TableView.Header columns={columns}>
            {column => <TableView.Column>{column.name}</TableView.Column>}
          </TableView.Header>
          <TableView.Body items={rows}>
            {item => (
              <TableView.Row>
                {columnKey => (
                  <TableView.Cell>{item[columnKey]}</TableView.Cell>
                )}
              </TableView.Row>
            )}
          </TableView.Body>
        </TableView>
        <div>Selected rows: {selected.join(', ')}</div>
      </Stack>
    );
  },
});

// https://react-spectrum.adobe.com/react-aria/useTable.html#nested-columns
export const NestedColumns = meta.story({
  render: args => (
    <TableView aria-label="Example table for nested columns" {...args}>
      <TableView.Header>
        <TableView.Column title="Name">
          <TableView.Column isRowHeader>First Name</TableView.Column>
          <TableView.Column isRowHeader>Last Name</TableView.Column>
        </TableView.Column>
        <TableView.Column title="Information">
          <TableView.Column>Age</TableView.Column>
          <TableView.Column>Birthday</TableView.Column>
        </TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row>
          <TableView.Cell>Sam</TableView.Cell>
          <TableView.Cell>Smith</TableView.Cell>
          <TableView.Cell>36</TableView.Cell>
          <TableView.Cell>May 3</TableView.Cell>
        </TableView.Row>
        <TableView.Row>
          <TableView.Cell>Julia</TableView.Cell>
          <TableView.Cell>Jones</TableView.Cell>
          <TableView.Cell>24</TableView.Cell>
          <TableView.Cell>February 10</TableView.Cell>
        </TableView.Row>
        <TableView.Row>
          <TableView.Cell>Peter</TableView.Cell>
          <TableView.Cell>Parker</TableView.Cell>
          <TableView.Cell>28</TableView.Cell>
          <TableView.Cell>September 7</TableView.Cell>
        </TableView.Row>
        <TableView.Row>
          <TableView.Cell>Bruce</TableView.Cell>
          <TableView.Cell>Wayne</TableView.Cell>
          <TableView.Cell>32</TableView.Cell>
          <TableView.Cell>December 18</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  ),
});

export const Empty = meta.story({
  render: args => (
    <TableView
      aria-label="Example table for nested columns"
      emptyState={() => 'No results found.'}
      {...args}
    >
      <TableView.Header>
        <TableView.Column>First Name</TableView.Column>
        <TableView.Column>Last Name</TableView.Column>
        <TableView.Column>Age</TableView.Column>
        <TableView.Column>Birthday</TableView.Column>
      </TableView.Header>
      <TableView.Body>{[]}</TableView.Body>
    </TableView>
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
        <TableView
          aria-label="Example table with client side sorting"
          sortDescriptor={descriptor}
          onSortChange={sort}
          selectionMode="multiple"
          {...args}
        >
          <TableView.Header>
            <TableView.Column key="name" allowsSorting>
              Name
            </TableView.Column>
            <TableView.Column key="height" allowsSorting>
              Height
            </TableView.Column>
            <TableView.Column key="mass" allowsSorting>
              Mass
            </TableView.Column>
            <TableView.Column key="birth_year" allowsSorting>
              Birth Year
            </TableView.Column>
          </TableView.Header>
          <TableView.Body items={list}>
            {item => (
              <TableView.Row key={item.name}>
                {columnKey => (
                  <TableView.Cell>{(item as any)[columnKey]}</TableView.Cell>
                )}
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

export const Compact = meta.story({
  render: args => (
    <TableView
      aria-label="Table with multiple selection"
      selectionMode="multiple"
      size="compact"
      {...args}
    >
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
        <TableView.Column>Firstname</TableView.Column>
        <TableView.Column>House</TableView.Column>
        <TableView.Column>Year of birth</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row key={1}>
          <TableView.Cell>Potter</TableView.Cell>
          <TableView.Cell>Harry</TableView.Cell>
          <TableView.Cell>Gryffindor</TableView.Cell>
          <TableView.Cell>1980</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={2}>
          <TableView.Cell>Malfoy</TableView.Cell>
          <TableView.Cell>Draco</TableView.Cell>
          <TableView.Cell>Slytherin</TableView.Cell>
          <TableView.Cell>1980</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={3}>
          <TableView.Cell>Diggory</TableView.Cell>
          <TableView.Cell>Cedric</TableView.Cell>
          <TableView.Cell>Hufflepuff</TableView.Cell>
          <TableView.Cell>1977</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={4}>
          <TableView.Cell>Lovegood</TableView.Cell>
          <TableView.Cell>Luna</TableView.Cell>
          <TableView.Cell>Ravenclaw</TableView.Cell>
          <TableView.Cell>1981</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  ),
});

export const Expanded = meta.story({
  render: args => (
    <TableView
      aria-label="Table with multiple selection"
      selectionMode="multiple"
      size="expanded"
      {...args}
    >
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
        <TableView.Column>Firstname</TableView.Column>
        <TableView.Column>House</TableView.Column>
        <TableView.Column>Year of birth</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row key={1}>
          <TableView.Cell>Potter</TableView.Cell>
          <TableView.Cell>Harry</TableView.Cell>
          <TableView.Cell>Gryffindor</TableView.Cell>
          <TableView.Cell>1980</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={2}>
          <TableView.Cell>Malfoy</TableView.Cell>
          <TableView.Cell>Draco</TableView.Cell>
          <TableView.Cell>Slytherin</TableView.Cell>
          <TableView.Cell>1980</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={3}>
          <TableView.Cell>Diggory</TableView.Cell>
          <TableView.Cell>Cedric</TableView.Cell>
          <TableView.Cell>Hufflepuff</TableView.Cell>
          <TableView.Cell>1977</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={4}>
          <TableView.Cell>Lovegood</TableView.Cell>
          <TableView.Cell>Luna</TableView.Cell>
          <TableView.Cell>Ravenclaw</TableView.Cell>
          <TableView.Cell>1981</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  ),
});

export const Static = meta.story({
  render: args => (
    <TableView
      aria-label="Table without interaction"
      selectionMode="none"
      {...args}
    >
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
        <TableView.Column>Firstname</TableView.Column>
        <TableView.Column>House</TableView.Column>
        <TableView.Column>Year of birth</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row key={1}>
          <TableView.Cell>Potter</TableView.Cell>
          <TableView.Cell>Harry</TableView.Cell>
          <TableView.Cell>Gryffindor</TableView.Cell>
          <TableView.Cell>1980</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={2}>
          <TableView.Cell>Malfoy</TableView.Cell>
          <TableView.Cell>Draco</TableView.Cell>
          <TableView.Cell>Slytherin</TableView.Cell>
          <TableView.Cell>1980</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={3}>
          <TableView.Cell>Diggory</TableView.Cell>
          <TableView.Cell>Cedric</TableView.Cell>
          <TableView.Cell>Hufflepuff</TableView.Cell>
          <TableView.Cell>1977</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={4}>
          <TableView.Cell>Lovegood</TableView.Cell>
          <TableView.Cell>Luna</TableView.Cell>
          <TableView.Cell>Ravenclaw</TableView.Cell>
          <TableView.Cell>1981</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
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
  <TableView aria-label="Data Table" {...rest}>
    <TableView.Header columns={columns}>
      {col => <TableView.Column>{col.name}</TableView.Column>}
    </TableView.Header>
    <TableView.Body items={rows}>
      {rows.map(item => (
        <TableView.Row key={item.id}>
          <TableView.Cell>{item.name}</TableView.Cell>
          <TableView.Cell>{item.firstname}</TableView.Cell>
          <TableView.Cell>{item.house}</TableView.Cell>
          <TableView.Cell>{item.year}</TableView.Cell>
          <TableView.Cell>
            <Button variant="ghost" disabled={!editable}>
              Bearbeiten
            </Button>
          </TableView.Cell>
        </TableView.Row>
      ))}
    </TableView.Body>
  </TableView>
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
    <TableView aria-label="Table with selection" {...args}>
      <TableView.Header>
        <TableView.Column>Event</TableView.Column>
        <TableView.Column>Date</TableView.Column>
        <TableView.Column>Location</TableView.Column>
        <TableView.Column align="right">Price</TableView.Column>
        <TableView.Column align="right">Ticket Number</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row key={1}>
          <TableView.Cell>Music Festival</TableView.Cell>
          <TableView.Cell>2023-08-25</TableView.Cell>
          <TableView.Cell>Central Park</TableView.Cell>
          <TableView.Cell>$50</TableView.Cell>
          <TableView.Cell>123456789</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={2}>
          <TableView.Cell>Movie Premiere</TableView.Cell>
          <TableView.Cell>2023-09-10</TableView.Cell>
          <TableView.Cell>Red Carpet Theater</TableView.Cell>
          <TableView.Cell>$100</TableView.Cell>
          <TableView.Cell>987654321</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={3}>
          <TableView.Cell>Conference</TableView.Cell>
          <TableView.Cell>2023-10-05</TableView.Cell>
          <TableView.Cell>Convention Center</TableView.Cell>
          <TableView.Cell>$200</TableView.Cell>
          <TableView.Cell>246813579</TableView.Cell>
        </TableView.Row>
        <TableView.Row key={4}>
          <TableView.Cell>Sports Tournament</TableView.Cell>
          <TableView.Cell>2023-11-20</TableView.Cell>
          <TableView.Cell>Stadium</TableView.Cell>
          <TableView.Cell>$75</TableView.Cell>
          <TableView.Cell>135792468</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  ),
});

export const SelectedTable = meta.story({
  render: args => (
    <TableView aria-label="Data Table" {...args}>
      <TableView.Header columns={columns}>
        {col => <TableView.Column>{col.name}</TableView.Column>}
      </TableView.Header>
      <TableView.Body items={rows}>
        {rows.map(item => (
          <TableView.Row key={item.id}>
            <TableView.Cell>{item.name}</TableView.Cell>
            <TableView.Cell>{item.firstname}</TableView.Cell>
            <TableView.Cell>{item.house}</TableView.Cell>
            <TableView.Cell>{item.year}</TableView.Cell>
            <TableView.Cell>
              <Select disabledKeys={['Firefly']}>
                <Select.Option key="Harry Potter">Harry Potter</Select.Option>
                <Select.Option key="Lord of the Rings">
                  Lord of the Rings
                </Select.Option>
                <Select.Option key="Star Wars">Star Wars</Select.Option>
                <Select.Option key="Star Trek">Star Trek</Select.Option>
                <Select.Option key="Firefly">Firefly</Select.Option>
              </Select>
            </TableView.Cell>
          </TableView.Row>
        ))}
      </TableView.Body>
    </TableView>
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
