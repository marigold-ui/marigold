import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Fragment, useState } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Headline } from '../Headline/Headline';
import { Inline } from '../Inline/Inline';
import { LinkButton } from '../LinkButton/LinkButton';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { expectInsetFocusRingContrast } from '../contrast.utils';
import { Sidebar } from './Sidebar';

const meta = preview.meta({
  title: 'Components/Sidebar',
  component: Sidebar,
  args: {},
  parameters: {
    layout: 'fullscreen',
    surface: false,
  },
  decorators: [
    Story => {
      // The sidebar persists its open state to a cookie and seeds from it on
      // mount, before falling back to `defaultOpen`. Reset it before each story
      // so every story renders from its own `defaultOpen` rather than a state
      // leaked from another story (otherwise toggling e.g. Basic would make
      // DefaultCollapsed render expanded).
      if (typeof document !== 'undefined') {
        document.cookie = 'marigold:sidebar:state=;path=/;max-age=0';
      }
      return <Story />;
    },
  ],
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
      <I18nProvider locale="en-US">
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
              <Sidebar.Nav current={currentPath}>
                <Sidebar.Item href="/overview">Overview</Sidebar.Item>
                <Sidebar.Item href="/analytics">Analytics</Sidebar.Item>
                <Sidebar.Separator />
                <Sidebar.Item id="management" textValue="Management">
                  Management
                  <Sidebar.Item href="/users">Users</Sidebar.Item>
                  <Sidebar.Item href="/teams">Teams</Sidebar.Item>
                  <Sidebar.Item href="/billing">Billing</Sidebar.Item>
                </Sidebar.Item>
                <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
                <Sidebar.Item href="/general">General</Sidebar.Item>
                <Sidebar.Item href="/security">Security</Sidebar.Item>
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
      </I18nProvider>
    </RouterProvider>
  );
};

export const Basic = meta.story({
  tags: ['component-test'],
  render: () => <Layout />,
});

Basic.test(
  'Navigates items with arrow, Home and End keys',
  async ({ canvas, userEvent }) => {
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
  }
);

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
  parameters: { chromatic: { disableSnapshot: true } },
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
            <Sidebar.Nav current={currentPath}>
              <Sidebar.Item href="/dashboard">Dashboard</Sidebar.Item>
              <Sidebar.Item id="tickets" textValue="Tickets">
                Tickets
                <Sidebar.Item href="/my-tickets">My Tickets</Sidebar.Item>
                <Sidebar.Item href="/all-tickets">All Tickets</Sidebar.Item>
                <Sidebar.Item href="/unassigned">Unassigned</Sidebar.Item>
                <Sidebar.Separator />
                <Sidebar.Item href="/urgent">Urgent</Sidebar.Item>
                <Sidebar.Item href="/pending-review">
                  Pending Review
                </Sidebar.Item>
                <Sidebar.Item href="/archived-tickets">Archived</Sidebar.Item>
              </Sidebar.Item>
              <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
              <Sidebar.Item id="projects" textValue="Projects">
                Projects
                <Sidebar.Item href="/active-projects">Active</Sidebar.Item>
                <Sidebar.Item href="/completed-projects">
                  Completed
                </Sidebar.Item>
                <Sidebar.Item href="/archived-projects">Archived</Sidebar.Item>
              </Sidebar.Item>
              <Sidebar.Item href="/customers">Customers</Sidebar.Item>
              <Sidebar.Item href="/knowledge-base">Knowledge Base</Sidebar.Item>
              <Sidebar.Separator />
              <Sidebar.Item id="reports" textValue="Reports">
                Reports
                <Sidebar.Item href="/ticket-volume">Ticket Volume</Sidebar.Item>
                <Sidebar.Item href="/response-times">
                  Response Times
                </Sidebar.Item>
                <Sidebar.Item href="/sla-compliance">
                  SLA Compliance
                </Sidebar.Item>
                <Sidebar.Separator />
                <Sidebar.Item href="/agent-performance">
                  Agent Performance
                </Sidebar.Item>
                <Sidebar.Item href="/customer-satisfaction">
                  Customer Satisfaction
                </Sidebar.Item>
                <Sidebar.Item href="/team-overview">Team Overview</Sidebar.Item>
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

