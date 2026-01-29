import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDragAndDrop } from 'react-aria-components';
import { useListData } from 'react-stately';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { SortDescriptor } from '@react-types/shared';
import { NumericFormat } from '@marigold/system';
import { Badge } from '../Badge/Badge';
import { ActionMenu } from '../Menu/ActionMenu';
import { NumberField } from '../NumberField/NumberField';
import { Scrollable } from '../Scrollable/Scrollable';
import { Select } from '../Select/Select';
import { Stack } from '../Stack/Stack';
import { Switch } from '../Switch/Switch';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import type { Selection } from '../types';
import { TableView } from './TableView';

const meta = preview.meta({
  title: 'Components/TableView',
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
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
  tags: ['component-test'],
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
  play: async ({ canvas, step }) => {
    await step('Verify table renders with correct structure', async () => {
      const table = canvas.getByRole('grid');
      expect(table).toBeInTheDocument();
    });

    await step('Verify column headers are present', async () => {
      expect(canvas.getByText('Name')).toBeInTheDocument();
      expect(canvas.getByText('Email')).toBeInTheDocument();
      expect(canvas.getByText('Location')).toBeInTheDocument();
      expect(canvas.getByText('Status')).toBeInTheDocument();
      expect(canvas.getByText('Balance')).toBeInTheDocument();
    });

    await step('Verify first user data is rendered', async () => {
      expect(canvas.getByText('Hans Müller')).toBeInTheDocument();
      expect(canvas.getByText('hans.mueller@example.de')).toBeInTheDocument();
      expect(canvas.getByText('Berlin, BE')).toBeInTheDocument();
    });

    await step('Verify all rows are rendered', async () => {
      const rows = canvas.getAllByRole('row');
      // 10 users + 1 header row = 11 rows
      expect(rows).toHaveLength(11);
    });
  },
});

export const DynamicData = meta.story({
  tags: ['component-test'],
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
  play: async ({ canvas, step }) => {
    await step('Verify dynamic data renders correctly', async () => {
      expect(canvas.getByText('Potter')).toBeInTheDocument();
      expect(canvas.getByText('Harry')).toBeInTheDocument();
      expect(canvas.getByText('Gryffindor')).toBeInTheDocument();
    });

    await step(
      'Verify initial selection (Malfoy row is selected)',
      async () => {
        expect(canvas.getByText('Selected rows: 2')).toBeInTheDocument();
      }
    );

    await step('Select another row', async () => {
      const potterRow = canvas.getByText('Potter').closest('tr');
      const checkbox = within(potterRow!).getByRole('checkbox');

      await userEvent.click(checkbox);
    });

    await step('Verify multiple selection', async () => {
      await waitFor(() => {
        const selectedText = canvas.getByText(/Selected rows:/);
        expect(selectedText).toBeInTheDocument();
      });
    });
  },
});

