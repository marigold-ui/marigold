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
            <Text weight="bold">Acme Inc.</Text>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.Nav>
                <Sidebar.Item
                  href="/overview"
                  active={activePage === 'overview'}
                  onPress={() => setActivePage('overview')}
                >
                  Overview
                </Sidebar.Item>
                <Sidebar.Item
                  href="/analytics"
                  active={activePage === 'analytics'}
                  onPress={() => setActivePage('analytics')}
                >
                  Analytics
                </Sidebar.Item>
                <Sidebar.Item id="management" textValue="Management">
                  Management
                  <Sidebar.Item
                    href="/users"
                    active={activePage === 'users'}
                    onPress={() => setActivePage('users')}
                  >
                    Users
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/teams"
                    active={activePage === 'teams'}
                    onPress={() => setActivePage('teams')}
                  >
                    Teams
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/billing"
                    active={activePage === 'billing'}
                    onPress={() => setActivePage('billing')}
                  >
                    Billing
                  </Sidebar.Item>
                </Sidebar.Item>
                <Sidebar.Item id="settings" textValue="Settings">
                  Settings
                  <Sidebar.Item
                    href="/general"
                    active={activePage === 'general'}
                    onPress={() => setActivePage('general')}
                  >
                    General
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/security"
                    active={activePage === 'security'}
                    onPress={() => setActivePage('security')}
                  >
                    Security
                  </Sidebar.Item>
                </Sidebar.Item>
              </Sidebar.Nav>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Text fontSize="xs">Footer content</Text>
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
