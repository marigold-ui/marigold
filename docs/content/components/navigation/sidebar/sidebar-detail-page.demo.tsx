import { useState } from 'react';
import {
  Breadcrumbs,
  Headline,
  Inline,
  Link,
  NumericFormat,
  RouterProvider,
  Sidebar,
  Stack,
  Table,
  Text,
} from '@marigold/components';

const orders = [
  { id: 'ORD-4712', customer: 'Anna Schmidt', total: 129 },
  { id: 'ORD-4713', customer: 'Max Weber', total: 84.5 },
  { id: 'ORD-4714', customer: 'Lena Fischer', total: 212 },
];

const pages: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/orders': 'Orders',
  '/customers': 'Customers',
};

const OrderList = () => (
  <Stack space={4}>
    <Headline level={2}>Orders</Headline>
    <Table aria-label="Orders" selectionMode="none">
      <Table.Header>
        <Table.Column>Order</Table.Column>
        <Table.Column>Customer</Table.Column>
        <Table.Column>Total</Table.Column>
      </Table.Header>
      <Table.Body>
        {orders.map(order => (
          <Table.Row key={order.id}>
            <Table.Cell>
              <Link href={`/orders/${order.id}`}>{order.id}</Link>
            </Table.Cell>
            <Table.Cell>{order.customer}</Table.Cell>
            <Table.Cell>
              <NumericFormat
                value={order.total}
                style="currency"
                currency="EUR"
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Stack>
);

const OrderDetail = ({ id }: { id: string }) => {
  const order = orders.find(o => o.id === id);
  if (!order) return null;

  return (
    <Stack space={4}>
      <Headline level={2}>{order.id}</Headline>
      <Text>
        Customer: {order.customer}
        <br />
        Total:{' '}
        <NumericFormat value={order.total} style="currency" currency="EUR" />
      </Text>
    </Stack>
  );
};

export default () => {
  const [currentPath, setCurrentPath] = useState('/orders');

  const orderMatch = currentPath.match(/^\/orders\/(.+)$/);
  const selectedOrder = orderMatch?.[1] ?? null;
  const activePath = selectedOrder ? '/orders' : currentPath;

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider>
        <div className="flex h-100">
          <Sidebar>
            <Sidebar.Header>
              <Text weight="bold">My App</Text>
            </Sidebar.Header>
            <Sidebar.Nav current={currentPath}>
              <Sidebar.Item href="/dashboard">Dashboard</Sidebar.Item>
              <Sidebar.Item href="/orders">Orders</Sidebar.Item>
              <Sidebar.Item href="/customers">Customers</Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar>
          <main className="grid flex-1 grid-rows-[auto_1fr] gap-8 overflow-auto pl-4">
            <Inline alignY="center">
              <Sidebar.Toggle />
              <Breadcrumbs>
                <Breadcrumbs.Item href={activePath}>
                  {pages[activePath] ?? activePath}
                </Breadcrumbs.Item>
                {selectedOrder && (
                  <Breadcrumbs.Item href={`/orders/${selectedOrder}`}>
                    {selectedOrder}
                  </Breadcrumbs.Item>
                )}
              </Breadcrumbs>
            </Inline>
            {activePath === '/orders' && !selectedOrder && <OrderList />}
            {activePath === '/orders' && selectedOrder && (
              <OrderDetail id={selectedOrder} />
            )}
            {activePath === '/dashboard' && (
              <Headline level={2}>Dashboard</Headline>
            )}
            {activePath === '/customers' && (
              <Headline level={2}>Customers</Headline>
            )}
          </main>
        </div>
      </Sidebar.Provider>
    </RouterProvider>
  );
};
