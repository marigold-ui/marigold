import { useState } from 'react';
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
import { NumericFormat } from '@marigold/system';
import { Accordion } from '../Accordion/Accordion';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Description } from '../Description/Description';
import { Inline } from '../Inline/Inline';
import { ActionMenu } from '../Menu/ActionMenu';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { Title } from '../Title/Title';
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
      options: ['collapsed', 'tight', 'related', 'regular', 'group', 'section'],
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
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const title = canvas.getByRole('heading', { name: 'Organizer Profile' });
    const region = canvas.getByRole('region', { name: 'Organizer Profile' });

    expect(title.tagName).toBe('H2');
    expect(region).toBeInTheDocument();
    expect(region.getAttribute('aria-labelledby')).toBe(title.id);
  }
);

export const TitleOnlyWithoutHeader = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  args: { children: null as never },
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
  tags: ['component-test'],
  args: { children: null as never },
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
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
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
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
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
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const reconnect = canvas.getByRole('button', { name: 'Reconnect' });

    expect(reconnect).not.toHaveAttribute('data-grid-area', 'actions');
  }
);

export const WithCollapsible = meta.story({
  tags: ['component-test'],
  args: { children: null as never },
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
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
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
  parameters: { chromatic: { disableSnapshot: true } },
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

export const AriaLabeled = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    return (
      <Panel aria-label="Collapsible-only panel">
        <Panel.Content>
          <Text>
            A Panel can be labelled with <code>aria-label</code> when there is
            no visible title — useful for collapsible-only sections.
          </Text>
        </Panel.Content>
      </Panel>
    );
  },
});

export const CollapsibleDefaultExpanded = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
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

export const AccordionInside = meta.story(() => (
  <Stack space="regular">
    <Panel>
      <Panel.Header>
        <Title>Prop values</Title>
        <Description>
          Accordion in a bled Panel: dividers reach the edge, header and content
          stay aligned with the title.
        </Description>
      </Panel.Header>
      <Panel.Content bleed>
        <Accordion defaultExpandedKeys={['variant']}>
          <Accordion.Item id="variant">
            <Accordion.Header>
              <Inline space={2} alignY="center">
                <Text>variant</Text>
                <Badge>3</Badge>
              </Inline>
            </Accordion.Header>
            <Accordion.Content>
              <Stack space={2}>
                <Inline alignX="between">
                  <Text fontSize="sm">primary</Text>
                  <Text fontSize="sm" color="secondary">
                    63%
                  </Text>
                </Inline>
                <Inline alignX="between">
                  <Text fontSize="sm">secondary</Text>
                  <Text fontSize="sm" color="secondary">
                    27%
                  </Text>
                </Inline>
              </Stack>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="size">
            <Accordion.Header>
              <Inline space={2} alignY="center">
                <Text>size</Text>
                <Badge>2</Badge>
              </Inline>
            </Accordion.Header>
            <Accordion.Content>
              <Text fontSize="sm">default, small</Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Panel.Content>
    </Panel>

    <Accordion aria-label="Standalone accordion" defaultExpandedKeys={['a']}>
      <Accordion.Item id="a">
        <Accordion.Header>Standalone (unchanged)</Accordion.Header>
        <Accordion.Content>
          Outside a Panel the header and content have no horizontal indent.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id="b">
        <Accordion.Header>Second item</Accordion.Header>
        <Accordion.Content>Still flush to the edge.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  </Stack>
));

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
