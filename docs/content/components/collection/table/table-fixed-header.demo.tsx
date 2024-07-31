import { useEffect, useState } from 'react';
import { Scrollable, Table } from '@marigold/components';

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
      {tableHeaders.length ? (
        <Scrollable height="400px">
          <Table aria-label="Todos Table" selectionMode="multiple" stickyHeader>
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
      ) : (
        'Loading data ⬇️ ...... '
      )}
    </>
  );
};
