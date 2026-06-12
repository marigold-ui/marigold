import { createContext, use, useState } from 'react';
import type { ReactNode } from 'react';
import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import {
  Copy,
  Download,
  Link2,
  Pause,
  Pencil,
  Power,
  RefreshCw,
  ScrollText,
  Trash2,
  UserRoundPlus,
} from '@marigold/icons';
import { NumericFormat, cn } from '@marigold/system';
import { AppLayout } from '../AppLayout/AppLayout';
import { Badge } from '../Badge/Badge';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Description } from '../Description/Description';
import { Inline } from '../Inline/Inline';
import { ActionMenu } from '../Menu/ActionMenu';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { Sidebar } from '../Sidebar/Sidebar';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { Title } from '../Title/Title';
import { TopNavigation } from '../TopNavigation/TopNavigation';
import { Panel } from './Panel';

const meta = preview.meta({
  title: 'Components/Panel',
  component: Panel,
  parameters: {
    surface: false,
  },
  args: {
    variant: 'default',
    size: 'default',
    space: 'regular',
    headingLevel: 2,
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'master', 'admin', 'destructive'],
      description: 'The visual variant of the panel.',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'radio' },
      options: ['default', 'form'],
      description: 'The size of the panel.',
      table: { defaultValue: { summary: 'default' } },
    },
    space: {
      control: { type: 'radio' },
      options: ['none', 'tight', 'related', 'regular', 'group', 'section'],
      description: 'Spacing between Panel sections.',
      table: { defaultValue: { summary: 'regular' } },
    },
    headingLevel: {
      control: { type: 'radio' },
      options: [2, 3, 4, 5, 6],
      description:
        'Base heading level for the panel section. Only changes the underlying heading tag (`h2`–`h6`) for document outline and accessibility — the visual appearance stays the same.',
      table: { defaultValue: { summary: '2' } },
    },
  },
});

export const Basic = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Panel {...args}>
      <Panel.Header>
        <Title>Organizer Profile</Title>
        <Description>
          Public details shown to customers on ticket confirmations and event
          pages.
        </Description>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <TextField label="Organizer Name" defaultValue="Marigold Events" />
          <TextField
            label="Support Email"
            defaultValue="hello@marigold-ui.io"
          />
        </Stack>
      </Panel.Content>
      <Panel.Footer>
        <Button>Save changes</Button>
      </Panel.Footer>
    </Panel>
  ),
});

Basic.test(
  'renders a labelled region with the Title as accessible name',
  async ({ canvas }) => {
    const title = canvas.getByRole('heading', { name: 'Organizer Profile' });
    const region = canvas.getByRole('region', { name: 'Organizer Profile' });

    expect(title.tagName).toBe('H2');
    expect(region).toBeInTheDocument();
    expect(region.getAttribute('aria-labelledby')).toBe(title.id);
  }
);

export const TitleOnlyWithoutHeader = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Panel {...args}>
      <Title>Quick Settings</Title>
      <Panel.Content>
        <Stack space="regular">
          <TextField label="Display name" defaultValue="Marigold Events" />
        </Stack>
      </Panel.Content>
    </Panel>
  ),
});

TitleOnlyWithoutHeader.test(
  'labels the panel region when Title is used without Panel.Header',
  async ({ canvas }) => {
    const title = canvas.getByRole('heading', { name: 'Quick Settings' });
    const region = canvas.getByRole('region', { name: 'Quick Settings' });

    expect(title.tagName).toBe('H2');
    expect(region).toHaveAttribute('aria-labelledby', title.id);
    expect(title.closest('[data-panel-header]')).toBeNull();
  }
);

export const WithHeaderActions = meta.story(() => (
  <Stack space="section">
    <Panel>
      <Panel.Header>
        <Title>Team Members</Title>
        <Description>
          People with access to this workspace and their roles.
        </Description>
        <Button size="icon" aria-label="Invite member">
          <UserRoundPlus />
        </Button>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <Inline space="regular" alignY="center" alignX="between">
            <Stack space="0.5">
              <Text weight="medium">Alice Chen</Text>
              <Text size="xs" color="secondary">
                alice@marigold-ui.io
              </Text>
            </Stack>
            <Badge variant="admin">Admin</Badge>
          </Inline>
          <Inline space="regular" alignY="center" alignX="between">
            <Stack space="0.5">
              <Text weight="medium">Bob Martinez</Text>
              <Text size="xs" color="secondary">
                bob@marigold-ui.io
              </Text>
            </Stack>
            <Badge>Editor</Badge>
          </Inline>
          <Inline space="regular" alignY="center" alignX="between">
            <Stack space="0.5">
              <Text weight="medium">Charlie Park</Text>
              <Text size="xs" color="secondary">
                charlie@marigold-ui.io
              </Text>
            </Stack>
            <Badge>Viewer</Badge>
          </Inline>
        </Stack>
      </Panel.Content>
    </Panel>

    <Panel>
      <Panel.Header>
        <Title>Stripe Payments</Title>
        <Description>
          Connected on April 2, 2026 · Processing live payments in EUR.
        </Description>
        <ActionMenu size="icon" aria-label="Integration actions">
          <ActionMenu.Item id="sync">
            <RefreshCw />
            Sync now
          </ActionMenu.Item>
          <ActionMenu.Item id="logs">
            <ScrollText />
            View webhook logs
          </ActionMenu.Item>
          <ActionMenu.Item id="reconnect">
            <Link2 />
            Reconnect
          </ActionMenu.Item>
          <ActionMenu.Item id="disconnect" variant="destructive">
            <Power />
            Disconnect
          </ActionMenu.Item>
        </ActionMenu>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <Inline space="regular" alignY="center" alignX="between">
            <Stack space="0.5">
              <Text size="xs" color="secondary">
                Webhook endpoint
              </Text>
              <Text>https://api.marigold-ui.io/webhooks/stripe</Text>
            </Stack>
            <Badge variant="success">Live</Badge>
          </Inline>
          <Inline space="regular" alignY="center" alignX="between">
            <Stack space="0.5">
              <Text size="xs" color="secondary">
                Events received (24h)
              </Text>
              <Text weight="medium">1,284</Text>
            </Stack>
            <Badge variant="info">12 pending</Badge>
          </Inline>
        </Stack>
      </Panel.Content>
    </Panel>

    <Panel>
      <Panel.Header>
        <Title>Sommernachts-Konzert 2026</Title>
        <Description>
          Elbphilharmonie Hamburg · Saturday, June 14, 2026 · 20:00 CEST
        </Description>
        <ButtonGroup size="icon" aria-label="Event actions">
          <Button aria-label="Edit event">
            <Pencil />
          </Button>
          <ActionMenu aria-label="More event actions">
            <ActionMenu.Item id="duplicate">
              <Copy />
              Duplicate event
            </ActionMenu.Item>
            <ActionMenu.Item id="export">
              <Download />
              Export attendees
            </ActionMenu.Item>
            <ActionMenu.Item id="pause">
              <Pause />
              Pause sales
            </ActionMenu.Item>
            <ActionMenu.Item id="cancel" variant="destructive">
              <Trash2 />
              Cancel event
            </ActionMenu.Item>
          </ActionMenu>
        </ButtonGroup>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <Inline space="regular" alignY="center" alignX="between">
            <Stack space="0.5">
              <Text size="xs" color="secondary">
                Tickets sold
              </Text>
              <Text weight="medium">1,847 / 2,100</Text>
            </Stack>
            <Badge variant="success">88% sold</Badge>
          </Inline>
          <Inline space="regular" alignY="center" alignX="between">
            <Stack space="0.5">
              <Text size="xs" color="secondary">
                Gross revenue
              </Text>
              <Text weight="medium">
                <NumericFormat
                  style="currency"
                  currency="EUR"
                  value={94230.5}
                />
              </Text>
            </Stack>
            <Badge variant="info">Published</Badge>
          </Inline>
        </Stack>
      </Panel.Content>
    </Panel>
  </Stack>
));

export const SlotsButtonGroup = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Panel {...args}>
      <Panel.Header>
        <Title>Stripe Payments</Title>
        <Description>Integration health and quick actions.</Description>
        <ButtonGroup size="icon" aria-label="Integration actions">
          <Button aria-label="Reconnect">
            <Link2 />
          </Button>
          <Button aria-label="Refresh">
            <RefreshCw />
          </Button>
          <ActionMenu aria-label="More">
            <ActionMenu.Item id="logs">View logs</ActionMenu.Item>
            <ActionMenu.Item id="disconnect" variant="destructive">
              Disconnect
            </ActionMenu.Item>
          </ActionMenu>
        </ButtonGroup>
      </Panel.Header>
      <Panel.Content>
        <Text>Webhook endpoint is live.</Text>
      </Panel.Content>
    </Panel>
  ),
});

SlotsButtonGroup.test(
  'renders as a toolbar inside the actions grid cell',
  async ({ canvas }) => {
    const toolbar = canvas.getByRole('toolbar', {
      name: 'Integration actions',
    });
    expect(toolbar).toBeInTheDocument();
    expect(toolbar).toHaveAttribute('data-grid-area', 'actions');
  }
);

SlotsButtonGroup.test(
  'cycles focus between actions with arrow keys',
  async ({ canvas }) => {
    const reconnect = canvas.getByRole('button', { name: 'Reconnect' });
    const refresh = canvas.getByRole('button', { name: 'Refresh' });
    const more = canvas.getByRole('button', { name: 'More' });

    reconnect.focus();
    expect(reconnect).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(refresh).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(more).toHaveFocus();
  }
);

SlotsButtonGroup.test(
  'individual Buttons inside the group do NOT carry the actions grid-area',
  async ({ canvas }) => {
    const reconnect = canvas.getByRole('button', { name: 'Reconnect' });

    expect(reconnect).not.toHaveAttribute('data-grid-area', 'actions');
  }
);

export const WithCollapsible = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Panel {...args}>
      <Panel.Header>
        <Title>Event Details</Title>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <TextField label="Event Name" defaultValue="Summer Festival" />
          <TextField label="Location" defaultValue="Main Stage" />
        </Stack>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Title>Advanced Options</Title>
          <Description>
            Fine-tune URL slugs, tracking, and other optional settings.
          </Description>
        </Panel.CollapsibleHeader>
        <Panel.CollapsibleContent>
          <Stack space="regular">
            <TextField label="Custom URL Slug" />
            <TextField label="Tracking Code" />
          </Stack>
        </Panel.CollapsibleContent>
      </Panel.Collapsible>
    </Panel>
  ),
});

WithCollapsible.test(
  'toggles aria-expanded and body visibility via click, Enter, and Space',
  async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /Advanced Options/ });
    const body = canvas.getByLabelText('Custom URL Slug');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(body).not.toBeVisible();

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(body).toBeVisible();

    trigger.focus();
    await userEvent.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.keyboard(' ');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  }
);

WithCollapsible.test(
  'morph caret reflects the expanded state',
  async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /Advanced Options/ });
    const caretPath = trigger.querySelector('svg path') as SVGPathElement;
    const initial = caretPath.style.getPropertyValue('d');

    await userEvent.click(trigger);

    expect(caretPath.style.getPropertyValue('d')).not.toBe(initial);
  }
);

export const ControlledCollapsible = meta.story({
  tags: ['component-test'],
  render: function Render() {
    const [expanded, setExpanded] = useState(false);
    return (
      <Panel aria-label="Advanced settings">
        <Panel.Content>
          <Text>Collapsible is {expanded ? 'expanded' : 'collapsed'}.</Text>
        </Panel.Content>
        <Panel.Collapsible expanded={expanded} onExpandedChange={setExpanded}>
          <Panel.CollapsibleHeader>
            <Title>Advanced settings</Title>
          </Panel.CollapsibleHeader>
          <Panel.CollapsibleContent>
            <Text>Controlled content.</Text>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
      </Panel>
    );
  },
});

ControlledCollapsible.test(
  'flips aria-expanded via the controlled `expanded` prop',
  async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Advanced settings' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
);

export const AriaLabeled = meta.story(() => (
  <Panel aria-label="Collapsible-only panel">
    <Panel.Content>
      <Text>
        A Panel can be labelled with <code>aria-label</code> when there is no
        visible title — useful for collapsible-only sections.
      </Text>
    </Panel.Content>
  </Panel>
));

export const CollapsibleDefaultExpanded = meta.story({
  tags: ['component-test'],
  render: () => (
    <Panel>
      <Panel.Header>
        <Title>Notification Preferences</Title>
      </Panel.Header>
      <Panel.Content>
        <Text>
          Notifications are delivered to{' '}
          <Text as="span" weight="medium">
            admin@marigold-ui.io
          </Text>
          . Adjust the delivery channels below.
        </Text>
      </Panel.Content>
      <Panel.Collapsible defaultExpanded>
        <Panel.CollapsibleHeader>
          <Title>Channels</Title>
          <Description>
            Where and how reminders, confirmations, and alerts are delivered.
          </Description>
        </Panel.CollapsibleHeader>
        <Panel.CollapsibleContent>
          <Text>
            Email, SMS, and push notifications are enabled by default.
          </Text>
        </Panel.CollapsibleContent>
      </Panel.Collapsible>
    </Panel>
  ),
});

CollapsibleDefaultExpanded.test(
  'starts expanded and wires aria-describedby to the description',
  async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Channels' });
    const description = canvas.getByText(/Where and how reminders/);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-describedby', description.id);
  }
);

export const CollapsibleBleed = meta.story(() => (
  <Panel aria-label="Bleed collapsible">
    <Panel.Collapsible defaultExpanded>
      <Panel.CollapsibleHeader>
        <Title>Bleed content</Title>
      </Panel.CollapsibleHeader>
      <Panel.CollapsibleContent bleed>
        <Text>Edge to edge</Text>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
));

