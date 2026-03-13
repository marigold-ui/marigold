import { useState } from 'react';
import {
  AppLayout,
  Breadcrumbs,
  Headline,
  Inset,
  RouterProvider,
  Sidebar,
  Stack,
  Text,
  TopNavigation,
} from '@marigold/components';

const pages: Record<string, { label: string }> = {
  '/dashboard': { label: 'Dashboard' },
  '/analytics': { label: 'Analytics' },
  '/users': { label: 'Users' },
  '/teams': { label: 'Teams' },
  '/settings': { label: 'Settings' },
};

export default () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider defaultOpen>
        <div className="[&>div]:h-full">
          <AppLayout>
            <AppLayout.Sidebar>
              <Sidebar>
                <Sidebar.Header>
                  <Text weight="bold">Acme Inc.</Text>
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
                  <Sidebar.GroupLabel>Organization</Sidebar.GroupLabel>
                  <Sidebar.Item href="/users" active={currentPath === '/users'}>
                    Users
                  </Sidebar.Item>
                  <Sidebar.Item href="/teams" active={currentPath === '/teams'}>
                    Teams
                  </Sidebar.Item>
                  <Sidebar.Separator />
                  <Sidebar.Item
                    href="/settings"
                    active={currentPath === '/settings'}
                  >
                    Settings
                  </Sidebar.Item>
                </Sidebar.Nav>
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
                  {Array.from({ length: 15 }, (_, i) => (
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
        </div>
      </Sidebar.Provider>
    </RouterProvider>
  );
};
