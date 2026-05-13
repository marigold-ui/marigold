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
              <Text weight="bold">Acme Inc.</Text>
            </Sidebar.Header>
            <Sidebar.Nav current={currentPath}>
              <Sidebar.Item href="/dashboard">Dashboard</Sidebar.Item>
              <Sidebar.Item href="/orders">Orders</Sidebar.Item>
              <Sidebar.Item href="/products">Products</Sidebar.Item>
              <Sidebar.Separator />
              <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
              <Sidebar.Item href="/account">Account</Sidebar.Item>
              <Sidebar.Item href="/billing">Billing</Sidebar.Item>
            </Sidebar.Nav>
            <Sidebar.Footer>
              <Text fontSize="xs">jane@acme.com</Text>
            </Sidebar.Footer>
          </Sidebar>
          <main className="flex-1 p-4">
            <Sidebar.Toggle />
            <Headline level={2}>
              {currentPath
                .replace('/', '')
                .replace(/^\w/, c => c.toUpperCase())}
            </Headline>
            <Text>This is the main content area.</Text>
          </main>
        </div>
      </Sidebar.Provider>
    </RouterProvider>
  );
};
