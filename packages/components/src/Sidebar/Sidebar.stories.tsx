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

// Complex story — ticketing system navigation
// ---------------
const complexPages = {
  dashboard: { label: 'Dashboard' },
  myTickets: { label: 'My Tickets' },
  allTickets: { label: 'All Tickets' },
  unassigned: { label: 'Unassigned' },
  urgent: { label: 'Urgent' },
  pendingReview: { label: 'Pending Review' },
  archivedTickets: { label: 'Archived' },
  activeProjects: { label: 'Active' },
  completedProjects: { label: 'Completed' },
  archivedProjects: { label: 'Archived' },
  customers: { label: 'Customers' },
  knowledgeBase: { label: 'Knowledge Base' },
  ticketVolume: { label: 'Ticket Volume' },
  responseTimes: { label: 'Response Times' },
  slaCompliance: { label: 'SLA Compliance' },
  agentPerformance: { label: 'Agent Performance' },
  customerSatisfaction: { label: 'Customer Satisfaction' },
  teamOverview: { label: 'Team Overview' },
} as const;

type ComplexPageId = keyof typeof complexPages;

export const Complex = meta.story({
  render: () => {
    const [activePage, setActivePage] = useState<ComplexPageId>('dashboard');

    return (
      <Sidebar.Provider>
        <div className="flex h-screen">
          <Sidebar>
            <Sidebar.Header>
              <Text weight="bold">TicketDesk</Text>
            </Sidebar.Header>
            <Sidebar.Content>
              <Sidebar.Group>
                <Sidebar.Nav>
                  <Sidebar.Item
                    href="/dashboard"
                    active={activePage === 'dashboard'}
                    onPress={() => setActivePage('dashboard')}
                  >
                    Dashboard
                  </Sidebar.Item>
                  <Sidebar.Item id="tickets" textValue="Tickets">
                    Tickets
                    <Sidebar.Item
                      href="/my-tickets"
                      active={activePage === 'myTickets'}
                      onPress={() => setActivePage('myTickets')}
                    >
                      My Tickets
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/all-tickets"
                      active={activePage === 'allTickets'}
                      onPress={() => setActivePage('allTickets')}
                    >
                      All Tickets
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/unassigned"
                      active={activePage === 'unassigned'}
                      onPress={() => setActivePage('unassigned')}
                    >
                      Unassigned
                    </Sidebar.Item>
                    <Sidebar.Separator />
                    <Sidebar.Item
                      href="/urgent"
                      active={activePage === 'urgent'}
                      onPress={() => setActivePage('urgent')}
                    >
                      Urgent
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/pending-review"
                      active={activePage === 'pendingReview'}
                      onPress={() => setActivePage('pendingReview')}
                    >
                      Pending Review
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/archived-tickets"
                      active={activePage === 'archivedTickets'}
                      onPress={() => setActivePage('archivedTickets')}
                    >
                      Archived
                    </Sidebar.Item>
                  </Sidebar.Item>
                </Sidebar.Nav>
              </Sidebar.Group>
              <Sidebar.Group>
                <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
                <Sidebar.Nav>
                  <Sidebar.Item id="projects" textValue="Projects">
                    Projects
                    <Sidebar.Item
                      href="/active-projects"
                      active={activePage === 'activeProjects'}
                      onPress={() => setActivePage('activeProjects')}
                    >
                      Active
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/completed-projects"
                      active={activePage === 'completedProjects'}
                      onPress={() => setActivePage('completedProjects')}
                    >
                      Completed
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/archived-projects"
                      active={activePage === 'archivedProjects'}
                      onPress={() => setActivePage('archivedProjects')}
                    >
                      Archived
                    </Sidebar.Item>
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/customers"
                    active={activePage === 'customers'}
                    onPress={() => setActivePage('customers')}
                  >
                    Customers
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/knowledge-base"
                    active={activePage === 'knowledgeBase'}
                    onPress={() => setActivePage('knowledgeBase')}
                  >
                    Knowledge Base
                  </Sidebar.Item>
                </Sidebar.Nav>
              </Sidebar.Group>
              <hr className="bg-border my-1 h-px border-0" />
              <Sidebar.Group>
                <Sidebar.Nav>
                  <Sidebar.Item id="reports" textValue="Reports">
                    Reports
                    <Sidebar.Item
                      href="/ticket-volume"
                      active={activePage === 'ticketVolume'}
                      onPress={() => setActivePage('ticketVolume')}
                    >
                      Ticket Volume
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/response-times"
                      active={activePage === 'responseTimes'}
                      onPress={() => setActivePage('responseTimes')}
                    >
                      Response Times
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/sla-compliance"
                      active={activePage === 'slaCompliance'}
                      onPress={() => setActivePage('slaCompliance')}
                    >
                      SLA Compliance
                    </Sidebar.Item>
                    <Sidebar.Separator />
                    <Sidebar.Item
                      href="/agent-performance"
                      active={activePage === 'agentPerformance'}
                      onPress={() => setActivePage('agentPerformance')}
                    >
                      Agent Performance
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/customer-satisfaction"
                      active={activePage === 'customerSatisfaction'}
                      onPress={() => setActivePage('customerSatisfaction')}
                    >
                      Customer Satisfaction
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/team-overview"
                      active={activePage === 'teamOverview'}
                      onPress={() => setActivePage('teamOverview')}
                    >
                      Team Overview
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
            <Headline level={2}>{complexPages[activePage].label}</Headline>
            <Text>
              You are viewing the{' '}
              <strong>{complexPages[activePage].label}</strong> page.
            </Text>
          </main>
        </div>
      </Sidebar.Provider>
    );
  },
});