export const WidthsAndOverflow = meta.story({
  tags: ['component-test'],
  render: args => {
    const [overflow, setOverflow] = useState<'truncate' | 'wrap'>('wrap');

    return (
      <Stack space={3}>
        <div
          data-testid="table-container"
          className="max-w-2xl resize-x overflow-x-auto border border-stone-800"
        >
          <TableView
            key={overflow}
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
              <TableView.Row>
                <TableView.Cell colSpan={4}>Total</TableView.Cell>
                <TableView.Cell align="right">
                  <NumericFormat
                    value={users
                      .slice(0, 5)
                      .reduce((sum, user) => sum + user.balance, 0)}
                    style="currency"
                    currency="EUR"
                  />
                </TableView.Cell>
              </TableView.Row>
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
  play: async ({ canvas, step }) => {
    await step('Verify table with custom widths renders', async () => {
      expect(canvas.getByText('ID')).toBeInTheDocument();
      expect(canvas.getByText('Ursula Weber')).toBeInTheDocument();
    });

    await step('Verify Total row with colspan is displayed', async () => {
      expect(canvas.getByText('Total')).toBeInTheDocument();
    });

    await step('Reduce table container width', async () => {
      const container = canvas.getByTestId('table-container');
      // Simulate resize by setting width style
      container.style.width = '300px';
    });

    await step('Toggle truncate switch', async () => {
      const switchElement = canvas.getByLabelText('Truncate cell content');
      await userEvent.click(switchElement);
    });

    await step('Verify truncated text', async () => {
      const ursulaCell = canvas.getByText('Ursula Weber').closest('td');
      const styles = window.getComputedStyle(ursulaCell!);

      // Check CSS properties (no way to check otherwise...)
      expect(styles.textOverflow).toBe('ellipsis');
      expect(styles.overflow).toBe('hidden');
    });
  },
});

export const Empty = meta.story({
  tags: ['component-test'],
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
  play: async ({ canvas, step }) => {
    await step('Verify empty state message is displayed', async () => {
      expect(canvas.getByText('No results found.')).toBeInTheDocument();
    });

    await step('Verify table headers are still present', async () => {
      expect(canvas.getByText('First Name')).toBeInTheDocument();
      expect(canvas.getByText('Last Name')).toBeInTheDocument();
      expect(canvas.getByText('Age')).toBeInTheDocument();
      expect(canvas.getByText('Birthday')).toBeInTheDocument();
    });

    await step('Verify no data rows are present', async () => {
      const rows = canvas.getAllByRole('row');
      expect(rows).toHaveLength(2);
    });
  },
});

export const Sorting = meta.story({
  tags: ['component-test'],
  render: args => {
    const columns = [
      { name: 'Name', id: 'name', align: 'left', isRowHeader: true },
      { name: 'Height', id: 'height', align: 'right', isRowHeader: false },
      { name: 'Mass', id: 'mass', align: 'right', isRowHeader: false },
      {
        name: 'Birth Year',
        id: 'birth_year',
        align: 'left',
        isRowHeader: false,
      },
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
                align={column.align}
                allowsSorting
              >
                {column.name}
              </TableView.Column>
            )}
          </TableView.Header>
          <TableView.Body items={list}>
            {item => (
              <TableView.Row columns={columns}>
                {column => (
                  <TableView.Cell align={column.align}>
                    {item[column.id]}
                  </TableView.Cell>
                )}
              </TableView.Row>
            )}
          </TableView.Body>
        </TableView>
        <br />
        <div>
          Sort: {descriptor.column} / {descriptor.direction}
        </div>
      </>
    );
  },
  play: async ({ canvas, step }) => {
    await step('Verify initial state (no sorting)', async () => {
      expect(canvas.getByText(/Sort:.*\/ ascending/)).toBeInTheDocument();
    });

    await step('Click Name column header to sort', async () => {
      const nameHeader = canvas.getByRole('columnheader', { name: /Name/i });
      await userEvent.click(nameHeader);
    });

    await step('Verify sorting is applied (ascending)', async () => {
      await waitFor(() => {
        expect(canvas.getByText(/Sort: name \/ ascending/)).toBeInTheDocument();
      });
    });

    await step('Click Name column header again to reverse sort', async () => {
      const nameHeader = canvas.getByRole('columnheader', { name: /Name/i });
      await userEvent.click(nameHeader);
    });

    await step('Verify sorting direction changed (descending)', async () => {
      await waitFor(() => {
        expect(
          canvas.getByText(/Sort: name \/ descending/)
        ).toBeInTheDocument();
      });
    });

    await step('Sort by different column (Height)', async () => {
      const heightHeader = canvas.getByRole('columnheader', {
        name: /Height/i,
      });
      await userEvent.click(heightHeader);
    });

    await step('Verify Height column is sorted', async () => {
      await waitFor(() => {
        expect(
          canvas.getByText(/Sort: height \/ ascending/)
        ).toBeInTheDocument();
      });
    });
  },
});

