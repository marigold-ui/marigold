import { Copy } from 'lucide-react';
import { useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Delete, Edit } from '@marigold/icons';
import { Headline } from '../Headline/Headline';
import { Scrollable } from '../Scrollable/Scrollable';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import type { Selection } from '../types';
import { ActionBar } from './ActionBar';
import { ActionBarContainer } from './ActionBarContainer';
import { useActionBarTrigger } from './useActionBarTrigger';

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

export const WithTable = meta.story({
  parameters: {
    controls: { exclude: ['selectedItemCount', 'onClearSelection'] },
  },
  render: () => {
    const {
      selectedKeys,
      onSelectionChange,
      selectedItemCount,
      clearSelection,
    } = useActionBarTrigger({ defaultSelectedKeys: new Set(['2']) });

    return (
      <div className="w-125">
        <Stack space={4} alignX="center">
          <Table
            aria-label="Table with action bar"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={onSelectionChange}
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
          <ActionBar
            selectedItemCount={selectedItemCount}
            onClearSelection={clearSelection}
          >
            <ActionBar.Button onPress={() => alert('Edit selected items')}>
              <Edit />
              <span>Edit</span>
            </ActionBar.Button>
            <ActionBar.Button onPress={() => alert('Copy selected items')}>
              <Copy />
              <span>Copy</span>
            </ActionBar.Button>
            <ActionBar.Button onPress={() => alert('Delete selected items')}>
              <Delete />
              <span>Delete</span>
            </ActionBar.Button>
          </ActionBar>
        </Stack>
      </div>
    );
  },
});

export const WithActionBarContainer = meta.story({
  parameters: {
    controls: { exclude: ['selectedItemCount', 'onClearSelection'] },
  },
  render: () => {
    const {
      selectedKeys,
      onSelectionChange,
      selectedItemCount,
      clearSelection,
    } = useActionBarTrigger();

    return (
      <div className="w-125">
        <ActionBarContainer
          actionBar={
            <ActionBar
              selectedItemCount={selectedItemCount}
              onClearSelection={clearSelection}
            >
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
          }
        >
          <Table
            aria-label="Table with ActionBarContainer"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={onSelectionChange}
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
        </ActionBarContainer>
      </div>
    );
  },
});

export const WithScrollableContent = meta.story({
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(['1']));

    const manyRows = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Pokemon ${i + 1}`,
      type: ['Fire', 'Water', 'Grass', 'Electric'][i % 4],
      level: `${Math.floor(Math.random() * 100)}`,
    }));

    const selectedItemCount =
      selectedKeys === 'all' ? ('all' as const) : selectedKeys.size;

    return (
      <div className="w-125">
        <Headline level={3}>Scrollable Table with ActionBar</Headline>
        <ActionBarContainer
          actionBar={
            <ActionBar
              selectedItemCount={selectedItemCount}
              onClearSelection={() => setSelectedKeys(new Set())}
            >
              <ActionBar.Button onPress={() => alert('Edit')}>
                <Edit />
                <span>Edit</span>
              </ActionBar.Button>
              <ActionBar.Button onPress={() => alert('Delete')}>
                <Delete />
                <span>Delete</span>
              </ActionBar.Button>
            </ActionBar>
          }
        >
          <Scrollable height="300px">
            <Table
              aria-label="Scrollable Table"
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <Table.Header columns={columns}>
                {column => (
                  <Table.Column rowHeader={column.rowHeader} id={column.id}>
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={manyRows}>
                {item => (
                  <Table.Row columns={columns}>
                    {column => (
                      <Table.Cell>
                        {item[column.id as keyof typeof item]}
                      </Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Scrollable>
        </ActionBarContainer>
      </div>
    );
  },
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
