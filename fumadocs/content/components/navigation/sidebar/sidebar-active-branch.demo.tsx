import { useState } from 'react';
import { Headline, Sidebar, Text } from '@marigold/components';
import { RouterProvider } from '@marigold/components';

export default () => {
  const [currentPath, setCurrentPath] = useState('/categories');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider>
        <div className="flex h-100">
          <Sidebar>
            <Sidebar.Header>
              <Text weight="bold">Shop Admin</Text>
            </Sidebar.Header>
            <Sidebar.Nav>
              <Sidebar.Item
                href="/dashboard"
                active={currentPath === '/dashboard'}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item id="products" textValue="Products">
                Products
                <Sidebar.Item
                  href="/all-products"
                  active={currentPath === '/all-products'}
                >
                  All products
                </Sidebar.Item>
                <Sidebar.Item
                  href="/categories"
                  active={currentPath === '/categories'}
                >
                  Categories
                </Sidebar.Item>
                <Sidebar.Item
                  href="/inventory"
                  active={currentPath === '/inventory'}
                >
                  Inventory
                </Sidebar.Item>
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
          <main className="flex-1 p-4">
            <Sidebar.Toggle />
            <Headline level={2}>
              {currentPath
                .replace('/', '')
                .replace(/-/g, ' ')
                .replace(/^\w/, c => c.toUpperCase())}
            </Headline>
            <Text>
              The "Products" branch opens automatically because "Categories" is
              the active page.
            </Text>
          </main>
        </div>
      </Sidebar.Provider>
    </RouterProvider>
  );
};
