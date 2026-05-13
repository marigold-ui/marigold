import { useState } from 'react';
import type { SidebarProviderProps } from '@marigold/components';
import { RouterProvider, Sidebar, Text } from '@marigold/components';

export default (props: SidebarProviderProps) => {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider {...props}>
        <div className="flex h-100 w-full">
          <Sidebar>
            <Sidebar.Header>
              <Text weight="bold">Acme Inc.</Text>
            </Sidebar.Header>
            <Sidebar.Nav current={currentPath}>
              <Sidebar.Item href="/dashboard">Dashboard</Sidebar.Item>
              <Sidebar.Item href="/orders">Orders</Sidebar.Item>
              <Sidebar.Item id="products" textValue="Products">
                Products
                <Sidebar.Item href="/all-products">All products</Sidebar.Item>
                <Sidebar.Item href="/categories">Categories</Sidebar.Item>
                <Sidebar.Item href="/inventory">Inventory</Sidebar.Item>
              </Sidebar.Item>
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
          </main>
        </div>
      </Sidebar.Provider>
    </RouterProvider>
  );
};
