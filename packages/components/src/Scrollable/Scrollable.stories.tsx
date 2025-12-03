import { useEffect } from 'react';
import { useState } from 'storybook/preview-api';
import preview from '../../../../config/storybook/.storybook/preview';
import { Card } from '../Card/Card';
import { Headline } from '../Headline/Headline';
import { List } from '../List/List';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { Scrollable } from './Scrollable';

const meta = preview.meta({
  title: 'Components/Scrollable',
  argTypes: {
    width: {
      control: {
        type: 'text',
      },
      description:
        'Set the width of the container. For that we use the width tailwind values.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'full' },
      },
    },
    height: {
      control: {
        type: 'text',
      },
      description:
        'Set the height of the container. We use strings as pixel values.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
  },
  args: {},
});

export const Vertical = meta.story({
  render: args => (
    <Scrollable height="200px" width="1/5" {...args}>
      <div>
        This is some additional text that is always visible! Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
        sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet
        est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum
        sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget
        tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus
        enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.
        Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue,
        eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
        tincidunt quis, accumsan porttitor, facilisis luctus, metus
      </div>
    </Scrollable>
  ),
});

export const Horizontal = meta.story({
  render: args => (
    <Scrollable {...args}>
      <div className="flex gap-2">
        <Card>
          <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
        </Card>
        <Card>
          <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
        </Card>
        <Card>
          <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
        </Card>
        <Card>
          <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
        </Card>
        <Card>
          <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
        </Card>
        <Card>
          <div className="h-[100px] w-[200px] border border-[#ced4da] bg-[#e9ecef]" />
        </Card>
      </div>
    </Scrollable>
  ),
});

export const WithTable = meta.story({
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
        <Headline level={3}>My Headline</Headline>
        {tableHeaders.length ? (
          <Stack space={4}>
            <Scrollable height="200px" {...args}>
              <Table aria-label="Todos Table" selectionMode="multiple">
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
            <div>Some content below the table</div>
          </Stack>
        ) : (
          'Loading data ⬇️ ...... '
        )}
      </>
    );
  },
});

export const ListScrolling = meta.story({
  render: args => (
    <Card p={3}>
      <Scrollable height="200px" {...args}>
        <Headline level={3}>Burger Menu</Headline>
        <List>
          <List.Item>
            Crispy Chicken Burger
            <List>
              <List.Item>Hähnchen Filet im Crunchy Cornflakes Mantel</List.Item>
            </List>
          </List.Item>
          <List.Item>
            Cream Cheese Chicken Burger
            <List>
              <List.Item>Hähnchen Filet im Crunchy Cornflakes Mantel</List.Item>
              <List.Item>Rucola</List.Item>
              <List.Item>Frischkäse</List.Item>
            </List>
          </List.Item>
          <List.Item>
            Farmer
            <List>
              <List.Item>Rindfleisch</List.Item>
              <List.Item>Bacon</List.Item>
              <List.Item>Spiegelei</List.Item>
            </List>
          </List.Item>
        </List>
      </Scrollable>
    </Card>
  ),
});
