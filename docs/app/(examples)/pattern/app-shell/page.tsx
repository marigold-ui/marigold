'use client';

import { useState } from 'react';
import {
  AppLayout,
  Badge,
  Breadcrumbs,
  Card,
  Headline,
  Inline,
  Inset,
  RouterProvider,
  Sidebar,
  Stack,
  Table,
  Text,
  TopNavigation,
} from '@marigold/components';
import { useResponsiveValue } from '@marigold/system';
import { UserMenu } from './user-menu';

const pages: Record<string, { label: string; parent?: string }> = {
  '/dashboard': { label: 'Dashboard' },
  '/analytics': { label: 'Analytics' },
  '/users': { label: 'Users', parent: 'Management' },
  '/teams': { label: 'Teams', parent: 'Management' },
  '/billing': { label: 'Billing', parent: 'Management' },
  '/general': { label: 'General', parent: 'Settings' },
  '/security': { label: 'Security', parent: 'Settings' },
};

const UserSection = () => (
  <Inline space={2} alignY="center" noWrap>
    <Stack>
      <Inline space={1} alignY="center" noWrap>
        <Text size="sm" weight="bold">
          Jane Doe
        </Text>
        <Badge variant="master">Master</Badge>
      </Inline>
      <Text size="xs" variant="muted">
        Acme Inc.
      </Text>
    </Stack>
    <UserMenu />
  </Inline>
);

const DashboardContent = () => (
  <Stack space={4}>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { title: 'Total Revenue', value: '45,231.89', change: '+20.1%' },
        { title: 'Active Users', value: '2,350', change: '+180' },
        { title: 'Open Tickets', value: '12', change: '-3' },
        { title: 'Uptime', value: '99.9%', change: '' },
      ].map(stat => (
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
        {[
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
        ].map(order => (
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
);

const PageContent = ({ path }: { path: string }) => {
  const page = pages[path];
  return (
    <Stack space={4}>
      <Headline level={2}>{page?.label}</Headline>
      <Text>
        Manage your {page?.label.toLowerCase()} settings and preferences.
      </Text>
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i} p={4}>
          <Text size="sm">
            {page?.label} content section {i + 1}
          </Text>
        </Card>
      ))}
    </Stack>
  );
};

const AppShellPage = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const maxVisibleItems = useResponsiveValue([2, 2, 3, undefined, undefined]);

  const page = pages[currentPath];

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider defaultOpen>
        <AppLayout>
          <AppLayout.Sidebar>
            <Sidebar>
              <Sidebar.Header>
                <Inline space={2} alignY="center" noWrap>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 36 36"
                    fill="none"
                    className="size-8 shrink-0"
                  >
                    <rect width="36" height="36" rx="8" fill="currentColor" />
                    <path
                      d="M18 8L26 26H10L18 8Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Text weight="bold" fontSize="lg">
                    Acme Inc.
                  </Text>
                </Inline>
              </Sidebar.Header>
              <Sidebar.Nav>
                <Sidebar.Item
                  href="/dashboard"
                  active={currentPath === '/dashboard'}
                >
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item
                  href="/analytics"
                  active={currentPath === '/analytics'}
                >
                  Analytics
                </Sidebar.Item>
                <Sidebar.Separator />
                <Sidebar.Item id="management" textValue="Management">
                  Management
                  <Sidebar.Item href="/users" active={currentPath === '/users'}>
                    Users
                  </Sidebar.Item>
                  <Sidebar.Item href="/teams" active={currentPath === '/teams'}>
                    Teams
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/billing"
                    active={currentPath === '/billing'}
                  >
                    Billing
                  </Sidebar.Item>
                </Sidebar.Item>
                <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
                <Sidebar.Item
                  href="/general"
                  active={currentPath === '/general'}
                >
                  General
                </Sidebar.Item>
                <Sidebar.Item
                  href="/security"
                  active={currentPath === '/security'}
                >
                  Security
                </Sidebar.Item>
              </Sidebar.Nav>
              <Sidebar.Footer>
                <Text fontSize="xs">v1.0.0</Text>
              </Sidebar.Footer>
            </Sidebar>
          </AppLayout.Sidebar>
          <AppLayout.Header>
            <TopNavigation>
              <TopNavigation.Start>
                <Sidebar.Toggle />
              </TopNavigation.Start>
              <TopNavigation.Middle>
                <Breadcrumbs maxVisibleItems={maxVisibleItems}>
                  <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
                  {page?.parent && (
                    <Breadcrumbs.Item href="#">{page.parent}</Breadcrumbs.Item>
                  )}
                  <Breadcrumbs.Item href="#">{page?.label}</Breadcrumbs.Item>
                </Breadcrumbs>
              </TopNavigation.Middle>
              <TopNavigation.End>
                <UserSection />
              </TopNavigation.End>
            </TopNavigation>
          </AppLayout.Header>
          <AppLayout.Main>
            <Inset space={4}>
              {currentPath === '/dashboard' ? (
                <DashboardContent />
              ) : (
                <PageContent path={currentPath} />
              )}
            </Inset>
          </AppLayout.Main>
        </AppLayout>
      </Sidebar.Provider>
    </RouterProvider>
  );
};

export default AppShellPage;
