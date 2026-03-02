import type { ReactNode } from 'react';
import { useState } from 'react';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Sidebar } from './Sidebar';

const meta = preview.meta({
  title: 'Components/Sidebar',
  component: Sidebar,
  args: {},
  parameters: {
    padding: false,
  },
});

const Layout = ({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) => (
  <div className="flex h-screen">
    {sidebar}
    <main className="flex-1 p-4">
      <Sidebar.Toggle />
      {children}
    </main>
  </div>
);

export const Basic = meta.story({
  render: () => (
    <Sidebar.Provider>
      <Layout
        sidebar={
          <Sidebar>
            <Sidebar.Header>
              <Text weight="bold">Admin Panel</Text>
            </Sidebar.Header>
            <Sidebar.Content>
              <Sidebar.Group>
                <Sidebar.GroupLabel>Main</Sidebar.GroupLabel>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton active href="#">
                      Overview
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton href="#">Analytics</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Group>
              <Sidebar.Group>
                <Sidebar.GroupLabel>Management</Sidebar.GroupLabel>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton href="#">Users</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton href="#">Teams</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton href="#">Billing</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Group>
            </Sidebar.Content>
            <Sidebar.Footer>
              <Text fontSize="xs">Logged in as admin</Text>
            </Sidebar.Footer>
          </Sidebar>
        }
      >
        <Text>Dashboard content</Text>
      </Layout>
    </Sidebar.Provider>
  ),
});

export const Collapsible = meta.story({
  render: () => (
    <Sidebar.Provider>
      <Layout
        sidebar={
          <Sidebar>
            <Sidebar.Header>
              <Text weight="bold">App</Text>
            </Sidebar.Header>
            <Sidebar.Content>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton active>Home</Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton>About</Sidebar.MenuButton>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.Content>
          </Sidebar>
        }
      >
        <Text>Click the toggle to collapse/expand the sidebar.</Text>
      </Layout>
    </Sidebar.Provider>
  ),
});

export const Controlled = meta.story({
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Sidebar.Provider open={open} onOpenChange={setOpen}>
        <Layout
          sidebar={
            <Sidebar>
              <Sidebar.Header>
                <Text weight="bold">Controlled</Text>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton active>Home</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Content>
            </Sidebar>
          }
        >
          <Button onPress={() => setOpen(!open)}>
            {open ? 'Close' : 'Open'} Sidebar
          </Button>
          <pre className="mt-2">Sidebar is {open ? 'open' : 'closed'}</pre>
        </Layout>
      </Sidebar.Provider>
    );
  },
});
