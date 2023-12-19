/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Headline } from '../Headline';
import { Stack } from '../Stack';
import { Table } from '../Table';
import { Scrollable } from './Scrollable';

const meta = {
  title: 'Components/Scrollable',
  argTypes: {},
} satisfies Meta<typeof Scrollable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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
};

export const WithTable: Story = {
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
            <Scrollable height="200px">
              <Table
                aria-label="Todos Table"
                selectionMode="multiple"
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
            <div>Some content below the table</div>
          </Stack>
        ) : (
          'Loading data ⬇️ ...... '
        )}
      </>
    );
  },
};