export const CollapsibleDisabled = meta.story(() => (
  <Panel>
    <Panel.Header>
      <Title>Billing</Title>
    </Panel.Header>
    <Panel.Collapsible disabled>
      <Panel.CollapsibleHeader>
        <Title>Payment methods</Title>
      </Panel.CollapsibleHeader>
      <Panel.CollapsibleContent>
        <Text>Hidden because the user cannot change this section.</Text>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
));

export const Variants = meta.story(() => (
  <Stack space="regular">
    <Panel>
      <Panel.Header>
        <Title>Default Panel</Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Standard panel with no variant.</Text>
      </Panel.Content>
    </Panel>
    <Panel variant="master">
      <Panel.Header>
        <Title>Master Access</Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Panel for master-level access content.</Text>
      </Panel.Content>
    </Panel>
    <Panel variant="admin">
      <Panel.Header>
        <Title>Admin Access</Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Panel for admin-level access content.</Text>
      </Panel.Content>
    </Panel>
    <Panel variant="destructive">
      <Panel.Header>
        <Title>Destructive</Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Panel for destructive/irreversible actions.</Text>
      </Panel.Content>
    </Panel>
  </Stack>
));

const orders = [
  {
    id: '1001',
    customer: 'Alice',
    amount: 120,
    status: 'Completed',
    variant: 'success' as const,
  },
  {
    id: '1002',
    customer: 'Bob',
    amount: 85.5,
    status: 'Pending',
    variant: 'warning' as const,
  },
  {
    id: '1003',
    customer: 'Charlie',
    amount: 200,
    status: 'Shipped',
    variant: 'info' as const,
  },
];

