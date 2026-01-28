import { useState } from 'react';
import { Badge, Stack, Switch, TableView } from '@marigold/components';
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
        <TableView
          key={overflow}
          aria-label="Table with custom column widths"
          overflow={overflow}
        >
          <TableView.Header>
            <TableView.Column width={40}>ID</TableView.Column>
            <TableView.Column minWidth={100}>Name</TableView.Column>
            <TableView.Column width={100}>Status</TableView.Column>
            <TableView.Column minWidth={100}>Location</TableView.Column>
            <TableView.Column minWidth={80} align="right">
              Balance
            </TableView.Column>
          </TableView.Header>
          <TableView.Body>
            {users.map((user, index) => (
              <TableView.Row key={user.email}>
                <TableView.Cell>{index + 1}</TableView.Cell>
                <TableView.Cell>{user.name}</TableView.Cell>
                <TableView.Cell>
                  <Badge
                    variant={user.status === 'active' ? 'success' : 'warning'}
                  >
                    {user.status}
                  </Badge>
                </TableView.Cell>
                <TableView.Cell>{user.location}</TableView.Cell>
                <TableView.Cell align="right">
                  <NumericFormat
                    value={user.balance}
                    style="currency"
                    currency="EUR"
                  />
                </TableView.Cell>
              </TableView.Row>
            ))}
          </TableView.Body>
        </TableView>
      </div>
      <Switch
        label="Truncate cell content"
        selected={overflow === 'truncate'}
        onChange={selected => setOverflow(selected ? 'truncate' : 'wrap')}
      />
    </Stack>
  );
};