const badgePages: Record<string, { label: string }> = {
  '/overview': { label: 'Overview' },
  '/inbox': { label: 'Inbox' },
  '/users': { label: 'Users' },
  '/billing': { label: 'Billing' },
  '/general': { label: 'General' },
  '/security': { label: 'Security' },
};

/**
 * Nav items can carry a `<Badge>` inline after their label — a count on a
 * high-traffic destination, or an access badge (`master` / `admin`) marking a
 * gated section. The badge text joins the item's accessible name, which reads
 * naturally ("Inbox 12", "Billing Admin"); pass an explicit `textValue` so the
 * collection's back-button label and type-ahead still use the plain label. The
 * footer reuses the same access badge to show the current user's tier,
 * mirroring the app-shell's top navigation.
 */
const BadgeExample = () => {
  const [currentPath, setCurrentPath] = useState('/overview');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <I18nProvider locale="en-US">
        <Sidebar.Provider>
          <div className="flex h-screen">
            <Sidebar>
              <Sidebar.Header>
                <Text weight="bold">Acme Inc.</Text>
              </Sidebar.Header>
              <Sidebar.Nav current={currentPath}>
                <Sidebar.Item href="/overview">Overview</Sidebar.Item>
                <Sidebar.Item href="/inbox" textValue="Inbox">
                  Inbox
                  <Badge>12</Badge>
                </Sidebar.Item>
                <Sidebar.Item href="/users">Users</Sidebar.Item>
                <Sidebar.GroupLabel>Administration</Sidebar.GroupLabel>
                <Sidebar.Item href="/billing" textValue="Billing">
                  Billing
                  <Badge variant="admin">Admin</Badge>
                </Sidebar.Item>
                <Sidebar.Item href="/security" textValue="Security">
                  Security
                  <Badge variant="master">Master</Badge>
                </Sidebar.Item>
              </Sidebar.Nav>
              <Sidebar.Footer>
                <Inline space="related" alignY="center" noWrap>
                  <Stack>
                    <Inline space="tight" alignY="center" noWrap>
                      <Text size="sm" weight="bold">
                        Jane Doe
                      </Text>
                      <Badge variant="master">Master</Badge>
                    </Inline>
                    <Text size="xs" variant="muted">
                      Acme Inc.
                    </Text>
                  </Stack>
                </Inline>
              </Sidebar.Footer>
            </Sidebar>
            <main className="flex-1 p-4">
              <Sidebar.Toggle />
              <Headline level={2}>{badgePages[currentPath]?.label}</Headline>
            </main>
          </div>
        </Sidebar.Provider>
      </I18nProvider>
    </RouterProvider>
  );
};

export const WithBadges = meta.story({
  tags: ['component-test'],
  render: () => <BadgeExample />,
});

WithBadges.test(
  'renders count and access badges inline on nav items',
  async ({ canvas }) => {
    // Count badge on a nav item.
    await expect(canvas.getByText('12')).toBeVisible();

    // Access badges: one admin (nav), one master on a nav item, one master in
    // the footer user block.
    await expect(canvas.getByText('Admin')).toBeVisible();
    await expect(canvas.getAllByText('Master')).toHaveLength(2);

    // The badge text joins the link's accessible name (informative), so the
    // items are reachable by their label plus badge.
    await expect(
      canvas.getByRole('link', { name: /Inbox/ })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: /Billing/ })
    ).toBeInTheDocument();
  }
);

/**
 * The footer holds escape hatches (a link back to docs, a support link). They
 * share the nav rows' content column and read at the same size and weight as an
 * idle nav item, so the footer reads as a continuation of the nav rather than a
 * separate, misaligned block.
 */
