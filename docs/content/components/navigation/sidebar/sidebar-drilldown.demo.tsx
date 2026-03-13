import { useState } from 'react';
import { Headline, Sidebar, Text } from '@marigold/components';
import { RouterProvider } from '@marigold/components';

export default () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider>
        <div className="flex h-100">
          <Sidebar>
            <Sidebar.Header>
              <Text weight="bold">My App</Text>
            </Sidebar.Header>
            <Sidebar.Nav>
              <Sidebar.Item
                href="/dashboard"
                active={currentPath === '/dashboard'}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="/orders" active={currentPath === '/orders'}>
                Orders
              </Sidebar.Item>
              <Sidebar.Item
                href="/customers"
                active={currentPath === '/customers'}
              >
                Customers
              </Sidebar.Item>
              <Sidebar.Separator />
              <Sidebar.Item id="settings" textValue="Settings">
                Settings
                <Sidebar.Item
                  href="/settings/profile"
                  active={currentPath === '/settings/profile'}
                >
                  Profile
                </Sidebar.Item>
                <Sidebar.Item
                  href="/settings/notifications"
                  active={currentPath === '/settings/notifications'}
                >
                  Notifications
                </Sidebar.Item>
                <Sidebar.Item
                  href="/settings/security"
                  active={currentPath === '/settings/security'}
                >
                  Security
                </Sidebar.Item>
              </Sidebar.Item>
            </Sidebar.Nav>
          </Sidebar>
          <main className="flex-1 p-4">
            <Sidebar.Toggle />
            <Headline level={2}>
              {currentPath
                .replace(/^\/settings\//, '')
                .replace('/', '')
                .replace(/-/g, ' ')
                .replace(/^\w/, c => c.toUpperCase())}
            </Headline>
            <Text>Click "Settings" to see the drill-down panel.</Text>
          </main>
        </div>
      </Sidebar.Provider>
    </RouterProvider>
  );
};