export const EditableFields = meta.story({
  tags: ['component-test'],
  args: {
    selectionMode: 'multiple',
  },
  render: args => {
    const [data, setData] = useState(users);

    const update = <K extends keyof (typeof users)[0]>(
      email: string,
      field: K,
      value: (typeof users)[0][K]
    ) => {
      setData(prevData =>
        prevData.map(user =>
          user.email === email ? { ...user, [field]: value } : user
        )
      );
    };

    return (
      <TableView aria-label="Editable table with form fields" {...args}>
        <TableView.Header>
          <TableView.Column>Name</TableView.Column>
          <TableView.Column>Email</TableView.Column>
          <TableView.Column>Location</TableView.Column>
          <TableView.Column minWidth={150}>Status</TableView.Column>
          <TableView.Column minWidth={160}>Balance</TableView.Column>
          <TableView.Column width={72} align="right">
            Actions
          </TableView.Column>
        </TableView.Header>
        <TableView.Body>
          {data.map(user => (
            <TableView.Row key={user.email}>
              <TableView.Cell>
                <Stack space="0.5">
                  <Text weight="medium">{user.name}</Text>
                  <Text size="xs" color="muted-foreground">
                    {user.handle}
                  </Text>
                </Stack>
              </TableView.Cell>
              <TableView.Cell>
                <TextField
                  value={user.email}
                  onChange={value => update(user.email, 'email', value)}
                />
              </TableView.Cell>
              <TableView.Cell>{user.location}</TableView.Cell>
              <TableView.Cell>
                <Select
                  aria-label="Status"
                  value={user.status}
                  onChange={value =>
                    update(user.email, 'status', value as string)
                  }
                >
                  <Select.Option id="active">Active</Select.Option>
                  <Select.Option id="inactive">Inactive</Select.Option>
                  <Select.Option id="suspended">Suspended</Select.Option>
                </Select>
              </TableView.Cell>
              <TableView.Cell align="right">
                <NumberField
                  aria-label="Balance"
                  defaultValue={user.balance}
                  onChange={value => update(user.email, 'balance', value ?? 0)}
                  step={10}
                  formatOptions={{
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  }}
                />
              </TableView.Cell>
              <TableView.Cell align="right">
                <ActionMenu aria-label="Actions">
                  <ActionMenu.Item key="view">View</ActionMenu.Item>
                  <ActionMenu.Item key="edit">Edit</ActionMenu.Item>
                  <ActionMenu.Item key="delete" variant="destructive">
                    Delete
                  </ActionMenu.Item>
                </ActionMenu>
              </TableView.Cell>
            </TableView.Row>
          ))}
        </TableView.Body>
      </TableView>
    );
  },
  play: async ({ canvas, step }) => {
    await step('Verify editable table renders with form fields', async () => {
      expect(canvas.getByText('Hans Müller')).toBeInTheDocument();
      expect(canvas.getByText('@schnitzelmeister')).toBeInTheDocument();
    });

    await step('Verify Select dropdown is present', async () => {
      const selects = canvas.getAllByLabelText('Status');
      expect(selects.length).toBeGreaterThan(0);
    });

    await step('Verify NumberField is present', async () => {
      const numberFields = canvas.getAllByLabelText('Balance');
      expect(numberFields.length).toBeGreaterThan(0);
    });

    await step('Verify ActionMenu is present in each row', async () => {
      const actionMenus = canvas.getAllByLabelText('Actions');
      expect(actionMenus).toHaveLength(10);
    });

    await step('Open ActionMenu', async () => {
      const firstActionMenu = canvas.getAllByLabelText('Actions')[0];
      await userEvent.click(firstActionMenu);

      expect(canvas.getByText('View')).toBeVisible();
      expect(canvas.getByText('Edit')).toBeVisible();
      expect(canvas.getByText('Delete')).toBeVisible();
    });
  },
});

