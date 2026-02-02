import { Badge, Stack, Table, Text } from '@marigold/components';
import { NumericFormat } from '@marigold/system';

export default () => {
  const users = [
    {
      name: 'Hans Müller',
      email: 'hans.mueller@example.de',
      handle: '@schnitzelmeister',
      location: 'Berlin, BE',
      status: 'active',
      balance: 1250.75,
    },
    {
      name: 'Fritz Schneider',
      email: 'fritz.schneider@example.de',
      handle: '@wurstwhiz',
      location: 'München, BY',
      status: 'inactive',
      balance: 980.5,
    },
    {
      name: 'Klaus Becker',
      email: 'klaus.becker@example.de',
      handle: '@pretzelpirate',
      location: 'Hamburg, HH',
      status: 'suspended',
      balance: 0.0,
    },
  ];

  return (
    <Table aria-label="User accounts">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Location</Table.Column>
        <Table.Column>Status</Table.Column>
        <Table.Column align="right">Balance</Table.Column>
      </Table.Header>
      <Table.Body>
        {users.map(user => (
          <Table.Row key={user.email}>
            <Table.Cell>
              <Stack space="0.5">
                <Text weight="medium">{user.name}</Text>
                <Text size="xs" color="muted-foreground">
                  {user.handle}
                </Text>
              </Stack>
            </Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.location}</Table.Cell>
            <Table.Cell>
              <Badge>{user.status}</Badge>
            </Table.Cell>
            <Table.Cell align="right">
              <NumericFormat
                style="currency"
                currency="EUR"
                value={user.balance}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
