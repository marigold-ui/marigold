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
  overview: { label: 'Overview', group: 'Main' },
  analytics: { label: 'Analytics', group: 'Main' },
  users: { label: 'Users', group: 'Management' },
  teams: { label: 'Teams', group: 'Management' },
  billing: { label: 'Billing', group: 'Management' },
  general: { label: 'General', group: 'Settings' },
  security: { label: 'Security', group: 'Settings' },
} as const;

type PageId = keyof typeof pages;

const groups = ['Main', 'Management', 'Settings'] as const;

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
            {groups.map(group => (
              <Sidebar.Group key={group}>
                <Sidebar.GroupLabel>{group}</Sidebar.GroupLabel>
                <Sidebar.Menu>
                  {(Object.entries(pages) as [PageId, (typeof pages)[PageId]][])
                    .filter(([, page]) => page.group === group)
                    .map(([id, page]) => (
                      <Sidebar.MenuItem key={id}>
                        <Sidebar.MenuButton
                          href={`/${id}`}
                          active={activePage === id}
                          onPress={() => setActivePage(id)}
                        >
                          {page.label}
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    ))}
                </Sidebar.Menu>
              </Sidebar.Group>
            ))}
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
