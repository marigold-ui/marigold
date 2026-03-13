'use client';

import { useState } from 'react';
import {
  AppLayout,
  Badge,
  Breadcrumbs,
  Headline,
  Inline,
  Inset,
  RouterProvider,
  Sidebar,
  Stack,
  Text,
  TopNavigation,
} from '@marigold/components';
import { UserMenu } from './user-menu';

const pages: Record<string, { label: string }> = {
  '/dashboard': { label: 'Dashboard' },
  '/analytics': { label: 'Analytics' },
  '/users': { label: 'Users' },
  '/teams': { label: 'Teams' },
  '/billing': { label: 'Billing' },
  '/general': { label: 'General' },
  '/security': { label: 'Security' },
};

const AppShellPage = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider defaultOpen>
        <AppLayout>
          <AppLayout.Sidebar>
            <Sidebar>
              <Sidebar.Header>
                <Text weight="bold" fontSize="lg">
                  Acme Inc.
                </Text>
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
                <Breadcrumbs>
                  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
                  <Breadcrumbs.Item href={currentPath}>
                    {pages[currentPath]?.label}
                  </Breadcrumbs.Item>
                </Breadcrumbs>
              </TopNavigation.Middle>
              <TopNavigation.End>
                <Inline space={2} alignY="center" noWrap>
                  <Inline space={1} alignY="center" noWrap>
                    <Stack>
                      <Inline space={1} alignY="center" noWrap>
                        <Text size="sm" weight="bold">
                          Jane Doe
                        </Text>
                        <Badge variant="master">Master</Badge>
                      </Inline>
                      <Text size="xs" variant="muted">
                        Global Entertainment Solutions Inc.
                      </Text>
                    </Stack>
                  </Inline>
                  <UserMenu />
                </Inline>
              </TopNavigation.End>
            </TopNavigation>
          </AppLayout.Header>
          <AppLayout.Main>
            <Inset space={4}>
              <Stack space={4}>
                <Headline level={2}>{pages[currentPath]?.label}</Headline>
                <Text>
                  You are viewing the{' '}
                  <strong>{pages[currentPath]?.label}</strong> page.
                </Text>
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-bg-surface-sunken text-text-primary-muted rounded-lg p-4"
                  >
                    Content item {i + 1}
                  </div>
                ))}
              </Stack>
            </Inset>
          </AppLayout.Main>
        </AppLayout>
      </Sidebar.Provider>
    </RouterProvider>
  );
};

export default AppShellPage;
