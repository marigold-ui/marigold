import type { ReactNode } from 'react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Headline } from '../Headline/Headline';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { Text } from '../Text/Text';
import { Sidebar } from './Sidebar';

const meta = preview.meta({
  title: 'Components/Sidebar',
  component: Sidebar,
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
});

const pages: Record<string, { label: string }> = {
  '/overview': { label: 'Overview' },
  '/analytics': { label: 'Analytics' },
  '/users': { label: 'Users' },
  '/teams': { label: 'Teams' },
  '/billing': { label: 'Billing' },
  '/general': { label: 'General' },
  '/security': { label: 'Security' },
};

const Layout = ({
  children,
  open,
  onOpenChange,
  initialPath = '/overview',
  defaultOpen,
}: {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialPath?: string;
  defaultOpen?: boolean;
}) => {
  const [currentPath, setCurrentPath] = useState(initialPath);

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
      >
        <div className="flex h-screen">
          <Sidebar>
            <Sidebar.Header>
              <Text weight="bold">Acme Inc.</Text>
            </Sidebar.Header>
            <Sidebar.Nav>
              <Sidebar.Item
                href="/overview"
                active={currentPath === '/overview'}
              >
                Overview
              </Sidebar.Item>
              <Sidebar.Item
                href="/analytics"
                active={currentPath === '/analytics'}
              >
                Analytics
              </Sidebar.Item>
              <Sidebar.Separator />
              <Sidebar.Item id="management" textValue="Management">
                Management
                <Sidebar.Item href="/users" active={currentPath === '/users'}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item href="/teams" active={currentPath === '/teams'}>
                  Teams
                </Sidebar.Item>
                <Sidebar.Item
                  href="/billing"
                  active={currentPath === '/billing'}
                >
                  Billing
                </Sidebar.Item>
              </Sidebar.Item>
              <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
              <Sidebar.Item href="/general" active={currentPath === '/general'}>
                General
              </Sidebar.Item>
              <Sidebar.Item
                href="/security"
                active={currentPath === '/security'}
              >
                Security
              </Sidebar.Item>
            </Sidebar.Nav>
            <Sidebar.Footer>
              <Text fontSize="xs">Footer content</Text>
            </Sidebar.Footer>
          </Sidebar>
          <main className="flex-1 p-4">
            <Sidebar.Toggle />
            <Headline level={2}>{pages[currentPath]?.label}</Headline>
            <Text>
              You are viewing the <strong>{pages[currentPath]?.label}</strong>{' '}
              page.
            </Text>
            {children}
          </main>
        </div>
      </Sidebar.Provider>
    </RouterProvider>
  );
};

export const Basic = meta.story({
  render: () => <Layout />,
});

