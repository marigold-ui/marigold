import { useState } from 'react';
import { Badge, Stack, Switch, Table } from '@marigold/components';
import { NumericFormat } from '@marigold/system';

const users = [
  {
    name: 'Hans Muller',
    email: 'hans.mueller@example.de',
    location: 'Berlin, BE',
    status: 'active',
    balance: 1250.75,
  },
  {
    name: 'Fritz Schneider',
    email: 'fritz.schneider@example.de',
    location: 'Munchen, BY',
    status: 'inactive',
    balance: 980.5,
  },
  {
    name: 'Klaus Becker',
    email: 'klaus.becker@example.de',
    location: 'Hamburg, HH',
    status: 'suspended',
    balance: 0.0,
  },
  {
    name: 'Helga Fischer',
    email: 'helga.fischer@example.de',
    location: 'Stuttgart, BW',
    status: 'active',
    balance: 2300.1,
  },
  {
    name: 'Ursula Weber',
    email: 'ursula.weber@example.de',
    location: 'Frankfurt, HE',
    status: 'active',
    balance: 150.25,
  },
];

export default () => {
  const [overflow, setOverflow] = useState<'truncate' | 'wrap'>('wrap');

  return (
    <Stack space={3}>
      <div className="max-w-2xl resize-x overflow-x-auto border border-stone-800">
        <Table
          key={overflow}
          aria-label="Table with custom column widths"
          overflow={overflow}
        >
          <Table.Header>
            <Table.Column width={40}>ID</Table.Column>
            <Table.Column minWidth={100}>Name</Table.Column>
            <Table.Column width={100}>Status</Table.Column>
            <Table.Column minWidth={100}>Location</Table.Column>
            <Table.Column minWidth={80} align="right">
              Balance
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {users.map((user, index) => (
              <Table.Row key={user.email}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={user.status === 'active' ? 'success' : 'warning'}
                  >
                    {user.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{user.location}</Table.Cell>
                <Table.Cell align="right">
                  <NumericFormat
                    value={user.balance}
                    style="currency"
                    currency="EUR"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <Switch
        label="Truncate cell content"
        selected={overflow === 'truncate'}
        onChange={selected => setOverflow(selected ? 'truncate' : 'wrap')}
      />
    </Stack>
  );
};
