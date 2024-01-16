import { useEffect, useState } from 'react';

import { Headline, Scrollable, Stack, Table } from '@marigold/components';

export default () => {
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
            <Table aria-label="Todos Table" selectionMode="multiple">
              <Table.Header>
                {tableHeaders.map((header, index) => (
                  <Table.Column
                    width={index === tableHeaders.length - 1 ? 'full' : 'auto'}
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
};