const FooterLinksExample = () => {
  const [currentPath, setCurrentPath] = useState('/overview');

  return (
    <RouterProvider navigate={setCurrentPath}>
      <I18nProvider locale="en-US">
        <Sidebar.Provider>
          <div className="flex h-screen">
            <Sidebar>
              <Sidebar.Header>
                <Text weight="bold">Acme Inc.</Text>
              </Sidebar.Header>
              <Sidebar.Nav current={currentPath}>
                <Sidebar.Item href="/overview">Overview</Sidebar.Item>
                <Sidebar.Item href="/analytics">Analytics</Sidebar.Item>
                <Sidebar.Item href="/users">Users</Sidebar.Item>
              </Sidebar.Nav>
              <Sidebar.Footer>
                <LinkButton href="/docs" variant="ghost" size="small">
                  <ArrowLeft />
                  Back to docs
                </LinkButton>
              </Sidebar.Footer>
            </Sidebar>
            <main className="flex-1 p-4">
              <Sidebar.Toggle />
              <Headline level={2}>{pages[currentPath]?.label}</Headline>
            </main>
          </div>
        </Sidebar.Provider>
      </I18nProvider>
    </RouterProvider>
  );
};

export const WithFooterLinks = meta.story({
  tags: ['component-test'],
  render: () => <FooterLinksExample />,
});

WithFooterLinks.test(
  'footer escape links sit on the nav content column at nav weight',
  async ({ canvas }) => {
    // Compare against an idle nav row (not the active pill), matching the
    // footer link's idle treatment.
    const navItem = canvas.getByRole('link', { name: 'Analytics' });
    const footerLink = canvas.getByRole('link', { name: /Back to docs/ });

    // Same content column: the nav-row pill and the footer link pill both start
    // at the sidebar's 8px inset, so their left edges line up (the footer link
    // pulls back over the container padding to reach it).
    const navRect = navItem.getBoundingClientRect();
    const footerRect = footerLink.getBoundingClientRect();
    await expect(Math.abs(navRect.left - footerRect.left)).toBeLessThanOrEqual(
      1
    );

    // The theme's `[&_a]` rules must win over the ghost button's own size/font,
    // so the link's inset, height, size and weight all match an idle nav row.
    const navStyle = getComputedStyle(navItem);
    const footerStyle = getComputedStyle(footerLink);
    await expect(footerStyle.paddingLeft).toBe(navStyle.paddingLeft);
    await expect(footerStyle.height).toBe(navStyle.height);
    await expect(footerStyle.fontSize).toBe(navStyle.fontSize);
    await expect(footerStyle.fontWeight).toBe(navStyle.fontWeight);
  }
);

Basic.test(
  'Keyboard focus draws an inset ring that clears 3:1 on a nav link',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    const analytics = canvas.getByRole('link', { name: 'Analytics' });

    await userEvent.click(canvas.getByRole('link', { name: 'Overview' }));

    await userEvent.keyboard('{ArrowDown}');

    await expect(analytics).toHaveFocus();
    await waitFor(() => expectInsetFocusRingContrast(analytics));
  }
);

// Opening Management focuses its active item, Users. The back button sits above it.
Basic.test(
  'Keyboard focus draws an inset ring that clears 3:1 on the back button',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    canvas.getByRole('link', { name: /Management/ }).focus();
    await userEvent.keyboard('{Enter}');
    const users = await canvas.findByRole('link', { name: 'Users' });
    await waitFor(() => expect(users).toHaveFocus());

    await userEvent.keyboard('{ArrowUp}');

    const back = canvas.getByRole('button', { name: /Back/ });
    await expect(back).toHaveFocus();
    await waitFor(() => expectInsetFocusRingContrast(back));
  }
);

