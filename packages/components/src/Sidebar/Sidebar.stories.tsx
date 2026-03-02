import type { ReactNode } from 'react';
import { useState } from 'react';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Headline } from '../Headline/Headline';
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

const pages = {
  overview: { label: 'Overview' },
  analytics: { label: 'Analytics' },
  users: { label: 'Users' },
  teams: { label: 'Teams' },
  billing: { label: 'Billing' },
  general: { label: 'General' },
  security: { label: 'Security' },
} as const;

type PageId = keyof typeof pages;

const Layout = ({
  children,
  open,
  onOpenChange,
}: {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [activePage, setActivePage] = useState<PageId>('overview');

  return (
    <Sidebar.Provider open={open} onOpenChange={onOpenChange}>
      <div className="flex h-screen">
        <Sidebar>
          <Sidebar.Header>
            <Text weight="bold">Admin Panel</Text>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.SubNav>
                <Sidebar.MenuSub id="root" label="Main">
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton
                        href="/overview"
                        active={activePage === 'overview'}
                        onPress={() => setActivePage('overview')}
                      >
                        Overview
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton
                        href="/analytics"
                        active={activePage === 'analytics'}
                        onPress={() => setActivePage('analytics')}
                      >
                        Analytics
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuSubTrigger submenuId="management">
                        Management
                      </Sidebar.MenuSubTrigger>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuSubTrigger submenuId="settings">
                        Settings
                      </Sidebar.MenuSubTrigger>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.MenuSub>

                <Sidebar.MenuSub id="management" label="Management">
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton
                        href="/users"
                        active={activePage === 'users'}
                        onPress={() => setActivePage('users')}
                      >
                        Users
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton
                        href="/teams"
                        active={activePage === 'teams'}
                        onPress={() => setActivePage('teams')}
                      >
                        Teams
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton
                        href="/billing"
                        active={activePage === 'billing'}
                        onPress={() => setActivePage('billing')}
                      >
                        Billing
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.MenuSub>

                <Sidebar.MenuSub id="settings" label="Settings">
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton
                        href="/general"
                        active={activePage === 'general'}
                        onPress={() => setActivePage('general')}
                      >
                        General
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton
                        href="/security"
                        active={activePage === 'security'}
                        onPress={() => setActivePage('security')}
                      >
                        Security
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.MenuSub>
              </Sidebar.SubNav>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Text fontSize="xs">Logged in as admin</Text>
          </Sidebar.Footer>
        </Sidebar>
        <main className="flex-1 p-4">
          <Sidebar.Toggle />
          <Headline level={2}>{pages[activePage].label}</Headline>
          <Text>
            You are viewing the <strong>{pages[activePage].label}</strong> page.
          </Text>
          {children}
        </main>
      </div>
    </Sidebar.Provider>
  );
};

export const Basic = meta.story({
  render: () => <Layout />,
});

export const Collapsible = meta.story({
  render: () => (
    <Layout>
      <Text>Click the toggle to collapse/expand the sidebar.</Text>
    </Layout>
  ),
});

export const Controlled = meta.story({
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Layout open={open} onOpenChange={setOpen}>
        <Button onPress={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'} Sidebar
        </Button>
        <pre className="mt-2">Sidebar is {open ? 'open' : 'closed'}</pre>
      </Layout>
    );
  },
});