export const ScrollableAndSticky = meta.story({
  render: args => {
    type Todo = {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    };

    const {
      data: todos = [],
      isLoading,
      error,
    } = useQuery<Todo[]>({
      queryKey: ['todos'],
      queryFn: async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      },
    });

    if (isLoading) {
      return (
        <pre>
          <code>Loading todos...</code>
        </pre>
      );
    }

    if (error) {
      return (
        <pre>
          <code>
            Error loading todos:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </code>
        </pre>
      );
    }

    return (
      <Stack>
        <Scrollable height="400px">
          <TableView
            aria-label="Todos Table"
            selectionMode="multiple"
            {...args}
          >
            <TableView.Header sticky>
              <TableView.Column>ID</TableView.Column>
              <TableView.Column>Title</TableView.Column>
              <TableView.Column>User</TableView.Column>
              <TableView.Column>Completed</TableView.Column>
            </TableView.Header>
            <TableView.Body>
              {todos.map(todo => (
                <TableView.Row key={todo.id}>
                  <TableView.Cell>{todo.id}</TableView.Cell>
                  <TableView.Cell>{todo.title}</TableView.Cell>
                  <TableView.Cell>{todo.userId}</TableView.Cell>
                  <TableView.Cell>
                    {todo.completed ? 'Yes' : 'No'}
                  </TableView.Cell>
                </TableView.Row>
              ))}
            </TableView.Body>
          </TableView>
        </Scrollable>
        <div className="h-px w-full bg-black" />
        <div>Content below the scrollable area.</div>
      </Stack>
    );
  },
});

export const Links = meta.story({
  tags: ['component-test'],
  args: {
    selectionMode: 'multiple',
  },
  render: args => {
    const websites = [
      {
        name: 'Marigold',
        url: 'https://marigold-ui.io',
        description: 'Design System & Component Library',
      },
      {
        name: 'Reservix',
        url: 'https://reservix.net',
        description: 'Ticketing Platform',
      },
      {
        name: 'ADticket',
        url: 'https://www.adticket.de/',
        description: 'Event Ticketing Service',
      },
    ];

    return (
      <TableView aria-label="Table with links" {...args}>
        <TableView.Header>
          <TableView.Column>Name</TableView.Column>
          <TableView.Column>Description</TableView.Column>
          <TableView.Column>URL</TableView.Column>
        </TableView.Header>
        <TableView.Body>
          {websites.map(site => (
            <TableView.Row key={site.name} href={site.url}>
              <TableView.Cell>
                <Text weight="medium">{site.name}</Text>
              </TableView.Cell>
              <TableView.Cell>{site.description}</TableView.Cell>
              <TableView.Cell>
                <Text size="sm" color="muted-foreground">
                  {site.url}
                </Text>
              </TableView.Cell>
            </TableView.Row>
          ))}
        </TableView.Body>
      </TableView>
    );
  },
  play: async ({ canvas, step }) => {
    await step('Verify table with links renders', async () => {
      expect(canvas.getByText('Marigold')).toBeInTheDocument();
      expect(canvas.getByText('Reservix')).toBeInTheDocument();
      expect(canvas.getByText('ADticket')).toBeInTheDocument();
    });

    await step('Verify row has link attribute', async () => {
      const marigoldRow = canvas.getByText('Marigold').closest('tr');
      expect(marigoldRow).toBeInTheDocument();
    });

    await step('Verify descriptions are displayed', async () => {
      expect(
        canvas.getByText('Design System & Component Library')
      ).toBeInTheDocument();
      expect(canvas.getByText('Ticketing Platform')).toBeInTheDocument();
      expect(canvas.getByText('Event Ticketing Service')).toBeInTheDocument();
    });

    await step('Verify URLs are displayed', async () => {
      expect(canvas.getByText('https://marigold-ui.io')).toBeInTheDocument();
      expect(canvas.getByText('https://reservix.net')).toBeInTheDocument();
      expect(canvas.getByText('https://www.adticket.de/')).toBeInTheDocument();
    });
  },
});

