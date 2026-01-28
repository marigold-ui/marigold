import { useEffect, useState } from 'react';
import { Stack, TableView } from '@marigold/components';

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
        <TableView aria-label="user Table" selectionMode="multiple">
          <TableView.Header>
            <TableView.Column>Id</TableView.Column>
            <TableView.Column>Name</TableView.Column>
            <TableView.Column>User</TableView.Column>
          </TableView.Header>
          <TableView.Body>
            {users.map(user => (
              <TableView.Row key={`${user.name}-${user.id}`}>
                <TableView.Cell>{user.id}</TableView.Cell>
                <TableView.Cell>{user.name}</TableView.Cell>
                <TableView.Cell>
                  <Stack>
                    {user.username}
                    <span className="text-text-info text-xs">{user.email}</span>
                  </Stack>
                </TableView.Cell>
              </TableView.Row>
            ))}
          </TableView.Body>
        </TableView>
      ) : (
        'Loading data ...... '
      )}
    </>
  );
};
