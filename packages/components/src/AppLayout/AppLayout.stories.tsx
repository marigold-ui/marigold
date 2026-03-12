import { useState } from 'react';
import preview from '.storybook/preview';
import { Logout, SettingDots, User } from '@marigold/icons';
import { Badge } from '../Badge/Badge';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Headline } from '../Headline/Headline';
import { Inline } from '../Inline/Inline';
import { Inset } from '../Inset/Inset';
import { ActionMenu } from '../Menu/ActionMenu';
import { Menu } from '../Menu/Menu';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { Sidebar } from '../Sidebar/Sidebar';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TopNavigation } from '../TopNavigation/TopNavigation';
import { Block } from '../__internal__/Block';
import { AppLayout } from './AppLayout';

const meta = preview.meta({
  title: 'Components/AppLayout',
  component: AppLayout,
  parameters: {
    padding: false,
  },
});

export const Basic = meta.story({
  render: () => (
    <AppLayout>
      <AppLayout.Sidebar>
        <Block className="h-full w-64 rounded-none">Sidebar</Block>
      </AppLayout.Sidebar>
      <AppLayout.Header>
        <Block className="rounded-none">Header</Block>
      </AppLayout.Header>
      <AppLayout.Main>
        <Block className="h-full rounded-none">Main</Block>
      </AppLayout.Main>
    </AppLayout>
  ),
});

export const ScrollableContent = meta.story({
  render: () => (
    <AppLayout>
      <AppLayout.Sidebar>
        <Block className="h-full w-64 rounded-none">Sidebar</Block>
      </AppLayout.Sidebar>
      <AppLayout.Header>
        <Block className="rounded-none">Header</Block>
      </AppLayout.Header>
      <AppLayout.Main>
        <Stack space={4}>
          {Array.from({ length: 50 }, (_, i) => (
            <Block key={i}>Item {i + 1}</Block>
          ))}
        </Stack>
      </AppLayout.Main>
    </AppLayout>
  ),
});

const pages: Record<string, { label: string }> = {
  '/dashboard': { label: 'Dashboard' },
  '/analytics': { label: 'Analytics' },
  '/users': { label: 'Users' },
  '/teams': { label: 'Teams' },
  '/billing': { label: 'Billing' },
  '/general': { label: 'General' },
  '/security': { label: 'Security' },
};

const UserMenu = () => (
  <ActionMenu aria-label="User menu" variant="ghost">
    <Menu.Section title="Account">
      <Menu.Item id="profile" textValue="Profile">
        <User size={16} /> Profile
      </Menu.Item>
      <Menu.Item id="settings" textValue="Settings">
        <SettingDots size={16} /> Settings
      </Menu.Item>
      <Menu.Item id="sign-out" textValue="Sign out">
        <Logout size={16} /> Sign out
      </Menu.Item>
    </Menu.Section>
  </ActionMenu>
);

const LShapeLayout = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider defaultOpen>
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
                  <Block key={i}>Content item {i + 1}</Block>
                ))}
              </Stack>
            </Inset>
          </AppLayout.Main>
        </AppLayout>
      </Sidebar.Provider>
    </RouterProvider>
  );
};

export const WithSidebarAndTopNavigation = meta.story({
  render: () => <LShapeLayout />,
});
