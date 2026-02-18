import { Copy } from 'lucide-react';
import { expect, fn, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Delete, Edit } from '@marigold/icons';
import { Table } from '../Table/Table';
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

const rows = [
  { id: '1', name: 'Charizard', type: 'Fire, Flying', level: '67' },
  { id: '2', name: 'Blastoise', type: 'Water', level: '56' },
  { id: '3', name: 'Venusaur', type: 'Grass, Poison', level: '83' },
  { id: '4', name: 'Pikachu', type: 'Electric', level: '100' },
];

const columns = [
  { name: 'Name', id: 'name' as const, rowHeader: true },
  { name: 'Type', id: 'type' as const, rowHeader: false },
  { name: 'Level', id: 'level' as const, rowHeader: false },
];

export const IntegratedWithTable = meta.story({
  parameters: {
    controls: { exclude: ['selectedItemCount', 'onClearSelection'] },
  },
  render: () => (
    <div className="w-125">
      <Table
        aria-label="Table with integrated ActionBar"
        selectionMode="multiple"
        actionBar={_selectedKeys => (
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
        <Table.Header columns={columns}>
          {column => (
            <Table.Column rowHeader={column.rowHeader} id={column.id}>
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row columns={columns}>
              {column => <Table.Cell>{item[column.id]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
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
