'use client';

import {
  Badge,
  Card,
  Headline,
  Inline,
  Inset,
  Stack,
  Table,
  Text,
} from '@marigold/components';

const stats = [
  { title: 'Total Revenue', value: '45,231.89', change: '+20.1%' },
  { title: 'Active Users', value: '2,350', change: '+180' },
  { title: 'Open Tickets', value: '12', change: '-3' },
  { title: 'Uptime', value: '99.9%', change: '' },
];

const orders = [
  {
    id: 'ORD-7291',
    customer: 'Sarah Miller',
    status: 'Completed',
    amount: '250.00',
  },
  {
    id: 'ORD-7290',
    customer: 'Tom Baker',
    status: 'Processing',
    amount: '125.50',
  },
  {
    id: 'ORD-7289',
    customer: 'Lisa Chen',
    status: 'Completed',
    amount: '89.99',
  },
  {
    id: 'ORD-7288',
    customer: 'Mark Johnson',
    status: 'Pending',
    amount: '340.00',
  },
  {
    id: 'ORD-7287',
    customer: 'Anna Schmidt',
    status: 'Completed',
    amount: '175.25',
  },
];

export const DashboardContent = () => (
  <Inset space={4}>
    <Stack space={4}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title} p={4}>
            <Stack space={1}>
              <Text size="xs" variant="muted">
                {stat.title}
              </Text>
              <Inline space={2} alignY="bottom">
                <Text size="xl" weight="bold">
                  {stat.value}
                </Text>
                {stat.change && (
                  <Text
                    size="xs"
                    color={stat.change.startsWith('+') ? 'green' : 'red'}
                  >
                    {stat.change}
                  </Text>
                )}
              </Inline>
            </Stack>
          </Card>
        ))}
      </div>
      <Headline level={3}>Recent orders</Headline>
      <Table aria-label="Recent orders" selectionMode="none">
        <Table.Header>
          <Table.Column>Order</Table.Column>
          <Table.Column>Customer</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Amount</Table.Column>
        </Table.Header>
        <Table.Body>
          {orders.map(order => (
            <Table.Row key={order.id}>
              <Table.Cell>
                <Text weight="bold">{order.id}</Text>
              </Table.Cell>
              <Table.Cell>{order.customer}</Table.Cell>
              <Table.Cell>
                <Badge
                  variant={
                    order.status === 'Completed'
                      ? 'success'
                      : order.status === 'Processing'
                        ? 'info'
                        : 'warning'
                  }
                >
                  {order.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>${order.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  </Inset>
);