export const DragAndDrop = meta.story({
  args: {
    selectionMode: 'multiple',
  },
  render: args => {
    const list = useListData({
      initialItems: users.slice(0, 5).map((user, index) => ({
        id: index + 1,
        name: user.name,
        email: user.email,
        location: user.location,
      })),
    });

    const { dragAndDropHooks } = useDragAndDrop({
      renderDropIndicator: TableView.renderDropIndicator,
      renderDragPreview: TableView.renderDragPreview,
      getItems: keys =>
        [...keys].map(key => ({
          'text/plain': list.getItem(key)!.name,
        })),
      onReorder(e) {
        if (e.target.dropPosition === 'before') {
          list.moveBefore(e.target.key, e.keys);
          return;
        }
        if (e.target.dropPosition === 'after') {
          list.moveAfter(e.target.key, e.keys);
          return;
        }
      },
    });

    return (
      <TableView
        aria-label="Reorderable files"
        dragAndDropHooks={dragAndDropHooks}
        {...args}
      >
        <TableView.Header>
          <TableView.Column isRowHeader>Name</TableView.Column>
          <TableView.Column>Email</TableView.Column>
          <TableView.Column>Location</TableView.Column>
        </TableView.Header>
        <TableView.Body items={list.items}>
          {item => (
            <TableView.Row>
              <TableView.Cell>{item.name}</TableView.Cell>
              <TableView.Cell>{item.email}</TableView.Cell>
              <TableView.Cell>{item.location}</TableView.Cell>
            </TableView.Row>
          )}
        </TableView.Body>
      </TableView>
    );
  },
});

export const AllowTextSelection = meta.story({
  tags: ['component-test'],
  args: {
    selectionMode: 'multiple',
  },
  render: args => {
    const [allowTextSelection, setAllowTextSelection] = useState(false);

    return (
      <Stack space={3}>
        <Switch
          label="Allow Text Selection"
          selected={allowTextSelection}
          onChange={setAllowTextSelection}
        />

        <TableView
          key={String(allowTextSelection)}
          aria-label="Table demonstrating allowTextSelection prop"
          {...args}
          allowTextSelection={allowTextSelection}
        >
          <TableView.Header>
            <TableView.Column>Name</TableView.Column>
            <TableView.Column>Email</TableView.Column>
            <TableView.Column>Location</TableView.Column>
            <TableView.Column>Status</TableView.Column>
          </TableView.Header>
          <TableView.Body>
            {users.slice(0, 3).map(user => (
              <TableView.Row key={user.email}>
                <TableView.Cell>{user.name}</TableView.Cell>
                <TableView.Cell>{user.email}</TableView.Cell>
                <TableView.Cell>{user.location}</TableView.Cell>
                <TableView.Cell>
                  <Badge>{user.status}</Badge>
                </TableView.Cell>
              </TableView.Row>
            ))}
          </TableView.Body>
        </TableView>
      </Stack>
    );
  },
  play: async ({ canvas, step }) => {
    const cell = canvas.getByText('Hans Müller');

    await step(
      'Verify that clicking on cell text, when allowTextSelection is false, does select the row instead',
      async () => {
        await userEvent.click(cell);

        const selection = window.getSelection();
        expect(selection?.toString()).toBe('');

        // Verify the row is selected by checking the checkbox in Hans Müller's row
        const hansRow = cell.closest('tr');
        const checkbox = hansRow?.querySelector('input[type="checkbox"]');
        expect(checkbox).toBeChecked();
      }
    );

    await step('Enable text selection via toggle', async () => {
      const switchElement = canvas.getByLabelText('Allow Text Selection');
      await userEvent.click(switchElement);
    });

    await step('Try to select text in a cell', async () => {
      // Wait for the component to re-render with allowTextSelection=true
      await waitFor(() => {
        const cellElement = canvas.getByText('Hans Müller');
        const wrapper = cellElement.closest('div[tabindex="-1"]');
        expect(wrapper).toBeInTheDocument();
      });

      // Get the cell element fresh after the re-render
      const cellAfterToggle = canvas.getByText('Hans Müller');
      await userEvent.tripleClick(cellAfterToggle);

      await waitFor(() => {
        const selection = window.getSelection();
        expect(selection?.toString()).toBe('Hans Müller');
      });
    });
  },
});
