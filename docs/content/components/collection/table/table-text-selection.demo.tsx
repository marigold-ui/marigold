import { useState } from 'react';
import { Stack, Switch, Table, Text } from '@marigold/components';

export default () => {
  const [allowTextSelection, setAllowTextSelection] = useState(false);

  const users = [
    { id: '1', name: 'Hans Müller', email: 'hans.mueller@example.de' },
    { id: '2', name: 'Fritz Schneider', email: 'fritz.schneider@example.de' },
    { id: '3', name: 'Klaus Becker', email: 'klaus.becker@example.de' },
  ];

  return (
    <Stack space={3}>
      <Switch
        label="Allow text selection"
        selected={allowTextSelection}
        onChange={setAllowTextSelection}
      />

      <Table
        key={String(allowTextSelection)}
        aria-label="Table with text selection"
        selectionMode="multiple"
        allowTextSelection={allowTextSelection}
      >
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Email</Table.Column>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Text weight="medium">{user.name}</Text>
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};
