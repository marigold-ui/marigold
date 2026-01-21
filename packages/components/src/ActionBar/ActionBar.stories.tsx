import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { Headline, Scrollable } from '@marigold/components';
import { Delete, Edit } from '@marigold/icons';
import preview from '../../../../.storybook/preview';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import type { Selection } from '../types';
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
      },
    },
    isEmphasized: {
      control: { type: 'boolean' },
      description: 'Display with emphasized styling',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClearSelection: {
      description: 'Handler for clear button press',
    },
  },
  args: {
    isEmphasized: false,
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

export const Emphasized = meta.story({
  args: {
    selectedItemCount: 5,
    isEmphasized: true,
  },
  render: args => (
    <ActionBar {...args}>
      <ActionBar.Button>
        <Edit />
        <span>Edit</span>
      </ActionBar.Button>
      <ActionBar.Button>
        <Copy />
        <span>Copy</span>
      </ActionBar.Button>
      <ActionBar.Button>
        <Delete />
        <span>Delete</span>
      </ActionBar.Button>
    </ActionBar>
  ),
});

export const IconOnly = meta.story({
  args: {
    selectedItemCount: 2,
  },
  render: args => (
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

export const WithTable = meta.story({
  parameters: {
    controls: { exclude: ['selectedItemCount', 'onClearSelection'] },
  },
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(['2']));

    const rows = [
      { id: '1', name: 'Charizard', type: 'Fire, Flying', level: '67' },
      { id: '2', name: 'Blastoise', type: 'Water', level: '56' },
      { id: '3', name: 'Venusaur', type: 'Grass, Poison', level: '83' },
      { id: '4', name: 'Pikachu', type: 'Electric', level: '100' },
    ];

    return (
      <div className="w-125">
        <Stack space={4} alignX="center">
          <Table
            aria-label="Table with action bar"
            selectionMode="multiple"
            stretch={true}
            selectedKeys={selectedKeys}
            onSelectionChange={keys =>
              setSelectedKeys(
                keys === 'all' ? new Set(rows.map(r => r.id)) : keys
              )
            }
          >
            <Table.Header>
              <Table.Column key="name" isRowHeader>
                Name
              </Table.Column>
              <Table.Column key="type">Type</Table.Column>
              <Table.Column key="level">Level</Table.Column>
            </Table.Header>
            <Table.Body items={rows}>
              {item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.type}</Table.Cell>
                  <Table.Cell>{item.level}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <ActionBar
            selectedItemCount={
              selectedKeys === 'all' ? 'all' : selectedKeys.size
            }
            onClearSelection={() => setSelectedKeys(new Set())}
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

export const WithScrollableContent = meta.story({
  render: args => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(
      new Set(['delectus aut autem-1'])
    );
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
        <Headline level={3}>My Headline</Headline>
        {tableHeaders.length ? (
          <Stack space={4} alignX="center">
            <Scrollable height="200px" {...args}>
              <Table
                aria-label="Todos Table"
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={keys =>
                  setSelectedKeys(
                    keys === 'all'
                      ? new Set(todos.map(r => `${r.title}-${r.id}`))
                      : keys
                  )
                }
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
                <Table.Body items={todos}>
                  {todo => (
                    <Table.Row key={`${todo.title}-${todo.id}`}>
                      <Table.Cell>{todo.id}</Table.Cell>
                      <Table.Cell>{todo.userId}</Table.Cell>
                      <Table.Cell>{todo.title}</Table.Cell>
                      <Table.Cell>{JSON.stringify(todo.completed)}</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </Scrollable>
            <ActionBar
              selectedItemCount={
                selectedKeys === 'all' ? 'all' : selectedKeys.size
              }
              onClearSelection={() => setSelectedKeys(new Set())}
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
        ) : (
          'Loading data ⬇️ ...... '
        )}
      </>
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
