import { UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { NumericFormat } from '@marigold/system';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Inline } from '../Inline/Inline';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
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
      description: 'Base heading level for the panel section.',
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
        <Panel.Title>Organizer Profile</Panel.Title>
        <Panel.Description>
          Public details shown to customers on ticket confirmations and event
          pages.
        </Panel.Description>
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

export const WithHeaderActions = meta.story(() => (
  <Panel>
    <Panel.Header>
      <Panel.Title>Team Members</Panel.Title>
      <Panel.Description>
        People with access to this workspace and their roles.
      </Panel.Description>
      <Panel.HeaderActions>
        <Button>
          <UserRoundPlus />
          Invite member
        </Button>
      </Panel.HeaderActions>
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
));

export const WithCollapsible = meta.story({
  args: { children: null as never },
  tags: ['component-test'],
  render: args => (
    <Panel {...args}>
      <Panel.Header>
        <Panel.Title>Event Details</Panel.Title>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <TextField label="Event Name" defaultValue="Summer Festival" />
          <TextField label="Location" defaultValue="Main Stage" />
        </Stack>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Panel.CollapsibleTitle>Advanced Options</Panel.CollapsibleTitle>
          <Panel.CollapsibleDescription>
            Fine-tune URL slugs, tracking, and other optional settings.
          </Panel.CollapsibleDescription>
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
            <Panel.CollapsibleTitle>Advanced settings</Panel.CollapsibleTitle>
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
        <Panel.Title>Notification Preferences</Panel.Title>
      </Panel.Header>
      <Panel.Collapsible defaultExpanded>
        <Panel.CollapsibleHeader>
          <Panel.CollapsibleTitle>Channels</Panel.CollapsibleTitle>
          <Panel.CollapsibleDescription>
            Where and how reminders, confirmations, and alerts are delivered.
          </Panel.CollapsibleDescription>
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
        <Panel.CollapsibleTitle>Bleed content</Panel.CollapsibleTitle>
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
      <Panel.Title>Billing</Panel.Title>
    </Panel.Header>
    <Panel.Collapsible disabled>
      <Panel.CollapsibleHeader>
        <Panel.CollapsibleTitle>Payment methods</Panel.CollapsibleTitle>
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
        <Panel.Title>Default Panel</Panel.Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Standard panel with no variant.</Text>
      </Panel.Content>
    </Panel>
    <Panel variant="master">
      <Panel.Header>
        <Panel.Title>Master Access</Panel.Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Panel for master-level access content.</Text>
      </Panel.Content>
    </Panel>
    <Panel variant="admin">
      <Panel.Header>
        <Panel.Title>Admin Access</Panel.Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Panel for admin-level access content.</Text>
      </Panel.Content>
    </Panel>
    <Panel variant="destructive">
      <Panel.Header>
        <Panel.Title>Destructive</Panel.Title>
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
        <Panel.Title>Recent Orders</Panel.Title>
        <Panel.Description>
          Overview of the latest transactions.
        </Panel.Description>
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
        <Panel.Title>Selectable Orders</Panel.Title>
        <Panel.Description>
          Table with multi-select enabled inside a Panel.
        </Panel.Description>
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

export const CustomPadding = meta.story(() => (
  <Stack space="regular">
    <Panel p="square-loose">
      <Panel.Header>
        <Panel.Title>Uniform padding</Panel.Title>
        <Panel.Description>
          Using <code>p="square-loose"</code> — same spacing on every side of
          every section.
        </Panel.Description>
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
        <Panel.Title>Per-axis padding</Panel.Title>
        <Panel.Description>
          Using <code>px="padding-relaxed" py="padding-snug"</code> — wider
          horizontally than vertically.
        </Panel.Description>
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
