import { useState } from 'react';
import { Badge, Stack, Table, Text } from '@marigold/components';
import type { Selection } from '@marigold/components';

export default () => {
  const users = [
    {
      id: '1',
      name: 'Hans Müller',
      email: 'hans.mueller@example.de',
      status: 'active',
    },
    {
      id: '2',
      name: 'Fritz Schneider',
      email: 'fritz.schneider@example.de',
      status: 'inactive',
    },
    {
      id: '3',
      name: 'Klaus Becker',
      email: 'klaus.becker@example.de',
      status: 'suspended',
    },
  ];

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  return (
    <Stack space={3}>
      <Table
        aria-label="Select users"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Text weight="medium">{user.name}</Text>
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Badge>{user.status}</Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Text size="sm" color="muted-foreground">
        Selected: {selectedKeys === 'all' ? 'all' : selectedKeys.size} rows
      </Text>
    </Stack>
  );
};
