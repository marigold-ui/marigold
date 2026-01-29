import { useState } from 'react';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Sidebar } from './Sidebar';

const meta = preview.meta({
  title: 'Components/Sidebar',
  component: Sidebar,
  args: {},
});

export const Basic = meta.story({
  render: () => (
    <div className="flex h-[500px] rounded border">
      <Sidebar.Provider>
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
        <main className="flex-1 p-4">
          <Sidebar.Toggle />
          <Text>Dashboard content</Text>
        </main>
      </Sidebar.Provider>
    </div>
  ),
});

export const Collapsible = meta.story({
  render: () => (
    <div className="flex h-[400px] rounded border">
      <Sidebar.Provider>
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
        <main className="flex-1 p-4">
          <Sidebar.Toggle />
          <Text>Click the toggle to collapse/expand the sidebar.</Text>
        </main>
      </Sidebar.Provider>
    </div>
  ),
});

export const Controlled = meta.story({
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="flex h-[400px] rounded border">
        <Sidebar.Provider open={open} onOpenChange={setOpen}>
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
          <main className="flex-1 p-4">
            <Sidebar.Toggle />
            <Button onPress={() => setOpen(!open)}>
              {open ? 'Close' : 'Open'} Sidebar
            </Button>
            <pre className="mt-2">Sidebar is {open ? 'open' : 'closed'}</pre>
          </main>
        </Sidebar.Provider>
      </div>
    );
  },
});