// A nav that outgrows the viewport: seven groups, ~35 flat rows. This is the
// shape a mature back office ends up with, and the case the single column's
// hierarchy has to hold up against: groups must still read as groups once the
// list is longer than the screen, and the active row must stay findable.
const longNavGroups: { label?: string; items: [string, string][] }[] = [
  {
    items: [
      ['/dashboard', 'Dashboard'],
      ['/inbox', 'Inbox'],
    ],
  },
  {
    label: 'Events',
    items: [
      ['/events/upcoming', 'Upcoming events'],
      ['/events/past', 'Past events'],
      ['/events/series', 'Event series'],
      ['/events/venues', 'Venues'],
      ['/events/seating', 'Seating plans'],
    ],
  },
  {
    label: 'Ticketing',
    items: [
      ['/ticketing/orders', 'Orders'],
      ['/ticketing/tickets', 'Tickets'],
      ['/ticketing/refunds', 'Refunds'],
      ['/ticketing/vouchers', 'Vouchers'],
      ['/ticketing/price-categories', 'Price categories'],
    ],
  },
  {
    label: 'Sales',
    items: [
      ['/sales/box-office', 'Box office'],
      ['/sales/shop', 'Online shop'],
      ['/sales/resellers', 'Resellers'],
      ['/sales/presale', 'Presale points'],
    ],
  },
  {
    label: 'Customers',
    items: [
      ['/customers/contacts', 'Contacts'],
      ['/customers/companies', 'Companies'],
      ['/customers/segments', 'Segments'],
      ['/customers/newsletter', 'Newsletter'],
    ],
  },
  {
    label: 'Marketing',
    items: [
      ['/marketing/campaigns', 'Campaigns'],
      ['/marketing/promo-codes', 'Promo codes'],
      ['/marketing/landing-pages', 'Landing pages'],
      ['/marketing/tracking', 'Tracking'],
    ],
  },
  {
    label: 'Finance',
    items: [
      ['/finance/invoices', 'Invoices'],
      ['/finance/payouts', 'Payouts'],
      ['/finance/settlements', 'Settlements'],
      ['/finance/tax-reports', 'Tax reports'],
    ],
  },
  {
    label: 'Settings',
    items: [
      ['/settings/general', 'General'],
      ['/settings/team', 'Team'],
      ['/settings/roles', 'Roles'],
      ['/settings/integrations', 'Integrations'],
      ['/settings/api-keys', 'API keys'],
    ],
  },
];

const longNavPages = Object.fromEntries(
  longNavGroups.flatMap(group => group.items)
);

const LongNavigationExample = ({
  initialPath = '/ticketing/orders',
}: {
  initialPath?: string;
}) => {
  const [currentPath, setCurrentPath] = useState(initialPath);

  return (
    <RouterProvider navigate={setCurrentPath}>
      <I18nProvider locale="en-US">
        <Sidebar.Provider>
          <div className="flex h-screen">
            <Sidebar>
              <Sidebar.Header>
                <Text weight="bold">Acme Tickets</Text>
              </Sidebar.Header>
              <Sidebar.Nav current={currentPath}>
                {longNavGroups.map(group => (
                  <Fragment key={group.label ?? 'top'}>
                    {group.label && (
                      <Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>
                    )}
                    {group.items.map(([href, label]) => (
                      <Sidebar.Item key={href} href={href}>
                        {label}
                      </Sidebar.Item>
                    ))}
                  </Fragment>
                ))}
              </Sidebar.Nav>
              <Sidebar.Footer>
                <Text fontSize="xs">Footer content</Text>
              </Sidebar.Footer>
            </Sidebar>
            <main className="flex-1 p-4">
              <Sidebar.Toggle />
              <Headline level={2}>{longNavPages[currentPath]}</Headline>
              <Text>
                You are viewing the <strong>{longNavPages[currentPath]}</strong>{' '}
                page.
              </Text>
            </main>
          </div>
        </Sidebar.Provider>
      </I18nProvider>
    </RouterProvider>
  );
};

export const LongNavigation = meta.story({
  render: () => <LongNavigationExample />,
});