const ControlledExample = () => {
  const [open, setOpen] = useState(true);
  return (
    <Layout open={open} onOpenChange={setOpen}>
      <Button onPress={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'} Sidebar
      </Button>
      <pre className="mt-2">Sidebar is {open ? 'open' : 'closed'}</pre>
    </Layout>
  );
};

export const Controlled = meta.story({
  render: () => <ControlledExample />,
});

const complexPages: Record<string, { label: string }> = {
  '/dashboard': { label: 'Dashboard' },
  '/my-tickets': { label: 'My Tickets' },
  '/all-tickets': { label: 'All Tickets' },
  '/unassigned': { label: 'Unassigned' },
  '/urgent': { label: 'Urgent' },
  '/pending-review': { label: 'Pending Review' },
  '/archived-tickets': { label: 'Archived' },
  '/active-projects': { label: 'Active' },
  '/completed-projects': { label: 'Completed' },
  '/archived-projects': { label: 'Archived' },
  '/customers': { label: 'Customers' },
  '/knowledge-base': { label: 'Knowledge Base' },
  '/ticket-volume': { label: 'Ticket Volume' },
  '/response-times': { label: 'Response Times' },
  '/sla-compliance': { label: 'SLA Compliance' },
  '/agent-performance': { label: 'Agent Performance' },
  '/customer-satisfaction': { label: 'Customer Satisfaction' },
  '/team-overview': { label: 'Team Overview' },
};

const ComplexExample = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <Sidebar.Provider>
        <div className="flex h-screen">
          <Sidebar>
            <Sidebar.Header>
              <Text weight="bold">TicketDesk</Text>
            </Sidebar.Header>
            <Sidebar.Nav>
              <Sidebar.Item
                href="/dashboard"
                active={currentPath === '/dashboard'}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item id="tickets" textValue="Tickets">
                Tickets
                <Sidebar.Item
                  href="/my-tickets"
                  active={currentPath === '/my-tickets'}
                >
                  My Tickets
                </Sidebar.Item>
                <Sidebar.Item
                  href="/all-tickets"
                  active={currentPath === '/all-tickets'}
                >
                  All Tickets
                </Sidebar.Item>
                <Sidebar.Item
                  href="/unassigned"
                  active={currentPath === '/unassigned'}
                >
                  Unassigned
                </Sidebar.Item>
                <Sidebar.Separator />
                <Sidebar.Item href="/urgent" active={currentPath === '/urgent'}>
                  Urgent
                </Sidebar.Item>
                <Sidebar.Item
                  href="/pending-review"
                  active={currentPath === '/pending-review'}
                >
                  Pending Review
                </Sidebar.Item>
                <Sidebar.Item
                  href="/archived-tickets"
                  active={currentPath === '/archived-tickets'}
                >
                  Archived
                </Sidebar.Item>
              </Sidebar.Item>
              <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
              <Sidebar.Item id="projects" textValue="Projects">
                Projects
                <Sidebar.Item
                  href="/active-projects"
                  active={currentPath === '/active-projects'}
                >
                  Active
                </Sidebar.Item>
                <Sidebar.Item
                  href="/completed-projects"
                  active={currentPath === '/completed-projects'}
                >
                  Completed
                </Sidebar.Item>
                <Sidebar.Item
                  href="/archived-projects"
                  active={currentPath === '/archived-projects'}
                >
                  Archived
                </Sidebar.Item>
              </Sidebar.Item>
              <Sidebar.Item
                href="/customers"
                active={currentPath === '/customers'}
              >
                Customers
              </Sidebar.Item>
              <Sidebar.Item
                href="/knowledge-base"
                active={currentPath === '/knowledge-base'}
              >
                Knowledge Base
              </Sidebar.Item>
              <Sidebar.Separator />
              <Sidebar.Item id="reports" textValue="Reports">
                Reports
                <Sidebar.Item
                  href="/ticket-volume"
                  active={currentPath === '/ticket-volume'}
                >
                  Ticket Volume
                </Sidebar.Item>
                <Sidebar.Item
                  href="/response-times"
                  active={currentPath === '/response-times'}
                >
                  Response Times
                </Sidebar.Item>
                <Sidebar.Item
                  href="/sla-compliance"
                  active={currentPath === '/sla-compliance'}
                >
                  SLA Compliance
                </Sidebar.Item>
                <Sidebar.Separator />
                <Sidebar.Item
                  href="/agent-performance"
                  active={currentPath === '/agent-performance'}
                >
                  Agent Performance
                </Sidebar.Item>
                <Sidebar.Item
                  href="/customer-satisfaction"
                  active={currentPath === '/customer-satisfaction'}
                >
                  Customer Satisfaction
                </Sidebar.Item>
                <Sidebar.Item
                  href="/team-overview"
                  active={currentPath === '/team-overview'}
                >
                  Team Overview
                </Sidebar.Item>
              </Sidebar.Item>
            </Sidebar.Nav>
            <Sidebar.Footer>
              <Text fontSize="xs">Footer content</Text>
            </Sidebar.Footer>
          </Sidebar>
          <main className="flex-1 p-4">
            <Sidebar.Toggle />
            <Headline level={2}>{complexPages[currentPath]?.label}</Headline>
            <Text>
              You are viewing the{' '}
              <strong>{complexPages[currentPath]?.label}</strong> page.
            </Text>
          </main>
        </div>
      </Sidebar.Provider>
    </RouterProvider>
  );
};

export const Complex = meta.story({
  render: () => <ComplexExample />,
});

export const WithActiveBranch = meta.story({
  render: () => <Layout initialPath="/users" />,
});

export const DefaultCollapsed = meta.story({
  render: () => <Layout defaultOpen={false} />,
});

export const KeyboardNavigation = meta.story({
  tags: ['component-test'],
  render: () => <Layout />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Overview is the active item, focus it
    const overview = canvas.getByRole('link', { name: 'Overview' });
    await userEvent.click(overview);
    await expect(overview).toHaveFocus();

    // ArrowDown → Analytics
    await userEvent.keyboard('{ArrowDown}');
    const analytics = canvas.getByRole('link', { name: 'Analytics' });
    await expect(analytics).toHaveFocus();

    // ArrowDown → Management (skips separator)
    await userEvent.keyboard('{ArrowDown}');
    const management = canvas.getByRole('link', { name: /Management/ });
    await expect(management).toHaveFocus();

    // ArrowDown → General (skips group label)
    await userEvent.keyboard('{ArrowDown}');
    const general = canvas.getByRole('link', { name: 'General' });
    await expect(general).toHaveFocus();

    // End → Security (last item)
    await userEvent.keyboard('{End}');
    const security = canvas.getByRole('link', { name: 'Security' });
    await expect(security).toHaveFocus();

    // Home → Overview (first item)
    await userEvent.keyboard('{Home}');
    await expect(overview).toHaveFocus();

    // ArrowUp wraps to last item (Security)
    await userEvent.keyboard('{ArrowUp}');
    await expect(security).toHaveFocus();
  },
});
