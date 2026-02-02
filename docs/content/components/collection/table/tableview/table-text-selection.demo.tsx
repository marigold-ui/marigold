import { useState } from 'react';
import { Badge, Stack, Switch, Table } from '@marigold/components';

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
      <Table
        key={String(allowTextSelection)}
        aria-label="Table demonstrating allowTextSelection prop"
        selectionMode="multiple"
        allowTextSelection={allowTextSelection}
      >
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Location</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.email}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.location}</Table.Cell>
              <Table.Cell>
                <Badge>{user.status}</Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};
