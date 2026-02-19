import { Copy } from 'lucide-react';
import { expect, fn, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Delete, Edit } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import { Badge } from '../Badge/Badge';
import { Scrollable } from '../Scrollable/Scrollable';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { Text } from '../Text/Text';
import { ActionBar } from './ActionBar';

const meta = preview.meta({
  title: 'Components/ActionBar',
  component: ActionBar,
  argTypes: {
    selectedItemCount: {
      control: { type: 'number' },
      description: 'Number of selected items',
      table: {
        type: { summary: 'number | "all"' },
        defaultValue: { summary: '0' },
        disable: true,
      },
    },
    onClearSelection: {
      description: 'Handler for clear button press',
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    onClearSelection: fn(),
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <ActionBar {...args} selectedItemCount={3}>
      <ActionBar.Button onPress={() => alert('Edit action')}>
        <Edit />
        <span>Edit</span>
      </ActionBar.Button>
      <ActionBar.Button onPress={() => alert('Copy action')}>
        <Copy />
        <span>Copy</span>
      </ActionBar.Button>
      <ActionBar.Button onPress={() => alert('Delete action')}>
        <Delete />
        <span>Delete</span>
      </ActionBar.Button>
    </ActionBar>
  ),
  play: async ({ args, canvas }) => {
    await expect(canvas.getByText('3 selected')).toBeInTheDocument();
    await expect(canvas.getByText('Edit')).toBeInTheDocument();

    const clearButton = canvas.getByRole('button', {
      name: /clear selection/i,
    });
    await userEvent.click(clearButton);

    await expect(args.onClearSelection).toHaveBeenCalled();
  },
});

export const AllSelected = meta.story({
  args: {
    selectedItemCount: 'all',
  },
  render: args => (
    <ActionBar {...args}>
      <ActionBar.Button>
        <Edit />
        <span>Edit</span>
      </ActionBar.Button>
      <ActionBar.Button>
        <Delete />
        <span>Delete</span>
      </ActionBar.Button>
    </ActionBar>
  ),
});

export const WithoutClearButton = meta.story({
  args: {
    selectedItemCount: 4,
    onClearSelection: undefined,
  },
  render: args => (
    <ActionBar {...args}>
      <ActionBar.Button>
        <Edit />
        <span>Edit</span>
      </ActionBar.Button>
      <ActionBar.Button>
        <Delete />
        <span>Delete</span>
      </ActionBar.Button>
    </ActionBar>
  ),
});

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
  {
    name: 'Petra Zimmermann',
    email: 'petra.zimmermann@example.de',
    handle: '@zwiebelzauber',
    location: 'Hannover, NI',
    status: 'active',
    balance: 1875.3,
  },
  {
    name: 'Jürgen Krause',
    email: 'juergen.krause@example.de',
    handle: '@kartoffelkönig',
    location: 'Nürnberg, BY',
    status: 'active',
    balance: 620.0,
  },
  {
    name: 'Monika Lehmann',
    email: 'monika.lehmann@example.de',
    handle: '@lebkuchenlady',
    location: 'Köln, NW',
    status: 'inactive',
    balance: 310.45,
  },
  {
    name: 'Ralf Schäfer',
    email: 'ralf.schaefer@example.de',
    handle: '@rheinrocker',
    location: 'Bonn, NW',
    status: 'active',
    balance: 2100.0,
  },
  {
    name: 'Sabine Hartmann',
    email: 'sabine.hartmann@example.de',
    handle: '@schwarzwaldfee',
    location: 'Freiburg, BW',
    status: 'suspended',
    balance: 0.0,
  },
  {
    name: 'Thomas Lang',
    email: 'thomas.lang@example.de',
    handle: '@technotom',
    location: 'Essen, NW',
    status: 'active',
    balance: 890.15,
  },
  {
    name: 'Claudia Neumann',
    email: 'claudia.neumann@example.de',
    handle: '@currywurstqueen',
    location: 'Potsdam, BB',
    status: 'active',
    balance: 1540.6,
  },
  {
    name: 'Andreas Fuchs',
    email: 'andreas.fuchs@example.de',
    handle: '@foxyfuchs',
    location: 'Mainz, RP',
    status: 'inactive',
    balance: 275.0,
  },
  {
    name: 'Birgit Schröder',
    email: 'birgit.schroeder@example.de',
    handle: '@bierbotschafterin',
    location: 'Rostock, MV',
    status: 'active',
    balance: 1680.9,
  },
  {
    name: 'Markus Vogel',
    email: 'markus.vogel@example.de',
    handle: '@vogelvibes',
    location: 'Kiel, SH',
    status: 'active',
    balance: 420.75,
  },
];

export const IntegratedWithTable = meta.story({
  parameters: {
    controls: { exclude: ['selectedItemCount', 'onClearSelection'] },
  },
  render: () => (
    <Scrollable height="400px">
      <Table
        aria-label="User accounts"
        selectionMode="multiple"
        defaultSelectedKeys={
          new Set(['fritz.schneider@example.de', 'klaus.becker@example.de'])
        }
        actionBar={() => (
          <ActionBar>
            <ActionBar.Button onPress={() => alert('Edit')}>
              <Edit />
              <span>Edit</span>
            </ActionBar.Button>
            <ActionBar.Button onPress={() => alert('Copy')}>
              <Copy />
              <span>Copy</span>
            </ActionBar.Button>
            <ActionBar.Button onPress={() => alert('Delete')}>
              <Delete />
              <span>Delete</span>
            </ActionBar.Button>
          </ActionBar>
        )}
      >
        <Table.Header sticky>
          <Table.Column rowHeader>Name</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Location</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column alignX="right">Balance</Table.Column>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.email} id={user.email}>
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
    </Scrollable>
  ),
});

export const NoSelection = meta.story({
  render: args => (
    <div>
      <p>No items selected no action bar will show up</p>
      <ActionBar {...args}>
        <ActionBar.Button aria-label="Edit">
          <Edit />
        </ActionBar.Button>
        <ActionBar.Button aria-label="Copy">
          <Copy />
        </ActionBar.Button>
        <ActionBar.Button aria-label="Delete">
          <Delete />
        </ActionBar.Button>
      </ActionBar>
    </div>
  ),
});

export const WithActionButtonPress = meta.story({
  args: {
    selectedItemCount: 1,
    onClearSelection: fn(),
  },
  render: args => (
    <ActionBar {...args}>
      <ActionBar.Button onPress={args.onClearSelection}>
        <Edit />
        <span>Edit</span>
      </ActionBar.Button>
    </ActionBar>
  ),
});

const selectAllUsers = [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
  { name: 'Carol', email: 'carol@example.com' },
];

export const SelectAllTable = meta.story({
  parameters: {
    controls: { exclude: ['selectedItemCount', 'onClearSelection'] },
  },
  render: () => (
    <Table
      aria-label="Select all test"
      selectionMode="multiple"
      actionBar={() => (
        <ActionBar>
          <ActionBar.Button>
            <Edit />
            <span>Edit</span>
          </ActionBar.Button>
        </ActionBar>
      )}
    >
      <Table.Header>
        <Table.Column rowHeader>Name</Table.Column>
        <Table.Column>Email</Table.Column>
      </Table.Header>
      <Table.Body>
        {selectAllUsers.map(u => (
          <Table.Row key={u.email} id={u.email}>
            <Table.Cell>{u.name}</Table.Cell>
            <Table.Cell>{u.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
});
