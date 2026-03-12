import { useState } from 'react';
import { Headline, Sidebar, Text } from '@marigold/components';
import { RouterProvider } from '@marigold/components';

export default () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider>
        <div className="flex h-[400px]">
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
              <Sidebar.Item href="/orders" active={currentPath === '/orders'}>
                Orders
              </Sidebar.Item>
              <Sidebar.Item
                href="/products"
                active={currentPath === '/products'}
              >
                Products
              </Sidebar.Item>
              <Sidebar.Separator />
              <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
              <Sidebar.Item href="/account" active={currentPath === '/account'}>
                Account
              </Sidebar.Item>
              <Sidebar.Item href="/billing" active={currentPath === '/billing'}>
                Billing
              </Sidebar.Item>
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