export const TableInside = meta.story(() => (
  <Stack space="regular">
    <Panel>
      <Panel.Header>
        <Title>Recent Orders</Title>
        <Description>Overview of the latest transactions.</Description>
      </Panel.Header>
      <Panel.Content bleed>
        <Table aria-label="Recent orders">
          <Table.Header>
            <Table.Column rowHeader>Order</Table.Column>
            <Table.Column>Customer</Table.Column>
            <Table.Column alignX="right">Amount</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body items={orders}>
            {item => (
              <Table.Row id={item.id}>
                <Table.Cell>#{item.id}</Table.Cell>
                <Table.Cell>{item.customer}</Table.Cell>
                <Table.Cell>
                  <NumericFormat
                    style="currency"
                    currency="EUR"
                    value={item.amount}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={item.variant}>{item.status}</Badge>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>

    <Panel>
      <Panel.Header>
        <Title>Selectable Orders</Title>
        <Description>
          Table with multi-select enabled inside a Panel.
        </Description>
      </Panel.Header>
      <Panel.Content bleed>
        <Table aria-label="Selectable orders" selectionMode="multiple">
          <Table.Header>
            <Table.Column rowHeader>Order</Table.Column>
            <Table.Column>Customer</Table.Column>
            <Table.Column alignX="right">Amount</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body items={orders}>
            {item => (
              <Table.Row id={item.id}>
                <Table.Cell>#{item.id}</Table.Cell>
                <Table.Cell>{item.customer}</Table.Cell>
                <Table.Cell>
                  <NumericFormat
                    style="currency"
                    currency="EUR"
                    value={item.amount}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={item.variant}>{item.status}</Badge>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>
  </Stack>
));

// ===================================================================
// Design Exploration — Panel surface treatments
// -------------------------------------------------------------------
// Throwaway design spike: 11 visual directions for the Panel surface,
// rendered as plain HTML + Tailwind (no theme changes). Each direction
// shows the identical content twice — a default settings panel and a
// destructive "Danger zone" sibling — on its own page background.
// Delete this block once a direction is chosen and tokenized.
// ===================================================================

const ExplorationHeader = ({
  title = 'Organizer profile',
  description = 'Public details shown to customers on ticket confirmations and event pages.',
  titleClassName = 'text-lg leading-none font-semibold text-foreground',
  action = true,
}: {
  title?: string;
  description?: string;
  titleClassName?: string;
  action?: boolean;
}) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <h3 className={titleClassName}>{title}</h3>
      <p className="text-secondary mt-1.5 text-sm">{description}</p>
    </div>
    {action ? <Button size="small">Edit</Button> : null}
  </div>
);

const ExplorationFields = () => (
  <Stack space="regular">
    <TextField label="Organizer name" defaultValue="Marigold Events" />
    <TextField label="Support email" defaultValue="hello@marigold-ui.io" />
  </Stack>
);

const ExplorationBody = ({ titleClassName }: { titleClassName?: string }) => (
  <>
    <ExplorationHeader titleClassName={titleClassName} />
    <ExplorationFields />
    <div>
      <Button variant="primary">Save changes</Button>
    </div>
  </>
);

const ExplorationDangerBody = ({
  titleClassName = 'text-destructive-foreground text-lg leading-none font-semibold',
}: {
  titleClassName?: string;
}) => (
  <>
    <ExplorationHeader
      title="Danger zone"
      description="Irreversible actions for this organizer."
      titleClassName={titleClassName}
      action={false}
    />
    <Text>
      Deleting this organizer removes all events, orders, and payout history.
      This cannot be undone.
    </Text>
    <div>
      <Button variant="destructive">Delete organizer</Button>
    </div>
  </>
);

const Direction = ({
  n,
  name,
  thesis,
  pageClassName = 'bg-background',
  pageNote,
  children,
}: {
  n: number;
  name: string;
  thesis: string;
  pageClassName?: string;
  pageNote?: string;
  children: ReactNode;
}) => (
  <section className={`px-10 py-12 ${pageClassName}`}>
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 max-w-2xl">
        <span className="text-secondary font-mono text-xs">
          {String(n).padStart(2, '0')}
          {pageNote ? ` · ${pageNote}` : ''}
        </span>
        <h2 className="text-foreground text-base font-semibold">{name}</h2>
        <p className="text-secondary mt-1 text-sm">{thesis}</p>
      </header>
      <div className="grid items-start gap-6 xl:grid-cols-2">{children}</div>
    </div>
  </section>
);

export const DesignExploration = meta.story({
  args: { children: null as never },
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="flex flex-col">
      <Direction
        n={1}
        name="Hairline Flat"
        thesis="Drop the shadow entirely, keep one crisp hairline border. The Linear/Cursor recipe: separation comes from a clean edge, not depth."
      >
        <div className="border-charcoal-300 bg-surface flex flex-col gap-5 rounded-lg border p-6">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/50 bg-surface flex flex-col gap-5 rounded-lg border p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={2}
        name="Soft Float"
        thesis="No border at all; a wide, diffuse shadow lifts the panel off the page. Softer and warmer than the current tight elevation shadow."
      >
        <div className="bg-surface flex flex-col gap-5 rounded-xl p-6 shadow-[0_1px_2px_oklch(0_0_0/0.05),0_12px_32px_-12px_oklch(0_0_0/0.18)]">
          <ExplorationBody />
        </div>
        <div className="flex flex-col gap-5 rounded-xl bg-red-50 p-6 shadow-[0_1px_2px_oklch(0_0_0/0.05),0_12px_32px_-12px_oklch(0_0_0/0.18)]">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={3}
        name="Deeper Canvas"
        thesis="The page steps one shade darker so the white surface barely needs ornament: a faint hairline and the smallest shadow tier do the rest."
        pageClassName="bg-charcoal-200"
        pageNote="page: charcoal-200"
      >
        <div className="border-charcoal-300/70 bg-surface shadow-elevation-border flex flex-col gap-5 rounded-lg border p-6">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/40 bg-surface shadow-elevation-border flex flex-col gap-5 rounded-lg border p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={4}
        name="Muted Panel"
        thesis="Inverted contrast: a near-white page with tinted panels. The panel recedes into the page architecture while white inputs pop inside it."
        pageClassName="bg-white"
        pageNote="page: white"
      >
        <div className="bg-charcoal-100 flex flex-col gap-5 rounded-xl p-6">
          <ExplorationBody />
        </div>
        <div className="bg-destructive/60 flex flex-col gap-5 rounded-xl p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={5}
        name="Zoned"
        thesis="GitHub/Stripe anatomy: tinted header band and footer well, hairline-divided. The panel's skeleton is visible before you read a word."
      >
        <div className="border-charcoal-300 bg-surface overflow-hidden rounded-lg border">
          <div className="bg-charcoal-50 border-charcoal-200 border-b px-6 py-4">
            <ExplorationHeader />
          </div>
          <div className="px-6 py-5">
            <ExplorationFields />
          </div>
          <div className="bg-charcoal-50 border-charcoal-200 border-t px-6 py-3">
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
        <div className="border-destructive-accent/40 bg-surface overflow-hidden rounded-lg border">
          <div className="bg-destructive/40 border-destructive-accent/20 border-b px-6 py-4">
            <ExplorationHeader
              title="Danger zone"
              description="Irreversible actions for this organizer."
              titleClassName="text-destructive-foreground text-lg leading-none font-semibold"
              action={false}
            />
          </div>
          <div className="px-6 py-5">
            <Text>
              Deleting this organizer removes all events, orders, and payout
              history. This cannot be undone.
            </Text>
          </div>
          <div className="bg-destructive/40 border-destructive-accent/20 border-t px-6 py-3">
            <Button variant="destructive">Delete organizer</Button>
          </div>
        </div>
      </Direction>

      <Direction
        n={6}
        name="Ruled Paper"
        thesis="Structure from inner rules instead of the outer box: the smallest shadow tier outside, hairline dividers between header, content, and footer."
      >
        <div className="bg-surface shadow-elevation-border divide-charcoal-200 divide-y rounded-lg">
          <div className="px-6 py-4">
            <ExplorationHeader />
          </div>
          <div className="px-6 py-5">
            <ExplorationFields />
          </div>
          <div className="px-6 py-4">
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
        <div className="bg-surface shadow-elevation-border divide-charcoal-200 ring-destructive-accent/40 divide-y rounded-lg ring-1">
          <div className="px-6 py-4">
            <ExplorationHeader
              title="Danger zone"
              description="Irreversible actions for this organizer."
              titleClassName="text-destructive-foreground text-lg leading-none font-semibold"
              action={false}
            />
          </div>
          <div className="px-6 py-5">
            <Text>
              Deleting this organizer removes all events, orders, and payout
              history. This cannot be undone.
            </Text>
          </div>
          <div className="px-6 py-4">
            <Button variant="destructive">Delete organizer</Button>
          </div>
        </div>
      </Direction>

      <Direction
        n={7}
        name="Floating Title"
        thesis="Vercel settings: the title and description live on the page, the surface only boxes the form. The heading anchors the region, so the box can stay quiet."
      >
        <div>
          <h3 className="text-foreground text-lg leading-none font-semibold">
            Organizer profile
          </h3>
          <p className="text-secondary mt-1.5 text-sm">
            Public details shown to customers on ticket confirmations and event
            pages.
          </p>
          <div className="border-charcoal-300/70 bg-surface mt-4 flex flex-col gap-5 rounded-lg border p-6">
            <ExplorationFields />
            <div>
              <Button variant="primary">Save changes</Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-destructive-foreground text-lg leading-none font-semibold">
            Danger zone
          </h3>
          <p className="text-secondary mt-1.5 text-sm">
            Irreversible actions for this organizer.
          </p>
          <div className="border-destructive-accent/40 bg-surface mt-4 flex flex-col gap-5 rounded-lg border p-6">
            <Text>
              Deleting this organizer removes all events, orders, and payout
              history. This cannot be undone.
            </Text>
            <div>
              <Button variant="destructive">Delete organizer</Button>
            </div>
          </div>
        </div>
      </Direction>

      <Direction
        n={8}
        name="Open Section"
        thesis="No box at all: a strong top rule and typography carry the region, Notion/Langdock style. The most radical answer to 'less border'."
      >
        <div className="border-charcoal-900 flex flex-col gap-5 border-t-2 pt-5">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent flex flex-col gap-5 border-t-2 pt-5">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={9}
        name="Accent Spine"
        thesis="Hairline panel with a colored left spine as a playful marker. The spine is the variant system: charcoal for default, orange/purple/red for master/admin/destructive."
      >
        <div className="border-charcoal-300 border-l-charcoal-900 bg-surface flex flex-col gap-5 rounded-lg border border-l-4 p-6">
          <ExplorationBody />
        </div>
        <div className="border-charcoal-300 border-l-destructive-bold bg-surface flex flex-col gap-5 rounded-lg border border-l-4 p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={10}
        name="Solid Lift"
        thesis="A hairline border plus a 2px solid offset shadow — tactile and slightly playful, like a key on a keyboard, without any blur haze."
      >
        <div className="border-charcoal-300 bg-surface flex flex-col gap-5 rounded-lg border p-6 shadow-[0_2px_0_0_var(--color-charcoal-300)]">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/50 bg-surface flex flex-col gap-5 rounded-lg border p-6 shadow-[0_2px_0_0_var(--color-red-200)]">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={11}
        name="Soft Gradient"
        thesis="A barely-there vertical gradient (white to charcoal-50) suggests curvature instead of elevation. Depth without a shadow, border stays faint."
      >
        <div className="border-charcoal-200 from-surface to-charcoal-50 flex flex-col gap-5 rounded-xl border bg-linear-to-b p-6">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/40 from-surface flex flex-col gap-5 rounded-xl border bg-linear-to-b to-red-50 p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      {/* ============ Iteration 2: combos & playful directions ============ */}

      <Direction
        n={12}
        name="Zoned Canvas"
        thesis="The requested combo: charcoal-200 page + the Zoned anatomy. The darker page does the separating, the bands do the structuring — the panel itself needs almost no ornament."
        pageClassName="bg-charcoal-200"
        pageNote="page: charcoal-200"
      >
        <div className="border-charcoal-300 bg-surface overflow-hidden rounded-lg border">
          <div className="bg-charcoal-50 border-charcoal-200 border-b px-6 py-4">
            <ExplorationHeader />
          </div>
          <div className="px-6 py-5">
            <ExplorationFields />
          </div>
          <div className="bg-charcoal-50 border-charcoal-200 border-t px-6 py-3">
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
        <div className="border-destructive-accent/40 bg-surface overflow-hidden rounded-lg border">
          <div className="bg-destructive/40 border-destructive-accent/20 border-b px-6 py-4">
            <ExplorationHeader
              title="Danger zone"
              description="Irreversible actions for this organizer."
              titleClassName="text-destructive-foreground text-lg leading-none font-semibold"
              action={false}
            />
          </div>
          <div className="px-6 py-5">
            <Text>
              Deleting this organizer removes all events, orders, and payout
              history. This cannot be undone.
            </Text>
          </div>
          <div className="bg-destructive/40 border-destructive-accent/20 border-t px-6 py-3">
            <Button variant="destructive">Delete organizer</Button>
          </div>
        </div>
      </Direction>

      <Direction
        n={13}
        name="Bold Hairline"
        thesis="The hairline doubled: a 2px border in the same border tone. Heavier presence without any darkness — separation through weight, not color."
      >
        <div className="border-charcoal-300 bg-surface flex flex-col gap-5 rounded-xl border-2 p-6">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/50 bg-surface flex flex-col gap-5 rounded-xl border-2 p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={14}
        name="Ink Outline"
        thesis="A confident 2px near-ink outline with a big radius. The roundness keeps it friendly; the dark line gives the strongest edge of any direction."
      >
        <div className="border-charcoal-900/70 bg-surface flex flex-col gap-5 rounded-2xl border-2 p-6">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent bg-surface flex flex-col gap-5 rounded-2xl border-2 p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={15}
        name="Halo Ring"
        thesis="A hairline border plus a wide soft ring that bleeds onto the page — the panel sits in a faint halo instead of a shadow."
      >
        <div className="border-charcoal-300 bg-surface ring-charcoal-200/60 flex flex-col gap-5 rounded-xl border p-6 ring-4">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/50 bg-surface ring-destructive/60 flex flex-col gap-5 rounded-xl border p-6 ring-4">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={16}
        name="Gradient Frame"
        thesis="The existing ui-surface gradient-border trick, exaggerated to 2px: the border fades from light at the top to dark at the bottom, like light falling on an edge."
      >
        <div className="flex flex-col gap-5 rounded-xl border-2 border-transparent p-6 [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,linear-gradient(to_bottom,var(--color-charcoal-200),var(--color-charcoal-400))_border-box]">
          <ExplorationBody />
        </div>
        <div className="flex flex-col gap-5 rounded-xl border-2 border-transparent p-6 [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,linear-gradient(to_bottom,var(--color-red-200),var(--color-destructive-accent))_border-box]">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={17}
        name="Nested Frame"
        thesis="A surface within a surface: a tinted outer frame holds a white inner panel, passe-partout style. The double edge reads as crafted, not decorated."
      >
        <div className="border-charcoal-200 bg-charcoal-50 rounded-2xl border p-1.5">
          <div className="border-charcoal-200 bg-surface flex flex-col gap-5 rounded-[10px] border p-6">
            <ExplorationBody />
          </div>
        </div>
        <div className="border-destructive-accent/30 bg-destructive/40 rounded-2xl border p-1.5">
          <div className="border-destructive-accent/30 bg-surface flex flex-col gap-5 rounded-[10px] border p-6">
            <ExplorationDangerBody />
          </div>
        </div>
      </Direction>

      <Direction
        n={18}
        name="Sticker"
        thesis="A tinted panel wrapped in a thick white edge with a soft shadow — like a sticker placed on the page. The most playful border treatment here."
      >
        <div className="bg-charcoal-50 flex flex-col gap-5 rounded-2xl border-4 border-white p-6 shadow-[0_2px_8px_oklch(0_0_0/0.08),0_12px_28px_-12px_oklch(0_0_0/0.18)]">
          <ExplorationBody />
        </div>
        <div className="bg-destructive/50 flex flex-col gap-5 rounded-2xl border-4 border-white p-6 shadow-[0_2px_8px_oklch(0_0_0/0.08),0_12px_28px_-12px_oklch(0_0_0/0.18)]">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={19}
        name="Solid Pop"
        thesis="Solid Lift turned up: a 2px border and a 5px solid offset shadow, but in soft grays instead of brutalist black. Pop without aggression."
      >
        <div className="border-charcoal-400 bg-surface flex flex-col gap-5 rounded-2xl border-2 p-6 shadow-[5px_5px_0_0_var(--color-charcoal-200)]">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/60 bg-surface flex flex-col gap-5 rounded-2xl border-2 p-6 shadow-[5px_5px_0_0_var(--color-red-100)]">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={20}
        name="Pillow"
        thesis="Maximum softness: an extra-large radius, generous padding, no border, one deep diffuse shadow. The friendliest possible read of 'panel'."
      >
        <div className="bg-surface flex flex-col gap-5 rounded-3xl p-8 shadow-[0_2px_4px_oklch(0_0_0/0.04),0_16px_40px_-16px_oklch(0_0_0/0.15)]">
          <ExplorationBody />
        </div>
        <div className="flex flex-col gap-5 rounded-3xl bg-red-50 p-8 shadow-[0_2px_4px_oklch(0_0_0/0.04),0_16px_40px_-16px_oklch(0_0_0/0.15)]">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={21}
        name="Marigold Cream"
        thesis="Brand warmth as the surface itself: a cream orange-50 panel with a soft orange hairline. Friendly and unmistakably Marigold — but it competes with the master variant's orange."
      >
        <div className="flex flex-col gap-5 rounded-xl border border-orange-200 bg-orange-50 p-6">
          <ExplorationBody />
        </div>
        <div className="flex flex-col gap-5 rounded-xl border border-red-200 bg-red-50 p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={22}
        name="Tone on Tone"
        thesis="No white at all: a charcoal-50 panel on a charcoal-200 page. Everything stays in the warm gray family — muted, calm, very soft separation."
        pageClassName="bg-charcoal-200"
        pageNote="page: charcoal-200"
      >
        <div className="border-charcoal-300/60 bg-charcoal-50 flex flex-col gap-5 rounded-xl border p-6">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/40 bg-destructive/50 flex flex-col gap-5 rounded-xl border p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={23}
        name="Soft Emboss"
        thesis="A faintly tinted surface with a white inner top highlight and a whisper of shadow — the panel reads as gently extruded from the page, like a soft key."
      >
        <div className="border-charcoal-300 bg-charcoal-50 flex flex-col gap-5 rounded-xl border p-6 shadow-[0_1px_2px_oklch(0_0_0/0.08)] inset-shadow-[0_1px_0_0_white]">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/40 bg-destructive/40 flex flex-col gap-5 rounded-xl border p-6 shadow-[0_1px_2px_oklch(0_0_0/0.08)] inset-shadow-[0_1px_0_0_white]">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={24}
        name="Recessed Well"
        thesis="The opposite of elevation: the panel is carved into the page as a darker well with an inset shadow. Region-not-object, and white inputs pop inside it."
      >
        <div className="border-charcoal-300/40 bg-charcoal-200/50 flex flex-col gap-5 rounded-xl border p-6 inset-shadow-[0_1px_3px_0_oklch(0_0_0/0.08)]">
          <ExplorationBody />
        </div>
        <div className="border-destructive-accent/30 bg-destructive/40 flex flex-col gap-5 rounded-xl border p-6 inset-shadow-[0_1px_3px_0_oklch(0_0_0/0.08)]">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={25}
        name="Top Accent"
        thesis="A hairline panel with a 4px accent bar across the top edge. The bar is the variant system: ink for default, red/orange/purple for the access variants."
      >
        <div className="border-charcoal-300 border-t-charcoal-900 bg-surface flex flex-col gap-5 rounded-lg border border-t-4 p-6">
          <ExplorationBody />
        </div>
        <div className="border-charcoal-300 border-t-destructive-bold bg-surface flex flex-col gap-5 rounded-lg border border-t-4 p-6">
          <ExplorationDangerBody />
        </div>
      </Direction>

      <Direction
        n={26}
        name="Title Tick"
        thesis="The accent moves into typography: a short rounded tick under the title carries the variant color. The surface itself stays nearly invisible."
      >
        <div className="bg-surface shadow-elevation-border flex flex-col gap-5 rounded-xl p-6">
          <div>
            <ExplorationHeader />
            <div className="bg-charcoal-900 mt-3 h-1 w-8 rounded-full" />
          </div>
          <ExplorationFields />
          <div>
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
        <div className="bg-surface shadow-elevation-border flex flex-col gap-5 rounded-xl p-6">
          <div>
            <ExplorationHeader
              title="Danger zone"
              description="Irreversible actions for this organizer."
              titleClassName="text-destructive-foreground text-lg leading-none font-semibold"
              action={false}
            />
            <div className="bg-destructive-bold mt-3 h-1 w-8 rounded-full" />
          </div>
          <Text>
            Deleting this organizer removes all events, orders, and payout
            history. This cannot be undone.
          </Text>
          <div>
            <Button variant="destructive">Delete organizer</Button>
          </div>
        </div>
      </Direction>

      <Direction
        n={27}
        name="Action Tray"
        thesis="Half of Zoned: only the footer becomes a recessed tray, on the darker page from Deeper Canvas. The header floats free, actions get their own shelf."
        pageClassName="bg-charcoal-200"
        pageNote="page: charcoal-200"
      >
        <div className="bg-surface shadow-elevation-border overflow-hidden rounded-xl">
          <div className="flex flex-col gap-5 px-6 pt-6 pb-5">
            <ExplorationHeader />
            <ExplorationFields />
          </div>
          <div className="bg-charcoal-50 border-charcoal-200 border-t px-6 py-3">
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
        <div className="bg-surface shadow-elevation-border overflow-hidden rounded-xl">
          <div className="flex flex-col gap-5 px-6 pt-6 pb-5">
            <ExplorationHeader
              title="Danger zone"
              description="Irreversible actions for this organizer."
              titleClassName="text-destructive-foreground text-lg leading-none font-semibold"
              action={false}
            />
            <Text>
              Deleting this organizer removes all events, orders, and payout
              history. This cannot be undone.
            </Text>
          </div>
          <div className="bg-destructive/40 border-destructive-accent/20 border-t px-6 py-3">
            <Button variant="destructive">Delete organizer</Button>
          </div>
        </div>
      </Direction>

      <Direction
        n={28}
        name="Split Stack"
        thesis="iOS-grouped-style: header, content, and footer are separate surfaces with small gaps, big radius outside, small radius inside. The anatomy becomes literal."
      >
        <div className="flex flex-col gap-1.5">
          <div className="border-charcoal-200 bg-surface rounded-t-2xl rounded-b-md border px-6 py-4">
            <ExplorationHeader />
          </div>
          <div className="border-charcoal-200 bg-surface rounded-md border px-6 py-5">
            <ExplorationFields />
          </div>
          <div className="border-charcoal-200 bg-surface rounded-t-md rounded-b-2xl border px-6 py-4">
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="border-destructive-accent/30 bg-destructive/40 rounded-t-2xl rounded-b-md border px-6 py-4">
            <ExplorationHeader
              title="Danger zone"
              description="Irreversible actions for this organizer."
              titleClassName="text-destructive-foreground text-lg leading-none font-semibold"
              action={false}
            />
          </div>
          <div className="border-destructive-accent/30 bg-surface rounded-md border px-6 py-5">
            <Text>
              Deleting this organizer removes all events, orders, and payout
              history. This cannot be undone.
            </Text>
          </div>
          <div className="border-destructive-accent/30 bg-surface rounded-t-md rounded-b-2xl border px-6 py-4">
            <Button variant="destructive">Delete organizer</Button>
          </div>
        </div>
      </Direction>

      <Direction
        n={29}
        name="Paper Stack"
        thesis="Two sheets peek out from behind the panel like a stack of paper — a wink of depth and playfulness with zero blur."
      >
        <div className="relative">
          <div className="border-charcoal-300/50 bg-surface/60 absolute inset-x-6 top-6 -bottom-3.5 rounded-lg border" />
          <div className="border-charcoal-300/70 bg-surface/80 absolute inset-x-3 top-3 -bottom-2 rounded-lg border" />
          <div className="border-charcoal-300 bg-surface relative flex flex-col gap-5 rounded-lg border p-6">
            <ExplorationBody />
          </div>
        </div>
        <div className="relative">
          <div className="border-destructive-accent/20 bg-destructive/30 absolute inset-x-6 top-6 -bottom-3.5 rounded-lg border" />
          <div className="border-destructive-accent/30 bg-destructive/40 absolute inset-x-3 top-3 -bottom-2 rounded-lg border" />
          <div className="border-destructive-accent/50 bg-surface relative flex flex-col gap-5 rounded-lg border p-6">
            <ExplorationDangerBody />
          </div>
        </div>
      </Direction>

      <Direction
        n={30}
        name="Legend Chip"
        thesis="The classic fieldset, modernized: the title sits in a pill that straddles the panel's top border. Unapologetically playful, instantly scannable."
      >
        <div className="border-charcoal-300 bg-surface relative mt-3 flex flex-col gap-5 rounded-xl border p-6 pt-7">
          <span className="border-charcoal-300 bg-surface text-foreground absolute -top-3.5 left-5 rounded-full border px-3 py-1.5 text-sm leading-none font-semibold">
            Organizer profile
          </span>
          <p className="text-secondary text-sm">
            Public details shown to customers on ticket confirmations and event
            pages.
          </p>
          <ExplorationFields />
          <div>
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
        <div className="border-destructive-accent/40 bg-surface relative mt-3 flex flex-col gap-5 rounded-xl border p-6 pt-7">
          <span className="border-destructive-accent/40 bg-surface text-destructive-foreground absolute -top-3.5 left-5 rounded-full border px-3 py-1.5 text-sm leading-none font-semibold">
            Danger zone
          </span>
          <Text>
            Deleting this organizer removes all events, orders, and payout
            history. This cannot be undone.
          </Text>
          <div>
            <Button variant="destructive">Delete organizer</Button>
          </div>
        </div>
      </Direction>

      <Direction
        n={31}
        name="Folder Tab"
        thesis="The title becomes a folder tab attached to the panel's top edge. A file-cabinet metaphor that fits 'each panel owns one topic' surprisingly well."
      >
        <div>
          <div className="border-charcoal-300 bg-surface relative z-1 -mb-px ml-4 inline-block rounded-t-xl border border-b-0 px-5 py-2.5">
            <h3 className="text-base leading-none font-semibold">
              Organizer profile
            </h3>
          </div>
          <div className="border-charcoal-300 bg-surface flex flex-col gap-5 rounded-tr-xl rounded-b-xl border p-6">
            <p className="text-secondary text-sm">
              Public details shown to customers on ticket confirmations and
              event pages.
            </p>
            <ExplorationFields />
            <div>
              <Button variant="primary">Save changes</Button>
            </div>
          </div>
        </div>
        <div>
          <div className="border-destructive-accent/40 bg-surface relative z-1 -mb-px ml-4 inline-block rounded-t-xl border border-b-0 px-5 py-2.5">
            <h3 className="text-destructive-foreground text-base leading-none font-semibold">
              Danger zone
            </h3>
          </div>
          <div className="border-destructive-accent/40 bg-surface flex flex-col gap-5 rounded-tr-xl rounded-b-xl border p-6">
            <Text>
              Deleting this organizer removes all events, orders, and payout
              history. This cannot be undone.
            </Text>
            <div>
              <Button variant="destructive">Delete organizer</Button>
            </div>
          </div>
        </div>
      </Direction>

      <Direction
        n={32}
        name="Side Label"
        thesis="Structural wildcard: the title moves into a left column, the surface only wraps the form. Classic enterprise settings layout with a modern, quiet box."
      >
        <div className="grid grid-cols-[160px_1fr] gap-5">
          <div>
            <h3 className="text-base leading-snug font-semibold">
              Organizer profile
            </h3>
            <p className="text-secondary mt-1 text-sm">
              Shown to customers on confirmations.
            </p>
          </div>
          <div className="border-charcoal-300 bg-surface flex flex-col gap-5 rounded-xl border p-6">
            <ExplorationFields />
            <div>
              <Button variant="primary">Save changes</Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[160px_1fr] gap-5">
          <div>
            <h3 className="text-destructive-foreground text-base leading-snug font-semibold">
              Danger zone
            </h3>
            <p className="text-secondary mt-1 text-sm">
              Irreversible actions for this organizer.
            </p>
          </div>
          <div className="border-destructive-accent/40 bg-surface flex flex-col gap-5 rounded-xl border p-6">
            <Text>
              Deleting this organizer removes all events, orders, and payout
              history. This cannot be undone.
            </Text>
            <div>
              <Button variant="destructive">Delete organizer</Button>
            </div>
          </div>
        </div>
      </Direction>
    </div>
  ),
});

// ===================================================================
// Full-page layout exploration
// -------------------------------------------------------------------
// Throwaway design spike, round 3: six surface recipes from the
// exploration above (01+02 combined, 05, 07, 11, 13, 15) rendered in
// three realistic, dense enterprise page layouts — a stacked settings
// form page, a large orders table page, and a KPI/overview page.
// All pages sit on the regular charcoal-100 background inside a
// shared app shell. Layout references: Workable settings, Zoho CRM
// deals table, Squarespace orders, Cloudflare account home (Mobbin).
// Delete this block once a direction is chosen and tokenized.
// ===================================================================

type LayoutRecipe = {
  key: string;
  label: string;
  /** Surface classes for the default panel (no padding — MockPanel adds it). */
  surface: string;
  /** Surface classes for the destructive panel. */
  dangerSurface: string;
  /** Tinted header band / footer well anatomy (direction 05). */
  zoned?: boolean;
  headerBand?: string;
  footerBand?: string;
  dangerHeaderBand?: string;
  dangerFooterBand?: string;
};

const layoutRecipes: LayoutRecipe[] = [
  {
    key: 'hairline-float',
    label: '01+02 · Hairline Float',
    surface:
      'border-charcoal-300 bg-surface rounded-xl border shadow-[0_1px_2px_oklch(0_0_0/0.05),0_12px_32px_-12px_oklch(0_0_0/0.18)]',
    dangerSurface:
      'border-destructive-accent/50 bg-surface rounded-xl border shadow-[0_1px_2px_oklch(0_0_0/0.05),0_12px_32px_-12px_oklch(0_0_0/0.18)]',
  },
  {
    key: 'zoned',
    label: '05 · Zoned',
    surface: 'border-charcoal-300 bg-surface overflow-hidden rounded-lg border',
    dangerSurface:
      'border-destructive-accent/40 bg-surface overflow-hidden rounded-lg border',
    zoned: true,
    headerBand: 'bg-charcoal-50 border-charcoal-200 border-b',
    footerBand: 'bg-charcoal-50 border-charcoal-200 border-t',
    dangerHeaderBand: 'bg-destructive/40 border-destructive-accent/20 border-b',
    dangerFooterBand: 'bg-destructive/40 border-destructive-accent/20 border-t',
  },
  {
    key: 'bold-hairline',
    label: '13 · Bold Hairline',
    surface: 'border-charcoal-300 bg-surface rounded-xl border-2',
    dangerSurface:
      'border-destructive-accent/50 bg-surface rounded-xl border-2',
  },
  {
    key: 'halo-ring',
    label: '15 · Halo Ring',
    surface:
      'border-charcoal-300 bg-surface ring-charcoal-200/60 rounded-xl border ring-4',
    dangerSurface:
      'border-destructive-accent/50 bg-surface ring-destructive/60 rounded-xl border ring-4',
  },
];

const MockPanel = ({
  recipe,
  title,
  description,
  action,
  footer,
  flush = false,
  danger = false,
  compact = false,
  children,
}: {
  recipe: LayoutRecipe;
  title: string;
  description?: string;
  action?: ReactNode;
  footer?: ReactNode;
  /** Body without padding, content (tables) runs edge-to-edge. */
  flush?: boolean;
  danger?: boolean;
  /** Tighter paddings + muted title, for KPI tiles. */
  compact?: boolean;
  children: ReactNode;
}) => {
  const surface = cn(
    danger ? recipe.dangerSurface : recipe.surface,
    flush && 'overflow-hidden'
  );
  const titleClassName = cn(
    compact
      ? 'text-secondary text-[13px] leading-none font-medium'
      : 'text-base leading-none font-semibold',
    danger ? 'text-destructive-foreground' : !compact && 'text-foreground'
  );
  const heading = (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className={titleClassName}>{title}</h3>
        {description ? (
          <p className="text-secondary mt-1 text-[13px]">{description}</p>
        ) : null}
      </div>
      {action ?? null}
    </div>
  );
  const flushFooter =
    flush && footer ? (
      <div className="border-charcoal-200 border-t px-5 py-3">{footer}</div>
    ) : null;

  if (recipe.zoned) {
    return (
      <div className={surface}>
        <div
          className={cn(
            danger ? recipe.dangerHeaderBand : recipe.headerBand,
            compact ? 'px-4 py-2.5' : 'px-5 py-3.5'
          )}
        >
          {heading}
        </div>
        {flush ? (
          children
        ) : (
          <div
            className={cn(
              'flex flex-col gap-4',
              compact ? 'px-4 py-3' : 'px-5 py-4'
            )}
          >
            {children}
            {footer && !recipe.footerBand ? <div>{footer}</div> : null}
          </div>
        )}
        {footer ? (
          <div
            className={cn(
              danger ? recipe.dangerFooterBand : recipe.footerBand,
              'px-5 py-3'
            )}
          >
            {footer}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={surface}>
      <div className={compact ? 'px-4 pt-3.5' : 'px-5 pt-5'}>{heading}</div>
      {flush ? (
        <div className="pt-3">{children}</div>
      ) : (
        <div
          className={cn(
            'flex flex-col gap-4',
            compact ? 'px-4 pt-2 pb-4' : 'px-5 pt-4 pb-5'
          )}
        >
          {children}
          {footer ? <div>{footer}</div> : null}
        </div>
      )}
      {flushFooter}
    </div>
  );
};

// --- Shared page chrome --------------------------------------------
// App frame following the App Shell pattern: Sidebar.Provider outside
// AppLayout, logo in Sidebar.Header, all navigation in Sidebar.Nav
// (groups via GroupLabel/Separator), toggle + breadcrumbs + user
// utilities in the TopNavigation, page content in AppLayout.Main.

const AppShell = ({
  active,
  breadcrumbs,
  children,
}: {
  active: string;
  breadcrumbs: string[];
  children: ReactNode;
}) => (
  <RouterProvider navigate={() => {}}>
    <Sidebar.Provider defaultOpen>
      <AppLayout>
        <AppLayout.Sidebar>
          <Sidebar.Header>
            <Inline space={2} alignY="center" noWrap>
              <span className="bg-charcoal-900 inline-block size-6 shrink-0 rounded-md" />
              <Text weight="bold">Marigold Admin</Text>
            </Inline>
          </Sidebar.Header>
          <Sidebar.Nav current={active}>
            <Sidebar.Item href="/overview">Overview</Sidebar.Item>
            <Sidebar.Item href="/events">Events</Sidebar.Item>
            <Sidebar.Item href="/orders">Orders</Sidebar.Item>
            <Sidebar.Item href="/customers">Customers</Sidebar.Item>
            <Sidebar.Item href="/reports">Reports</Sidebar.Item>
            <Sidebar.Separator />
            <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
            <Sidebar.Item href="/settings/organizer">Organizer</Sidebar.Item>
            <Sidebar.Item href="/settings/payouts">Payouts</Sidebar.Item>
            <Sidebar.Item href="/settings/team">Team</Sidebar.Item>
            <Sidebar.Item href="/settings/notifications">
              Notifications
            </Sidebar.Item>
          </Sidebar.Nav>
          <Sidebar.Footer>
            <Text fontSize="xs">v1.0.0</Text>
          </Sidebar.Footer>
        </AppLayout.Sidebar>
        <AppLayout.Header>
          <TopNavigation.Start>
            <Sidebar.Toggle />
          </TopNavigation.Start>
          <TopNavigation.Middle>
            <Breadcrumbs>
              {breadcrumbs.map(label => (
                <Breadcrumbs.Item key={label} href="#">
                  {label}
                </Breadcrumbs.Item>
              ))}
            </Breadcrumbs>
          </TopNavigation.Middle>
          <TopNavigation.End>
            <Inline space={2} alignY="center" noWrap>
              <Text size="sm" weight="bold">
                Jane Doe
              </Text>
              <Badge variant="master">Master</Badge>
            </Inline>
          </TopNavigation.End>
        </AppLayout.Header>
        <AppLayout.Main>
          <div className="bg-background min-h-full px-8 py-7">{children}</div>
        </AppLayout.Main>
      </AppLayout>
    </Sidebar.Provider>
  </RouterProvider>
);

const LayoutPageHeader = ({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) => (
  <div className="mb-5 flex items-start justify-between gap-4">
    <div>
      <h1 className="text-xl leading-tight font-semibold">{title}</h1>
      {description ? (
        <p className="text-secondary mt-1 text-sm">{description}</p>
      ) : null}
    </div>
    {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
  </div>
);

// --- Shared mock content -------------------------------------------

const layoutOrderRows = [
  {
    id: '58217',
    event: 'Summer Festival — Day 1',
    customer: 'Lena Hoffmann',
    date: 'Jun 10, 2026',
    amount: '€189.00',
    status: 'Paid',
  },
  {
    id: '58216',
    event: 'Summer Festival — Day 2',
    customer: 'Jonas Weber',
    date: 'Jun 10, 2026',
    amount: '€94.50',
    status: 'Paid',
  },
  {
    id: '58215',
    event: 'Jazz at the Park',
    customer: 'Miriam Schulz',
    date: 'Jun 9, 2026',
    amount: '€45.00',
    status: 'Pending',
  },
  {
    id: '58214',
    event: 'Summer Festival — Day 1',
    customer: 'David Brandt',
    date: 'Jun 9, 2026',
    amount: '€378.00',
    status: 'Paid',
  },
  {
    id: '58213',
    event: 'Open Air Cinema',
    customer: 'Sofia Lang',
    date: 'Jun 9, 2026',
    amount: '€24.00',
    status: 'Refunded',
  },
  {
    id: '58212',
    event: 'Summer Festival — Day 3',
    customer: 'Felix Maurer',
    date: 'Jun 8, 2026',
    amount: '€189.00',
    status: 'Paid',
  },
  {
    id: '58211',
    event: 'Jazz at the Park',
    customer: 'Anna Köhler',
    date: 'Jun 8, 2026',
    amount: '€90.00',
    status: 'Cancelled',
  },
  {
    id: '58210',
    event: 'Summer Festival — Day 2',
    customer: 'Tim Albrecht',
    date: 'Jun 8, 2026',
    amount: '€141.75',
    status: 'Paid',
  },
  {
    id: '58209',
    event: 'Open Air Cinema',
    customer: 'Clara Vogt',
    date: 'Jun 7, 2026',
    amount: '€48.00',
    status: 'Pending',
  },
  {
    id: '58208',
    event: 'Summer Festival — Day 1',
    customer: 'Paul Richter',
    date: 'Jun 7, 2026',
    amount: '€189.00',
    status: 'Paid',
  },
];

const statusPillStyles: Record<string, string> = {
  Paid: 'bg-green-100 text-green-800',
  Pending: 'bg-amber-100 text-amber-900',
  Refunded: 'bg-charcoal-200 text-secondary',
  Cancelled: 'bg-red-100 text-red-800',
};

const StatusPill = ({ status }: { status: string }) => (
  <span
    className={cn(
      'inline-block rounded-full px-2 py-0.5 text-xs font-medium',
      statusPillStyles[status]
    )}
  >
    {status}
  </span>
);

const OrdersTable = ({
  rows,
  condensed = false,
}: {
  rows: typeof layoutOrderRows;
  condensed?: boolean;
}) => (
  <table className="w-full text-sm">
    <thead>
      <tr className="border-charcoal-200 text-secondary border-b text-left text-xs">
        <th className="px-5 py-2.5 font-medium">Order</th>
        {condensed ? null : <th className="px-5 py-2.5 font-medium">Event</th>}
        <th className="px-5 py-2.5 font-medium">Customer</th>
        {condensed ? null : <th className="px-5 py-2.5 font-medium">Date</th>}
        <th className="px-5 py-2.5 text-right font-medium">Amount</th>
        <th className="px-5 py-2.5 font-medium">Status</th>
      </tr>
    </thead>
    <tbody className="divide-charcoal-200/70 divide-y">
      {rows.map(row => (
        <tr key={row.id}>
          <td className="text-foreground px-5 py-2.5 font-medium">#{row.id}</td>
          {condensed ? null : <td className="px-5 py-2.5">{row.event}</td>}
          <td className="px-5 py-2.5">{row.customer}</td>
          {condensed ? null : (
            <td className="text-secondary px-5 py-2.5">{row.date}</td>
          )}
          <td className="px-5 py-2.5 text-right tabular-nums">{row.amount}</td>
          <td className="px-5 py-2.5">
            <StatusPill status={row.status} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const FakeToggle = ({ on = true }: { on?: boolean }) => (
  <span
    className={cn(
      'relative inline-block h-5 w-9 shrink-0 rounded-full',
      on ? 'bg-charcoal-900' : 'bg-charcoal-300'
    )}
  >
    <span
      className={cn(
        'bg-surface absolute top-0.5 size-4 rounded-full',
        on ? 'right-0.5' : 'left-0.5'
      )}
    />
  </span>
);

const notificationRows = [
  {
    title: 'New order placed',
    description: 'Email for every completed checkout.',
    on: true,
  },
  {
    title: 'Daily sales summary',
    description: 'One digest at 7:00 each morning.',
    on: true,
  },
  {
    title: 'Refund requests',
    description: 'Notify the support inbox immediately.',
    on: false,
  },
];

const activityItems = [
  { text: 'Payout of €23,860 sent', time: '2 h ago' },
  { text: '142 tickets sold for Day 2', time: '5 h ago' },
  { text: 'Refund approved for order #58102', time: 'Yesterday' },
  { text: 'Price tier "Early Bird" sold out', time: '2 days ago' },
];

// --- Layout 1: dense settings form page ----------------------------

// Resting state of the agreed Halo pairing (flat hairline, no gradient,
// no shadow — proposal A/D). Display-only mock, used when a layout is
// rendered with `flatFields`.
const flatFieldClassName =
  'border-charcoal-300 bg-surface text-foreground border';

const LayoutField = ({
  flat = false,
  label,
  value,
}: {
  flat?: boolean;
  label: string;
  value: string;
}) =>
  flat ? (
    <MockField
      label={label}
      value={value}
      inputClassName={flatFieldClassName}
    />
  ) : (
    <TextField label={label} defaultValue={value} />
  );

const SettingsLayout = ({
  recipe,
  flatFields,
}: {
  recipe: LayoutRecipe;
  flatFields?: boolean;
}) => (
  <AppShell
    active="/settings/organizer"
    breadcrumbs={['Home', 'Settings', 'Organizer']}
  >
    <LayoutPageHeader
      title="Organizer settings"
      description="Manage how your organization appears to customers and how you get paid."
    />
    <div className="flex max-w-3xl flex-col gap-5">
      <MockPanel
        recipe={recipe}
        title="Organizer profile"
        description="Public details shown to customers on ticket confirmations and event pages."
        footer={
          <Button variant="primary" size="small">
            Save changes
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <LayoutField
            flat={flatFields}
            label="Organizer name"
            value="Marigold Events"
          />
          <LayoutField
            flat={flatFields}
            label="Support email"
            value="hello@marigold-ui.io"
          />
          <LayoutField
            flat={flatFields}
            label="Phone"
            value="+49 761 555 0199"
          />
          <LayoutField
            flat={flatFields}
            label="VAT ID"
            value="DE 274 318 559"
          />
        </div>
      </MockPanel>

      <MockPanel
        recipe={recipe}
        title="Payout account"
        description="Bank account used for weekly payouts."
        footer={
          <Button variant="primary" size="small">
            Save changes
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <LayoutField
            flat={flatFields}
            label="Account holder"
            value="Marigold Events GmbH"
          />
          <LayoutField
            flat={flatFields}
            label="IBAN"
            value="DE89 3704 0044 0532 6201"
          />
          <LayoutField flat={flatFields} label="BIC" value="COBADEFFXXX" />
          <LayoutField
            flat={flatFields}
            label="Payout reference"
            value="MARIGOLD-2026"
          />
        </div>
      </MockPanel>

      <MockPanel
        recipe={recipe}
        title="Notifications"
        description="Choose which events trigger an email to your team."
      >
        <div className="divide-charcoal-200/70 divide-y">
          {notificationRows.map(row => (
            <div
              key={row.title}
              className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
            >
              <div>
                <div className="text-sm font-medium">{row.title}</div>
                <p className="text-secondary text-[13px]">{row.description}</p>
              </div>
              <FakeToggle on={row.on} />
            </div>
          ))}
        </div>
      </MockPanel>

      <MockPanel
        recipe={recipe}
        danger
        title="Danger zone"
        description="Irreversible actions for this organizer."
        footer={
          <Button variant="destructive" size="small">
            Delete organizer
          </Button>
        }
      >
        <Text>
          Deleting this organizer removes all events, orders, and payout
          history. This cannot be undone.
        </Text>
      </MockPanel>
    </div>
  </AppShell>
);

// --- Layout 2: large orders table page ------------------------------

const OrdersLayout = ({
  recipe,
  flatFields,
}: {
  recipe: LayoutRecipe;
  flatFields?: boolean;
}) => (
  <AppShell active="/orders" breadcrumbs={['Home', 'Orders']}>
    <LayoutPageHeader
      title="Orders"
      description="248 orders across all events in the last 30 days."
      actions={
        <>
          <Button size="small">Export CSV</Button>
          <Button variant="primary" size="small">
            Create order
          </Button>
        </>
      }
    />
    <div className="mb-4 flex items-center gap-2">
      <div className="w-72">
        {flatFields ? (
          <div
            className={cn(
              'h-control flex items-center rounded-lg px-3 text-sm',
              flatFieldClassName,
              'text-placeholder'
            )}
          >
            Search orders…
          </div>
        ) : (
          <TextField aria-label="Search orders" placeholder="Search orders…" />
        )}
      </div>
      <Button size="small">Status: All</Button>
      <Button size="small">Event: All</Button>
      <Button size="small">Last 30 days</Button>
    </div>
    <MockPanel
      recipe={recipe}
      flush
      title="All orders"
      action={
        <span className="text-secondary text-[13px]">Updated 2 min ago</span>
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-secondary text-[13px]">
            Showing 1–10 of 248
          </span>
          <div className="flex gap-1.5">
            <Button size="small">Previous</Button>
            <Button size="small">Next</Button>
          </div>
        </div>
      }
    >
      <OrdersTable rows={layoutOrderRows} />
    </MockPanel>
  </AppShell>
);

// --- Layout 3: KPI / event overview page ----------------------------

const layoutKpis = [
  { label: 'Tickets sold', value: '12,480', delta: '+8.2% vs last week' },
  { label: 'Gross revenue', value: '€486,240', delta: '+12.4% vs last week' },
  { label: 'Refund rate', value: '1.2%', delta: '−0.3 pt vs last week' },
  { label: 'Check-ins', value: '8,910', delta: '71% of sold tickets' },
];

const OverviewLayout = ({ recipe }: { recipe: LayoutRecipe }) => (
  <AppShell
    active="/overview"
    breadcrumbs={['Home', 'Events', 'Summer Festival 2026']}
  >
    <LayoutPageHeader
      title="Summer Festival 2026"
      description="Jul 18–20, 2026 · Messe Freiburg"
      actions={
        <>
          <Button size="small">Preview event</Button>
          <Button variant="primary" size="small">
            Edit event
          </Button>
        </>
      }
    />
    <div className="grid grid-cols-4 gap-4">
      {layoutKpis.map(kpi => (
        <MockPanel key={kpi.label} recipe={recipe} compact title={kpi.label}>
          <div>
            <div className="text-2xl leading-tight font-semibold tabular-nums">
              {kpi.value}
            </div>
            <p className="text-secondary mt-0.5 text-xs">{kpi.delta}</p>
          </div>
        </MockPanel>
      ))}
    </div>
    <div className="mt-5 grid grid-cols-[2fr_1fr] items-start gap-5">
      <MockPanel
        recipe={recipe}
        flush
        title="Recent orders"
        action={<Button size="small">View all</Button>}
      >
        <OrdersTable rows={layoutOrderRows.slice(0, 6)} condensed />
      </MockPanel>
      <div className="flex flex-col gap-5">
        <MockPanel
          recipe={recipe}
          title="Payout schedule"
          footer={<Button size="small">Change schedule</Button>}
        >
          <dl className="divide-charcoal-200/70 divide-y text-sm">
            {[
              ['Next payout', 'Fri, Jun 13 · €23,860'],
              ['Frequency', 'Weekly'],
              ['Account', 'DE89 3704 •••• 6201'],
            ].map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0"
              >
                <dt className="text-secondary">{key}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </MockPanel>
        <MockPanel recipe={recipe} title="Activity">
          <ul className="flex flex-col gap-3">
            {activityItems.map(item => (
              <li key={item.text} className="flex gap-2.5 text-[13px]">
                <span className="bg-charcoal-400 mt-1.25 size-1.5 shrink-0 rounded-full" />
                <div>
                  <p className="text-foreground">{item.text}</p>
                  <p className="text-secondary mt-0.5 text-xs">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </MockPanel>
      </div>
    </div>
  </AppShell>
);

// --- Story ----------------------------------------------------------

const fullPageLayouts = [
  {
    key: 'settings',
    label: 'Settings form page',
    render: (recipe: LayoutRecipe, flatFields?: boolean) => (
      <SettingsLayout recipe={recipe} flatFields={flatFields} />
    ),
  },
  {
    key: 'orders',
    label: 'Orders table page',
    render: (recipe: LayoutRecipe, flatFields?: boolean) => (
      <OrdersLayout recipe={recipe} flatFields={flatFields} />
    ),
  },
  {
    key: 'overview',
    label: 'Event overview page',
    render: (recipe: LayoutRecipe) => <OverviewLayout recipe={recipe} />,
  },
];

export const FullPageLayouts = meta.story({
  args: { children: null as never },
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="flex flex-col">
      {layoutRecipes.map(recipe =>
        fullPageLayouts.map(layout => (
          <section key={`${recipe.key}-${layout.key}`}>
            <div className="bg-charcoal-900 px-6 py-2 font-mono text-xs text-white">
              {recipe.label} · {layout.label}
            </div>
            {layout.render(recipe)}
          </section>
        ))
      )}
    </div>
  ),
});

// ===================================================================
// Style refinements — before/after against the element design language
// -------------------------------------------------------------------
// The harmony benchmark: inputs and secondary buttons share the
// `ui-surface` utility — rounded-surface (lg) corners, a 1px gradient
// hairline (--color-border fading 10% darker at the bottom), white
// surface plus the micro `shadow-elevation-border`. Primary buttons
// are "lit from above" (ui-surface-contrast). Each refinement below
// re-aligns a panel recipe to that language: same radius token, same
// (gradient) border, shadows on the elevation ramp, variants via the
// `--ui-border-color` hook that inputs already use for invalid state.
// ===================================================================

const recipeByKey = Object.fromEntries(layoutRecipes.map(r => [r.key, r]));

const refinedRecipes: Record<string, LayoutRecipe> = {
  'hairline-float': {
    key: 'hairline-float-refined',
    label: '01+02 · Hairline Float — refined',
    surface:
      'ui-surface shadow-[0_1px_1px_oklch(0_0_0/0.08),0_8px_16px_-10px_oklch(0_0_0/0.12)]',
    dangerSurface:
      'ui-surface [--ui-border-color:var(--color-destructive-accent)] shadow-[0_1px_1px_oklch(0_0_0/0.08),0_8px_16px_-10px_oklch(0_0_0/0.12)]',
  },
  zoned: {
    key: 'zoned-refined',
    label: '05 · Zoned — refined',
    surface: 'ui-surface overflow-hidden',
    dangerSurface:
      'ui-surface [--ui-border-color:var(--color-destructive-accent)] overflow-hidden',
    zoned: true,
    headerBand: 'bg-charcoal-50 border-charcoal-200 border-b',
    footerBand: 'bg-charcoal-50 border-charcoal-200 border-t',
    dangerHeaderBand: 'bg-destructive/40 border-destructive-accent/20 border-b',
    dangerFooterBand: 'bg-destructive/40 border-destructive-accent/20 border-t',
  },
  'bold-hairline': {
    key: 'bold-hairline-refined',
    label: '13 · Bold Hairline — refined',
    surface:
      'border-charcoal-400 bg-surface rounded-surface shadow-elevation-border border',
    dangerSurface:
      'border-destructive-accent bg-surface rounded-surface shadow-elevation-border border',
  },
};

const styleRefinements = [
  {
    key: 'hairline-float',
    problems: [
      'Solid, flat 1px border next to controls whose hairline is a top-lit gradient — the panel edge reads dead beside its own inputs.',
      'rounded-xl corners disagree with the rounded-surface (lg) of every control inside.',
      'The 32px diffuse drop shadow sits outside the elevation ramp; controls cast micro-shadows, the panel casts a cloud.',
    ],
    fix: 'Adopt ui-surface (identical gradient hairline + radius token as inputs) and rebuild the float as a scaled-up step of the elevation ramp. Danger variant via --ui-border-color — the hook inputs already use.',
  },
  {
    key: 'zoned',
    problems: [
      'Anatomy already matches the system (lg radius, charcoal bands), but the solid outer border is the one flat edge on a screen full of gradient hairlines.',
    ],
    fix: 'Swap the shell to ui-surface so panel, inputs, and secondary buttons share the exact same edge treatment; bands stay untouched.',
  },
  {
    key: 'bold-hairline',
    problems: [
      'A 2px border in the same charcoal-300 as the 1px input borders — same color at double weight makes the controls look anemic and the panel read like a disabled fieldset.',
    ],
    fix: 'Separation through tone, not width: 1px in charcoal-400 (one step darker than inputs) at the shared radius, plus the same micro-shadow as the controls.',
  },
];

const RefinementSpecimen = ({ recipe }: { recipe: LayoutRecipe }) => (
  <div className="flex flex-col gap-5">
    <MockPanel
      recipe={recipe}
      title="Organizer profile"
      description="Public details shown to customers on ticket confirmations."
      footer={
        <div className="flex gap-2">
          <Button variant="primary" size="small">
            Save changes
          </Button>
          <Button variant="ghost" size="small">
            Cancel
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Organizer name" defaultValue="Marigold Events" />
        <TextField label="Support email" defaultValue="hello@marigold-ui.io" />
      </div>
    </MockPanel>
    <MockPanel
      recipe={recipe}
      danger
      title="Danger zone"
      description="Irreversible actions for this organizer."
      footer={
        <Button variant="destructive" size="small">
          Delete organizer
        </Button>
      }
    >
      <Text>
        Deleting this organizer removes all events, orders, and payout history.
      </Text>
    </MockPanel>
  </div>
);

export const StyleRefinements = meta.story({
  args: { children: null as never },
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="bg-background flex flex-col px-10 py-12">
      <header className="mb-4 max-w-3xl">
        <h2 className="text-foreground text-base font-semibold">
          Style refinements — aligning panels with the element language
        </h2>
        <p className="text-secondary mt-1 text-sm">
          Inputs and secondary buttons share ui-surface: rounded-surface
          corners, a 1px top-lit gradient hairline (--color-border), and the
          shadow-elevation-border micro-shadow. Each pair below re-aligns a
          panel recipe to that language.
        </p>
      </header>
      {styleRefinements.map(refinement => (
        <section key={refinement.key} className="border-charcoal-200 py-8">
          <header className="mb-5 max-w-3xl">
            <h3 className="text-foreground font-mono text-sm font-semibold">
              {recipeByKey[refinement.key].label}
            </h3>
            <ul className="text-secondary mt-2 list-disc space-y-1 pl-4 text-[13px]">
              {refinement.problems.map(problem => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
            <p className="text-foreground mt-2 text-[13px] font-medium">
              {refinement.fix}
            </p>
          </header>
          <div className="grid items-start gap-8 xl:grid-cols-2">
            <div>
              <div className="text-secondary mb-2 text-[11px] font-medium tracking-wide uppercase">
                Before
              </div>
              <RefinementSpecimen recipe={recipeByKey[refinement.key]} />
            </div>
            <div>
              <div className="text-secondary mb-2 text-[11px] font-medium tracking-wide uppercase">
                After
              </div>
              <RefinementSpecimen recipe={refinedRecipes[refinement.key]} />
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
});

// ===================================================================
// Halo Ring input pairings
// -------------------------------------------------------------------
// The original Halo Ring panel (15) stays as-is. The open question is
// the controls inside it: Marigold inputs are "top-lit objects" with a
// gradient hairline + micro drop-shadow, while a halo card is a "soft
// emanation" — two competing depth metaphors. Mobbin research on soft
// elevated cards (Cursor, Later, StackAI, Stitch, Notion, Workable)
// shows they consistently pair with flatter, quieter inputs: flat
// hairlines, soft gray fills, or underlines — never shadowed inputs.
// Each proposal below keeps the panel untouched and varies only the
// field treatment. Display-only mock inputs; focus states are shown
// statically where relevant.
// ===================================================================

const MockField = ({
  label,
  value,
  inputClassName,
  note,
}: {
  label: string;
  value: string;
  inputClassName: string;
  note?: string;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-foreground text-sm font-medium">
      {label}
      {note ? (
        <span className="text-secondary ml-1.5 text-xs font-normal">
          {note}
        </span>
      ) : null}
    </span>
    <div
      className={cn(
        'h-control flex items-center rounded-lg px-3 text-sm',
        inputClassName
      )}
    >
      {value}
    </div>
  </div>
);

const haloInputPairings = [
  {
    key: 'flat',
    name: 'A · Flat hairline',
    source: 'Cursor team setup, Later, StackAI',
    thesis:
      'The most common pairing: 1px solid hairline, white fill, zero shadow. The panel owns all softness and depth; controls are dead flat, so the halo is the only soft element on screen.',
    field: 'border-charcoal-300 bg-surface text-foreground border',
    focusField: undefined,
  },
  {
    key: 'fill',
    name: 'B · Soft fill',
    source: 'Stitch, Notion controls',
    thesis:
      'Borderless fields with a soft charcoal-100 fill. Echoes the halo instead of contrasting it — soft container, soft controls. The border only appears on focus, which keeps resting forms very calm.',
    field: 'bg-charcoal-100 text-foreground border border-transparent',
    focusField: undefined,
  },
  {
    key: 'inset',
    name: 'C · Inset well',
    source: 'soft-UI take on B',
    thesis:
      'Filled fields with a faint inner shadow — gently carved into the surface while the panel halo emanates outward. The most playful option; inner and outer softness mirror each other.',
    field:
      'bg-charcoal-50 border-charcoal-200/70 text-foreground inset-shadow-[0_1px_2px_0_oklch(0_0_0/0.06)] border',
    focusField: undefined,
  },
  {
    key: 'halo-echo',
    name: 'D · Halo echo focus',
    source: 'Marigold ui-state-focus, generalized',
    thesis:
      'Resting fields are flat hairlines (as in A), but focus blooms the same soft ring the panel wears (ring charcoal-200/60) — the halo becomes the interaction language of the whole surface, not just decoration. Second field shown focused.',
    field: 'border-charcoal-300 bg-surface text-foreground border',
    focusField:
      'border-charcoal-400 bg-surface text-foreground ring-charcoal-200/60 border ring-[3px]',
  },
];

export const HaloInputPairings = meta.story({
  args: { children: null as never },
  parameters: { layout: 'fullscreen' },
  render: () => {
    const halo = recipeByKey['halo-ring'];
    const footer = (
      <div className="flex gap-2">
        <Button variant="primary" size="small">
          Save changes
        </Button>
        <Button variant="ghost" size="small">
          Cancel
        </Button>
      </div>
    );
    return (
      <div className="bg-background flex flex-col px-10 py-12">
        <header className="mb-8 max-w-3xl">
          <h2 className="text-foreground text-base font-semibold">
            Halo Ring — what inputs pair with a soft-halo card?
          </h2>
          <p className="text-secondary mt-1 text-sm">
            The panel recipe stays untouched (hairline + ring-4
            charcoal-200/60). Current Marigold inputs carry a gradient hairline
            and a micro drop-shadow — a different depth metaphor than the
            emanating halo. Soft-card products on Mobbin pair such surfaces with
            flatter, quieter fields.
          </p>
        </header>
        <div className="grid items-start gap-x-8 gap-y-10 xl:grid-cols-2">
          <section>
            <header className="mb-3">
              <h3 className="text-foreground font-mono text-sm font-semibold">
                Current · ui-surface inputs
              </h3>
              <p className="text-secondary mt-1 max-w-xl text-[13px]">
                Baseline: gradient hairline + shadow-elevation-border inputs
                inside the halo panel. Drop shadows (top-lit object) and the
                emanating ring (soft glow) tell two different depth stories.
              </p>
            </header>
            <MockPanel
              recipe={halo}
              title="Organizer profile"
              description="Public details shown to customers."
              footer={footer}
            >
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Organizer name"
                  defaultValue="Marigold Events"
                />
                <TextField
                  label="Support email"
                  defaultValue="hello@marigold-ui.io"
                />
              </div>
            </MockPanel>
          </section>
          {haloInputPairings.map(pairing => (
            <section key={pairing.key}>
              <header className="mb-3">
                <h3 className="text-foreground font-mono text-sm font-semibold">
                  {pairing.name}
                </h3>
                <p className="text-secondary mt-1 max-w-xl text-[13px]">
                  {pairing.thesis}{' '}
                  <span className="text-secondary/80">
                    Seen in: {pairing.source}.
                  </span>
                </p>
              </header>
              <MockPanel
                recipe={halo}
                title="Organizer profile"
                description="Public details shown to customers."
                footer={footer}
              >
                <div className="grid grid-cols-2 gap-4">
                  <MockField
                    label="Organizer name"
                    value="Marigold Events"
                    inputClassName={pairing.field}
                  />
                  <MockField
                    label="Support email"
                    value="hello@marigold-ui.io"
                    inputClassName={pairing.focusField ?? pairing.field}
                    note={pairing.focusField ? '(focused)' : undefined}
                  />
                </div>
              </MockPanel>
            </section>
          ))}
        </div>
      </div>
    );
  },
});

// ===================================================================
// Full-page layouts, updated
// -------------------------------------------------------------------
// The same three dense pages rendered with the refined recipes from
// the StyleRefinements pass, plus the untouched Halo Ring paired with
// the agreed flat-hairline fields (resting state of the "halo echo
// focus" proposal). Grouped by style.
// ===================================================================

const updatedRecipes: { recipe: LayoutRecipe; flatFields?: boolean }[] = [
  { recipe: refinedRecipes['hairline-float'] },
  { recipe: refinedRecipes.zoned },
  { recipe: refinedRecipes['bold-hairline'] },
  {
    recipe: {
      ...recipeByKey['halo-ring'],
      key: 'halo-ring-flat-fields',
      label: '15 · Halo Ring + flat fields',
    },
    flatFields: true,
  },
];

export const FullPageLayoutsRefined = meta.story({
  args: { children: null as never },
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="flex flex-col">
      {updatedRecipes.map(({ recipe, flatFields }) =>
        fullPageLayouts.map(layout => (
          <section key={`${recipe.key}-${layout.key}`}>
            <div className="bg-charcoal-900 px-6 py-2 font-mono text-xs text-white">
              {recipe.label} · {layout.label}
            </div>
            {layout.render(recipe, flatFields)}
          </section>
        ))
      )}
    </div>
  ),
});

// ===================================================================
// Halo Ring mood board
// -------------------------------------------------------------------
// Free-hand exploration of the halo ring card language, deliberately
// detached from the current theme styles. Only constraint: charcoal
// palette plus orange as the single accent. Layouts modeled on dense
// B2B screens researched on Mobbin: Cursor (automations hub),
// Cloudflare (account analytics, observability), ElevenLabs (request
// log), Replit / Writer / Vapi (billing & usage).
// ===================================================================

const haloStyles = {
  classic:
    'border-charcoal-300 ring-charcoal-200/60 rounded-xl border bg-white ring-4',
  tight:
    'border-charcoal-300 ring-charcoal-200/60 rounded-lg border bg-white ring-2',
  bloom:
    'border-charcoal-200 ring-charcoal-200/35 rounded-2xl border bg-white ring-8',
  concentric:
    'rounded-xl bg-white shadow-[0_0_0_1px_var(--color-charcoal-300),0_0_0_5px_color-mix(in_oklab,var(--color-charcoal-200)_55%,transparent),0_0_0_9px_color-mix(in_oklab,var(--color-charcoal-200)_25%,transparent)]',
  ember: 'border-orange-300 ring-orange-100 rounded-xl border bg-white ring-4',
  hover:
    'border-charcoal-300 ring-charcoal-200/0 hover:ring-charcoal-200/60 rounded-xl border bg-white ring-4 transition-shadow duration-200',
} as const;

type HaloStyle = keyof typeof haloStyles;

/**
 * One notch more contrast: borders step from charcoal-300 to -400, rings
 * from charcoal-200 to -300 with slightly raised opacity so the halo itself
 * darkens visibly without turning into a hard stroke. Ember steps
 * orange-300/100 to orange-400/200.
 */
const haloStylesContrast: Record<HaloStyle, string> = {
  classic:
    'border-charcoal-400 ring-charcoal-300/70 rounded-xl border bg-white ring-4',
  tight:
    'border-charcoal-400 ring-charcoal-300/70 rounded-lg border bg-white ring-2',
  bloom:
    'border-charcoal-300 ring-charcoal-300/40 rounded-2xl border bg-white ring-8',
  concentric:
    'rounded-xl bg-white shadow-[0_0_0_1px_var(--color-charcoal-400),0_0_0_5px_color-mix(in_oklab,var(--color-charcoal-300)_65%,transparent),0_0_0_9px_color-mix(in_oklab,var(--color-charcoal-300)_30%,transparent)]',
  ember:
    'border-orange-400 ring-orange-200/80 rounded-xl border bg-white ring-4',
  hover:
    'border-charcoal-400 ring-charcoal-300/0 hover:ring-charcoal-300/70 rounded-xl border bg-white ring-4 transition-shadow duration-200',
};

const MoodHaloContext = createContext<Record<HaloStyle, string>>(haloStyles);

const MoodCard = ({
  halo = 'classic',
  className,
  children,
}: {
  halo?: HaloStyle;
  className?: string;
  children: ReactNode;
}) => {
  const styles = use(MoodHaloContext);
  return <div className={cn(styles[halo], className)}>{children}</div>;
};

const moodChipTones = {
  neutral: 'border-charcoal-200 bg-charcoal-100 text-charcoal-700 border',
  solid: 'bg-charcoal-900 text-white',
  accent: 'border-orange-200 bg-orange-100 text-orange-800 border',
  accentSolid: 'bg-orange-600 text-white',
  outline: 'border-charcoal-300 text-charcoal-600 border',
} as const;

const MoodChip = ({
  tone = 'neutral',
  children,
}: {
  tone?: keyof typeof moodChipTones;
  children: ReactNode;
}) => (
  <span
    className={cn(
      'inline-flex h-[18px] items-center gap-1 rounded-full px-2 text-[10px] font-medium whitespace-nowrap',
      moodChipTones[tone]
    )}
  >
    {children}
  </span>
);

const moodButtonVariants = {
  primary: 'bg-charcoal-900 hover:bg-charcoal-950 text-white',
  secondary:
    'border-charcoal-300 text-charcoal-800 hover:bg-charcoal-50 border bg-white',
  ghost: 'text-charcoal-600 hover:bg-charcoal-200/60',
} as const;

const MoodButton = ({
  variant = 'secondary',
  children,
}: {
  variant?: keyof typeof moodButtonVariants;
  children: ReactNode;
}) => (
  <button
    type="button"
    className={cn(
      'inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium',
      moodButtonVariants[variant]
    )}
  >
    {children}
  </button>
);

const MoodSearch = ({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) => (
  <div
    className={cn(
      'border-charcoal-300 text-charcoal-400 flex h-7 items-center gap-1.5 rounded-lg border bg-white px-2.5 text-xs',
      className
    )}
  >
    <span aria-hidden>⌕</span>
    <span>{placeholder}</span>
  </div>
);

const sparkBars = (heights: string[]) =>
  heights.map((h, i) => ({ id: `bar-${i + 1}`, h }));

const MoodSpark = ({
  bars,
  accent = false,
}: {
  bars: { id: string; h: string }[];
  accent?: boolean;
}) => (
  <div aria-hidden className="flex h-6 items-end gap-[3px]">
    {bars.map(bar => (
      <div
        key={bar.id}
        className={cn(
          'w-[3px] rounded-full',
          accent ? 'bg-orange-400' : 'bg-charcoal-300',
          bar.h
        )}
      />
    ))}
  </div>
);

const MoodSectionBanner = ({ children }: { children: ReactNode }) => (
  <div className="bg-charcoal-900 px-6 py-2 font-mono text-xs text-white">
    {children}
  </div>
);

const haloSpecimens: {
  key: HaloStyle;
  name: string;
  note: string;
}[] = [
  {
    key: 'classic',
    name: 'Classic',
    note: '1px hairline + 4px halo — the default card shell.',
  },
  {
    key: 'tight',
    name: 'Tight',
    note: '2px ring for nested cards; keeps density inside other halos.',
  },
  {
    key: 'bloom',
    name: 'Bloom',
    note: '8px wide, faint halo — airy hero cards, low-count layouts only.',
  },
  {
    key: 'concentric',
    name: 'Concentric',
    note: 'Two fading rings — engraved look for a selected/active card.',
  },
  {
    key: 'ember',
    name: 'Ember',
    note: 'Orange halo — one per screen: current plan, open incidents.',
  },
  {
    key: 'hover',
    name: 'Hover halo',
    note: 'Ring fades in on hover — interactive/clickable card grids.',
  },
];

const kpiStats = [
  {
    label: 'Requests · 24h',
    value: '4.82M',
    delta: '+12.4%',
    accent: false,
    bars: sparkBars([
      'h-2',
      'h-2.5',
      'h-2',
      'h-3',
      'h-3.5',
      'h-3',
      'h-4',
      'h-5',
      'h-4',
      'h-6',
    ]),
  },
  {
    label: 'Error rate',
    value: '0.42%',
    delta: '▲ 0.11pp',
    accent: true,
    bars: sparkBars([
      'h-1',
      'h-1.5',
      'h-1',
      'h-1',
      'h-2',
      'h-1.5',
      'h-2.5',
      'h-2',
      'h-3',
      'h-4',
    ]),
  },
  {
    label: 'P95 latency',
    value: '184 ms',
    delta: '−9 ms',
    accent: false,
    bars: sparkBars([
      'h-4',
      'h-3.5',
      'h-4',
      'h-3',
      'h-3.5',
      'h-3',
      'h-2.5',
      'h-3',
      'h-2.5',
      'h-2',
    ]),
  },
  {
    label: 'Active workers',
    value: '312',
    delta: '+4',
    accent: false,
    bars: sparkBars([
      'h-3',
      'h-3',
      'h-3.5',
      'h-3',
      'h-3.5',
      'h-4',
      'h-3.5',
      'h-4',
      'h-4',
      'h-4',
    ]),
  },
];

const deployments = [
  {
    service: 'api-gateway',
    env: 'production',
    commit: 'a3f9c12',
    status: 'Live',
    dot: 'bg-charcoal-900',
    time: '2m ago',
  },
  {
    service: 'checkout-web',
    env: 'production',
    commit: '9b04e77',
    status: 'Building',
    dot: 'bg-orange-500',
    time: '8m ago',
  },
  {
    service: 'search-indexer',
    env: 'staging',
    commit: 'f1d2a90',
    status: 'Live',
    dot: 'bg-charcoal-900',
    time: '21m ago',
  },
  {
    service: 'email-worker',
    env: 'production',
    commit: '77c1b3e',
    status: 'Queued',
    dot: 'bg-charcoal-400',
    time: '34m ago',
  },
  {
    service: 'fraud-scoring',
    env: 'production',
    commit: 'c90aa41',
    status: 'Live',
    dot: 'bg-charcoal-900',
    time: '1h ago',
  },
  {
    service: 'reporting-etl',
    env: 'staging',
    commit: '5e7d210',
    status: 'Failed',
    dot: 'bg-orange-600',
    time: '2h ago',
  },
];

const automationIdeas = [
  {
    title: 'Roll back on error spike',
    body: 'Auto-revert a deploy when 5xx exceeds 1% for 5 minutes.',
  },
  {
    title: 'Nightly cost digest',
    body: 'Post the daily spend summary to #platform-ops.',
  },
  {
    title: 'Stale branch cleanup',
    body: 'Close preview environments untouched for 14 days.',
  },
  {
    title: 'Latency regression alert',
    body: 'Flag any deploy that raises P95 by more than 10%.',
  },
];

const requestLog = [
  {
    id: 'req_3aa1',
    code: '200',
    tone: 'neutral' as const,
    method: 'GET',
    path: '/v1/events?expand=venue',
    latency: '23 ms',
    time: '09:58:33',
  },
  {
    id: 'req_8f02',
    code: '200',
    tone: 'neutral' as const,
    method: 'POST',
    path: '/v1/orders',
    latency: '118 ms',
    time: '09:58:21',
  },
  {
    id: 'req_77b3',
    code: '201',
    tone: 'neutral' as const,
    method: 'POST',
    path: '/v1/orders/ord_8231/tickets',
    latency: '96 ms',
    time: '09:58:16',
  },
  {
    id: 'req_c2d4',
    code: '200',
    tone: 'neutral' as const,
    method: 'GET',
    path: '/v1/customers/cus_1192',
    latency: '12 ms',
    time: '09:57:59',
  },
  {
    id: 'req_19e5',
    code: '429',
    tone: 'accent' as const,
    method: 'GET',
    path: '/v1/reports/sales',
    latency: '3 ms',
    time: '09:57:47',
  },
  {
    id: 'req_4bf6',
    code: '200',
    tone: 'neutral' as const,
    method: 'GET',
    path: '/v1/events/evt_5512/seatmap',
    latency: '201 ms',
    time: '09:57:40',
  },
  {
    id: 'req_9f27',
    code: '500',
    tone: 'accentSolid' as const,
    method: 'POST',
    path: '/v1/payouts',
    latency: '1.21 s',
    time: '09:57:21',
    selected: true,
  },
  {
    id: 'req_e0a8',
    code: '200',
    tone: 'neutral' as const,
    method: 'GET',
    path: '/v1/events?page=4',
    latency: '19 ms',
    time: '09:56:58',
  },
  {
    id: 'req_55c9',
    code: '200',
    tone: 'neutral' as const,
    method: 'DELETE',
    path: '/v1/webhooks/wh_77',
    latency: '41 ms',
    time: '09:56:30',
  },
  {
    id: 'req_b1d0',
    code: '200',
    tone: 'neutral' as const,
    method: 'GET',
    path: '/v1/orders?status=paid',
    latency: '27 ms',
    time: '09:56:12',
  },
];

const requestDetail = [
  { key: 'Request ID', value: 'req_9f27ba31', mono: true },
  { key: 'Method', value: 'POST', mono: true },
  { key: 'Path', value: '/v1/payouts', mono: true },
  { key: 'Latency', value: '1.21 s', mono: false },
  { key: 'API key', value: 'rk_live_…41aa', mono: true },
  { key: 'User', value: 'finance@acme.io', mono: false },
  { key: 'Time', value: 'Jun 11, 09:57:21', mono: false },
];

const billingPlans = [
  {
    name: 'Starter',
    price: '€49',
    cadence: '/month',
    current: false,
    features: ['5 seats', '10k orders / month', 'Email support'],
    cta: 'Downgrade',
  },
  {
    name: 'Growth',
    price: '€199',
    cadence: '/month',
    current: true,
    features: [
      '25 seats',
      '100k orders / month',
      'Priority support',
      'Audit log',
    ],
    cta: 'Manage plan',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: 'annual contract',
    current: false,
    features: ['Unlimited seats', 'SSO / SAML', 'Dedicated CSM', '99.95% SLA'],
    cta: 'Contact sales',
  },
];

const usageMeters = [
  {
    label: 'Seats',
    value: '21 / 25',
    width: 'w-[84%]',
    accent: true,
    note: '84% — consider upgrade',
  },
  {
    label: 'Orders',
    value: '63,410 / 100,000',
    width: 'w-[63%]',
    accent: false,
  },
  {
    label: 'API requests',
    value: '2.1M / 5M',
    width: 'w-[42%]',
    accent: false,
  },
  {
    label: 'Webhook deliveries',
    value: '311k / 500k',
    width: 'w-[62%]',
    accent: false,
  },
];

const invoices = [
  {
    id: 'INV-2026-0611',
    period: 'Jun 1 – Jun 30, 2026',
    amount: '€199.00',
    status: 'Due',
    tone: 'accent' as const,
  },
  {
    id: 'INV-2026-0511',
    period: 'May 1 – May 31, 2026',
    amount: '€199.00',
    status: 'Paid',
    tone: 'neutral' as const,
  },
  {
    id: 'INV-2026-0411',
    period: 'Apr 1 – Apr 30, 2026',
    amount: '€199.00',
    status: 'Paid',
    tone: 'neutral' as const,
  },
  {
    id: 'INV-2026-0311',
    period: 'Mar 1 – Mar 31, 2026',
    amount: '€243.50',
    status: 'Paid',
    tone: 'neutral' as const,
  },
  {
    id: 'INV-2026-0211',
    period: 'Feb 1 – Feb 28, 2026',
    amount: '€199.00',
    status: 'Paid',
    tone: 'neutral' as const,
  },
];

const MoodPageTitle = ({
  crumb,
  title,
  children,
}: {
  crumb: string;
  title: string;
  children?: ReactNode;
}) => (
  <div className="mb-6 flex items-end justify-between">
    <div className="flex flex-col gap-1">
      <span className="text-charcoal-500 text-xs">{crumb}</span>
      <h1 className="text-charcoal-900 text-lg font-semibold tracking-tight">
        {title}
      </h1>
    </div>
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

const MoodCardHeader = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => (
  <div className="border-charcoal-200 flex items-center justify-between border-b px-5 py-3">
    <h2 className="text-charcoal-900 text-sm font-semibold">{title}</h2>
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

const HaloSpecimensBoard = () => (
  <div className="bg-charcoal-100 px-10 py-10">
    <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-8">
      {haloSpecimens.map(specimen => (
        <MoodCard key={specimen.key} halo={specimen.key} className="p-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-charcoal-900 text-sm font-semibold">
                {specimen.name}
              </span>
              {specimen.key === 'ember' ? (
                <MoodChip tone="accent">accent</MoodChip>
              ) : (
                <MoodChip tone="outline">charcoal</MoodChip>
              )}
            </div>
            <p className="text-charcoal-500 text-xs leading-relaxed">
              {specimen.note}
            </p>
          </div>
        </MoodCard>
      ))}
    </div>
  </div>
);

const MoodOpsOverview = () => (
  <div className="bg-charcoal-100 px-10 py-10">
    <div className="mx-auto flex max-w-[1100px] flex-col gap-6">
      <MoodPageTitle crumb="Acme Cloud / Production" title="Platform overview">
        <div className="border-charcoal-300 flex h-7 items-center rounded-lg border bg-white p-0.5 text-xs">
          <span className="bg-charcoal-900 flex h-full items-center rounded-md px-2 font-medium text-white">
            24h
          </span>
          <span className="text-charcoal-600 flex h-full items-center px-2">
            7d
          </span>
          <span className="text-charcoal-600 flex h-full items-center px-2">
            30d
          </span>
        </div>
        <MoodButton variant="primary">New deployment</MoodButton>
      </MoodPageTitle>

      <MoodCard className="divide-charcoal-200 grid grid-cols-4 divide-x">
        {kpiStats.map(stat => (
          <div key={stat.label} className="flex flex-col gap-1.5 px-5 py-4">
            <span className="text-charcoal-500 text-[10px] font-medium tracking-[0.08em] uppercase">
              {stat.label}
            </span>
            <div className="flex items-end justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-charcoal-900 text-2xl font-semibold tracking-tight tabular-nums">
                  {stat.value}
                </span>
                <span
                  className={cn(
                    'text-[11px] font-medium tabular-nums',
                    stat.accent ? 'text-orange-700' : 'text-charcoal-500'
                  )}
                >
                  {stat.delta}
                </span>
              </div>
              <MoodSpark bars={stat.bars} accent={stat.accent} />
            </div>
          </div>
        ))}
      </MoodCard>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <MoodCard className="overflow-hidden">
          <MoodCardHeader title="Recent deployments">
            <MoodButton variant="ghost">View all</MoodButton>
          </MoodCardHeader>
          <div className="text-charcoal-500 grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.5fr] gap-3 px-5 pt-3 pb-1.5 text-[10px] font-medium tracking-[0.08em] uppercase">
            <span>Service</span>
            <span>Environment</span>
            <span>Commit</span>
            <span>Status</span>
            <span className="text-right">Age</span>
          </div>
          <div className="divide-charcoal-100 divide-y">
            {deployments.map(deploy => (
              <div
                key={deploy.commit}
                className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.5fr] items-center gap-3 px-5 py-2.5 text-xs"
              >
                <span className="text-charcoal-900 font-medium">
                  {deploy.service}
                </span>
                <span>
                  <MoodChip tone="outline">{deploy.env}</MoodChip>
                </span>
                <span className="text-charcoal-500 font-mono text-[11px]">
                  {deploy.commit}
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className={cn('size-1.5 rounded-full', deploy.dot)}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      deploy.status === 'Failed'
                        ? 'text-orange-700'
                        : 'text-charcoal-700'
                    )}
                  >
                    {deploy.status}
                  </span>
                </span>
                <span className="text-charcoal-500 text-right tabular-nums">
                  {deploy.time}
                </span>
              </div>
            ))}
          </div>
        </MoodCard>

        <MoodCard halo="ember" className="overflow-hidden">
          <MoodCardHeader title="Incidents">
            <MoodChip tone="accentSolid">2 open</MoodChip>
          </MoodCardHeader>
          <div className="divide-charcoal-100 divide-y">
            <div className="flex flex-col gap-1 px-5 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-charcoal-900 text-xs font-medium">
                  Elevated 5xx on checkout-web
                </span>
                <MoodChip tone="accent">SEV-2</MoodChip>
              </div>
              <span className="text-charcoal-500 text-[11px]">
                Opened 12m ago · 3 responders · #inc-2291
              </span>
            </div>
            <div className="flex flex-col gap-1 px-5 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-charcoal-900 text-xs font-medium">
                  Payout webhook retries exhausted
                </span>
                <MoodChip tone="outline">SEV-3</MoodChip>
              </div>
              <span className="text-charcoal-500 text-[11px]">
                Opened 1h ago · acknowledged · #inc-2290
              </span>
            </div>
            <div className="px-5 py-3">
              <MoodButton variant="secondary">View incident history</MoodButton>
            </div>
          </div>
        </MoodCard>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-charcoal-500 text-[10px] font-medium tracking-[0.08em] uppercase">
          Suggested automations
        </span>
        <div className="grid grid-cols-4 gap-6">
          {automationIdeas.map(idea => (
            <MoodCard
              key={idea.title}
              halo="hover"
              className="cursor-pointer p-4"
            >
              <div className="flex flex-col gap-1">
                <span className="text-charcoal-900 text-xs font-medium">
                  {idea.title}
                </span>
                <span className="text-charcoal-500 text-[11px] leading-relaxed">
                  {idea.body}
                </span>
              </div>
            </MoodCard>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MoodLogExplorer = () => (
  <div className="bg-charcoal-100 px-10 py-10">
    <div className="mx-auto flex max-w-[1100px] flex-col gap-5">
      <MoodPageTitle crumb="Acme Cloud / Developers" title="Request log">
        <MoodChip tone="neutral">last 15 minutes</MoodChip>
        <MoodButton variant="secondary">Export</MoodButton>
      </MoodPageTitle>

      <MoodCard halo="tight" className="flex items-center gap-2 px-3 py-2">
        <MoodSearch placeholder="Search path or request id…" className="w-72" />
        {['+ Method', '+ Status', '+ API key', '+ Time range'].map(chip => (
          <span
            key={chip}
            className="border-charcoal-300 text-charcoal-600 inline-flex h-6 items-center rounded-full border border-dashed px-2.5 text-[11px]"
          >
            {chip}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium">
          <span className="size-1.5 rounded-full bg-orange-500" aria-hidden />
          <span className="text-charcoal-700">Live</span>
        </span>
      </MoodCard>

      <div className="grid grid-cols-[1fr_320px] items-start gap-6">
        <MoodCard className="overflow-hidden">
          <div className="text-charcoal-500 grid grid-cols-[56px_64px_1fr_72px_76px] gap-3 px-5 pt-3 pb-1.5 text-[10px] font-medium tracking-[0.08em] uppercase">
            <span>Status</span>
            <span>Method</span>
            <span>Path</span>
            <span className="text-right">Latency</span>
            <span className="text-right">Time</span>
          </div>
          <div className="divide-charcoal-100 divide-y">
            {requestLog.map(row => (
              <div
                key={row.id}
                className={cn(
                  'grid grid-cols-[56px_64px_1fr_72px_76px] items-center gap-3 px-5 py-2 font-mono text-[11px]',
                  row.selected &&
                    'bg-charcoal-50 shadow-[inset_2px_0_0_var(--color-orange-500)]'
                )}
              >
                <span>
                  <MoodChip tone={row.tone}>{row.code}</MoodChip>
                </span>
                <span className="text-charcoal-700">{row.method}</span>
                <span className="text-charcoal-900 truncate">{row.path}</span>
                <span className="text-charcoal-700 text-right tabular-nums">
                  {row.latency}
                </span>
                <span className="text-charcoal-500 text-right tabular-nums">
                  {row.time}
                </span>
              </div>
            ))}
          </div>
          <div className="border-charcoal-200 text-charcoal-500 flex items-center justify-between border-t px-5 py-2.5 text-xs">
            <span>1–10 of 2,418 requests</span>
            <div className="flex gap-1">
              <MoodButton variant="ghost">Prev</MoodButton>
              <MoodButton variant="ghost">Next</MoodButton>
            </div>
          </div>
        </MoodCard>

        <MoodCard halo="concentric" className="overflow-hidden">
          <MoodCardHeader title="Request details">
            <MoodChip tone="accentSolid">500</MoodChip>
          </MoodCardHeader>
          <div className="divide-charcoal-100 divide-y">
            {requestDetail.map(item => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-3 px-5 py-2 text-xs"
              >
                <span className="text-charcoal-500">{item.key}</span>
                <span
                  className={cn(
                    'text-charcoal-900 truncate',
                    item.mono && 'font-mono text-[11px]'
                  )}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 px-5 py-3">
            <span className="text-charcoal-500 text-[10px] font-medium tracking-[0.08em] uppercase">
              Response body
            </span>
            <pre className="bg-charcoal-50 border-charcoal-200 text-charcoal-700 overflow-x-auto rounded-lg border p-3 font-mono text-[10px] leading-relaxed">
              {`{
  "error": {
    "type": "provider_unavailable",
    "message": "Payout provider timed
      out after 1000 ms",
    "retryable": true
  }
}`}
            </pre>
            <div className="flex gap-2 pt-1">
              <MoodButton variant="secondary">Retry request</MoodButton>
              <MoodButton variant="ghost">Copy as cURL</MoodButton>
            </div>
          </div>
        </MoodCard>
      </div>
    </div>
  </div>
);

const MoodBilling = () => (
  <div className="bg-charcoal-100 px-10 py-10">
    <div className="mx-auto flex max-w-[1100px] flex-col gap-6">
      <MoodPageTitle crumb="Acme Cloud / Settings" title="Billing & usage">
        <MoodButton variant="secondary">Billing history</MoodButton>
        <MoodButton variant="primary">Add payment method</MoodButton>
      </MoodPageTitle>

      <div className="grid grid-cols-3 gap-6">
        {billingPlans.map(plan => (
          <MoodCard
            key={plan.name}
            halo={plan.current ? 'ember' : 'classic'}
            className="flex flex-col p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-charcoal-900 text-sm font-semibold">
                {plan.name}
              </span>
              {plan.current && <MoodChip tone="accent">Current plan</MoodChip>}
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-charcoal-900 text-2xl font-semibold tracking-tight">
                {plan.price}
              </span>
              <span className="text-charcoal-500 text-xs">{plan.cadence}</span>
            </div>
            <ul className="divide-charcoal-100 mt-3 mb-4 divide-y">
              {plan.features.map(feature => (
                <li
                  key={feature}
                  className="text-charcoal-700 flex items-center gap-2 py-1.5 text-xs"
                >
                  <span className="text-charcoal-400" aria-hidden>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <MoodButton variant={plan.current ? 'primary' : 'secondary'}>
                {plan.cta}
              </MoodButton>
            </div>
          </MoodCard>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_1.4fr] items-start gap-6">
        <MoodCard className="overflow-hidden">
          <MoodCardHeader title="Usage this period">
            <MoodChip tone="neutral">Jun 1 – Jun 30</MoodChip>
          </MoodCardHeader>
          <div className="flex flex-col gap-4 px-5 py-4">
            {usageMeters.map(meter => (
              <div key={meter.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-charcoal-700 font-medium">
                    {meter.label}
                  </span>
                  <span className="text-charcoal-500 tabular-nums">
                    {meter.value}
                  </span>
                </div>
                <div className="bg-charcoal-100 h-1.5 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      meter.accent ? 'bg-orange-500' : 'bg-charcoal-900',
                      meter.width
                    )}
                  />
                </div>
                {meter.note && (
                  <span className="text-[11px] font-medium text-orange-700">
                    {meter.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </MoodCard>

        <MoodCard className="overflow-hidden">
          <MoodCardHeader title="Invoices">
            <MoodButton variant="ghost">Download all</MoodButton>
          </MoodCardHeader>
          <div className="text-charcoal-500 grid grid-cols-[1.1fr_1.3fr_0.6fr_0.6fr_0.6fr] gap-3 px-5 pt-3 pb-1.5 text-[10px] font-medium tracking-[0.08em] uppercase">
            <span>Invoice</span>
            <span>Period</span>
            <span className="text-right">Amount</span>
            <span>Status</span>
            <span />
          </div>
          <div className="divide-charcoal-100 divide-y">
            {invoices.map(invoice => (
              <div
                key={invoice.id}
                className="grid grid-cols-[1.1fr_1.3fr_0.6fr_0.6fr_0.6fr] items-center gap-3 px-5 py-2.5 text-xs"
              >
                <span className="text-charcoal-900 font-mono text-[11px]">
                  {invoice.id}
                </span>
                <span className="text-charcoal-700">{invoice.period}</span>
                <span className="text-charcoal-900 text-right font-medium tabular-nums">
                  {invoice.amount}
                </span>
                <span>
                  <MoodChip tone={invoice.tone}>{invoice.status}</MoodChip>
                </span>
                <span className="text-right">
                  <MoodButton variant="ghost">PDF</MoodButton>
                </span>
              </div>
            ))}
          </div>
        </MoodCard>
      </div>
    </div>
  </div>
);

const MoodBoardSections = ({ banner }: { banner: string }) => (
  <div className="flex flex-col">
    <MoodSectionBanner>
      Halo specimens — the ring vocabulary, {banner} (charcoal + orange only)
    </MoodSectionBanner>
    <HaloSpecimensBoard />
    <MoodSectionBanner>
      Mood 01 · Ops overview — KPI band, deployments, incidents (ref: Cursor,
      Cloudflare)
    </MoodSectionBanner>
    <MoodOpsOverview />
    <MoodSectionBanner>
      Mood 02 · Request log explorer — toolbar, dense log, detail panel (ref:
      ElevenLabs, Cloudflare)
    </MoodSectionBanner>
    <MoodLogExplorer />
    <MoodSectionBanner>
      Mood 03 · Billing &amp; usage — plans, meters, invoices (ref: Replit,
      Writer, Vapi)
    </MoodSectionBanner>
    <MoodBilling />
  </div>
);

export const HaloRingMoodBoard = meta.story({
  args: { children: null as never },
  parameters: { layout: 'fullscreen' },
  render: () => <MoodBoardSections banner="soft" />,
});

export const HaloRingMoodBoardContrast = meta.story({
  args: { children: null as never },
  parameters: { layout: 'fullscreen' },
  render: () => (
    <MoodHaloContext value={haloStylesContrast}>
      <MoodBoardSections banner="contrast+" />
    </MoodHaloContext>
  ),
});

export const CustomPadding = meta.story(() => (
  <Stack space="regular">
    <Panel p="square-loose">
      <Panel.Header>
        <Title>Uniform padding</Title>
        <Description>
          Using <code>p="square-loose"</code> — same spacing on every side of
          every section.
        </Description>
      </Panel.Header>
      <Panel.Content>
        <Text>All subcomponents share the same inset.</Text>
      </Panel.Content>
      <Panel.Footer>
        <Button>Action</Button>
      </Panel.Footer>
    </Panel>

    <Panel px="padding-relaxed" py="padding-snug">
      <Panel.Header>
        <Title>Per-axis padding</Title>
        <Description>
          Using <code>px="padding-relaxed" py="padding-snug"</code> — wider
          horizontally than vertically.
        </Description>
      </Panel.Header>
      <Panel.Content>
        <Text>Header, content, and footer all honour both axes.</Text>
      </Panel.Content>
      <Panel.Footer>
        <Button>Action</Button>
      </Panel.Footer>
    </Panel>
  </Stack>
));
