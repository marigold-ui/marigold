import { UserRoundPlus } from 'lucide-react';
import preview from '.storybook/preview';
import { NumericFormat } from '@marigold/system';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Headline } from '../Headline/Headline';
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

export const Basic = meta.story(() => (
  <Panel>
    <Panel.Header>
      <Panel.Title>General Settings</Panel.Title>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <TextField label="Display Name" defaultValue="Marigold" />
        <TextField label="Email" defaultValue="hello@marigold-ui.io" />
      </Stack>
    </Panel.Content>
  </Panel>
));

export const WithDescription = meta.story(() => (
  <Panel>
    <Panel.Header>
      <Panel.Title>Notification Preferences</Panel.Title>
      <Panel.Description>
        Choose how you want to receive notifications about updates and changes.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <TextField label="Email for Notifications" />
      </Stack>
    </Panel.Content>
  </Panel>
));

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

export const WithCollapsible = meta.story(() => (
  <Panel>
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
      <Panel.CollapsibleTrigger>Advanced Options</Panel.CollapsibleTrigger>
      <Panel.CollapsibleContent>
        <Stack space="regular">
          <TextField label="Custom URL Slug" />
          <TextField label="Tracking Code" />
        </Stack>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
));

export const WithMultipleCollapsibles = meta.story(() => (
  <Panel>
    <Panel.Header>
      <Panel.Title>Location Settings</Panel.Title>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <TextField label="Venue Name" defaultValue="Concert Hall" />
      </Stack>
    </Panel.Content>
    <Panel.Collapsible>
      <Panel.CollapsibleTrigger>Address</Panel.CollapsibleTrigger>
      <Panel.CollapsibleContent>
        <Stack space="regular">
          <TextField label="Street" />
          <TextField label="City" />
          <TextField label="Postal Code" />
        </Stack>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
    <Panel.Collapsible>
      <Panel.CollapsibleTrigger>Accessibility</Panel.CollapsibleTrigger>
      <Panel.CollapsibleContent>
        <Stack space="regular">
          <TextField label="Accessibility Notes" />
        </Stack>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
));

export const WithFooter = meta.story(() => (
  <Panel variant="destructive">
    <Panel.Header>
      <Panel.Title>Danger Zone</Panel.Title>
      <Panel.Description>
        Irreversible actions that permanently affect your account.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Text>
        Once you delete your account, there is no going back. All your data will
        be permanently removed.
      </Text>
    </Panel.Content>
    <Panel.Footer>
      <Button variant="destructive">Delete Account</Button>
    </Panel.Footer>
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

export const VariantsVsCard = meta.story(() => (
  <div className="grid grid-cols-2 items-start gap-4">
    <Headline level="3">Panel</Headline>
    <Headline level="3">Card</Headline>

    <Panel>
      <Panel.Header>
        <Panel.Title>Default Panel</Panel.Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Panel with default variant.</Text>
      </Panel.Content>
    </Panel>
    <Card>
      <Headline level="4">Default Card</Headline>
      <Text>Card with default variant.</Text>
    </Card>

    <Panel variant="master">
      <Panel.Header>
        <Panel.Title>Master Panel</Panel.Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Panel with master variant.</Text>
      </Panel.Content>
    </Panel>
    <Card variant="master">
      <Headline level="4">Master Card</Headline>
      <Text>Card with master variant.</Text>
    </Card>

    <Panel variant="admin">
      <Panel.Header>
        <Panel.Title>Admin Panel</Panel.Title>
      </Panel.Header>
      <Panel.Content>
        <Text>Panel with admin variant.</Text>
      </Panel.Content>
    </Panel>
    <Card variant="admin">
      <Headline level="4">Admin Card</Headline>
      <Text>Card with admin variant.</Text>
    </Card>
  </div>
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

export const FullPage = meta.story(() => (
  <Stack space="section">
    <Panel>
      <Panel.Header>
        <Panel.Title>Profile</Panel.Title>
        <Panel.Description>Your public profile information.</Panel.Description>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <TextField label="Display Name" defaultValue="Sebastian" />
          <TextField label="Bio" defaultValue="Design Systems Engineer" />
        </Stack>
      </Panel.Content>
    </Panel>

    <Panel>
      <Panel.Header>
        <Panel.Title>Notification Preferences</Panel.Title>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <TextField label="Email" defaultValue="sebastian@marigold-ui.io" />
        </Stack>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleTrigger>
          Advanced Notification Settings
        </Panel.CollapsibleTrigger>
        <Panel.CollapsibleContent>
          <Stack space="regular">
            <TextField label="Webhook URL" />
          </Stack>
        </Panel.CollapsibleContent>
      </Panel.Collapsible>
    </Panel>

    <Panel variant="destructive">
      <Panel.Header>
        <Panel.Title>Danger Zone</Panel.Title>
        <Panel.Description>
          These actions are permanent and cannot be undone.
        </Panel.Description>
      </Panel.Header>
      <Panel.Content>
        <Text>
          Deleting your account removes all data, including events and
          transactions.
        </Text>
      </Panel.Content>
      <Panel.Footer>
        <Button variant="destructive">Delete Account</Button>
      </Panel.Footer>
    </Panel>
  </Stack>
));
