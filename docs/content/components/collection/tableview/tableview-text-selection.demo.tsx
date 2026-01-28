import { useState } from 'react';
import { Badge, Stack, Switch, TableView } from '@marigold/components';

const users = [
  {
    name: 'Hans Muller',
    email: 'hans.mueller@example.de',
    location: 'Berlin, BE',
    status: 'active',
  },
  {
    name: 'Fritz Schneider',
    email: 'fritz.schneider@example.de',
    location: 'Munchen, BY',
    status: 'inactive',
  },
  {
    name: 'Klaus Becker',
    email: 'klaus.becker@example.de',
    location: 'Hamburg, HH',
    status: 'suspended',
  },
];

export default () => {
  const [allowTextSelection, setAllowTextSelection] = useState(false);

  return (
    <Stack space={3}>
      <Switch
        label="Allow Text Selection"
        selected={allowTextSelection}
        onChange={setAllowTextSelection}
      />
      <TableView
        key={String(allowTextSelection)}
        aria-label="Table demonstrating allowTextSelection prop"
        selectionMode="multiple"
        allowTextSelection={allowTextSelection}
      >
        <TableView.Header>
          <TableView.Column>Name</TableView.Column>
          <TableView.Column>Email</TableView.Column>
          <TableView.Column>Location</TableView.Column>
          <TableView.Column>Status</TableView.Column>
        </TableView.Header>
        <TableView.Body>
          {users.map(user => (
            <TableView.Row key={user.email}>
              <TableView.Cell>{user.name}</TableView.Cell>
              <TableView.Cell>{user.email}</TableView.Cell>
              <TableView.Cell>{user.location}</TableView.Cell>
              <TableView.Cell>
                <Badge>{user.status}</Badge>
              </TableView.Cell>
            </TableView.Row>
          ))}
        </TableView.Body>
      </TableView>
    </Stack>
  );
};
