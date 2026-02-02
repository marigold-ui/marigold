import { useEffect, useState } from 'react';
import { Scrollable, Stack, Table } from '@marigold/components';

export default () => {
  const [users, setUsers] = useState<
    { id: number; name: string; username: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setUsers(data);
      });
  }, []);

  return (
    <>
      {!loading ? (
        <Scrollable height="300px">
          <Table aria-label="user Table" selectionMode="multiple">
            <Table.Header sticky>
              <Table.Column>Id</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>User</Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map(user => (
                <Table.Row key={`${user.name}-${user.id}`}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>
                    <Stack>
                      {user.username}
                      <span className="text-text-info text-xs">
                        {user.email}
                      </span>
                    </Stack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Scrollable>
      ) : (
        'Loading data ...... '
      )}
    </>
  );
};
