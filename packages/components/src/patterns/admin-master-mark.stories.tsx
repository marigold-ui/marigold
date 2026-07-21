import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import { Checkbox } from '../Checkbox/Checkbox';
import { Inline } from '../Inline/Inline';
import { Link } from '../Link/Link';
import { ActionMenu } from '../Menu/ActionMenu';
import { Radio } from '../Radio/Radio';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { TextField } from '../TextField/TextField';

const meta = preview.meta({
  title: 'Patterns/Master- & Admin-Mark',
});

export const BadgeVariants = meta.story({
  parameters: {
    surface: 'both',
  },
  render: () => (
    <Stack space={2} alignX="left">
      <Badge variant="admin">Admin</Badge>
      <Badge variant="master">Master</Badge>
    </Stack>
  ),
});

export const TableRows = meta.story({
  parameters: { bleed: true },
  render: () => (
    <Table aria-label="Settings Table">
      <Table.Header>
        <Table.Column rowHeader>Setting</Table.Column>
        <Table.Column>Description</Table.Column>
        <Table.Column>Value</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="1" variant="master">
          <Table.Cell>Dark Mode</Table.Cell>
          <Table.Cell>Enables dark theme for the UI</Table.Cell>
          <Table.Cell>Enabled</Table.Cell>
        </Table.Row>
        <Table.Row key="2" variant="master">
          <Table.Cell>Notifications</Table.Cell>
          <Table.Cell>Email alerts and system messages</Table.Cell>
          <Table.Cell>Disabled</Table.Cell>
        </Table.Row>
        <Table.Row key="3" variant="admin">
          <Table.Cell>Auto Updates</Table.Cell>
          <Table.Cell>Automatically install software updates</Table.Cell>
          <Table.Cell>Enabled</Table.Cell>
        </Table.Row>
        <Table.Row key="4" variant="admin">
          <Table.Cell>Two-Factor Auth</Table.Cell>
          <Table.Cell>Require 2FA for all logins</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
});

export const Form = meta.story({
  render: () => (
    <div className="max-w-md">
      <Stack space={8}>
        <TextField
          label={
            <>
              Label <Badge variant="master">Master</Badge>
            </>
          }
        />
        <Checkbox
          label={
            <>
              Enable Feature <Badge variant="admin">Admin</Badge>
            </>
          }
        />
        <Radio.Group
          label={
            <>
              Role <Badge variant="admin">Admin</Badge>
            </>
          }
          defaultValue="admin"
        >
          <Radio value="admin">Admin</Radio>
          <Radio value="master">Master</Radio>
          <Radio value="user">User</Radio>
        </Radio.Group>
      </Stack>
    </div>
  ),
});

export const InlineTableActions = meta.story({
  render: () => (
    <Table aria-label="Filialen">
      <Table.Header>
        <Table.Column rowHeader>Filiale</Table.Column>
        <Table.Column>Aktionen</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="1">
          <Table.Cell>Freiburg Süd</Table.Cell>
          <Table.Cell>
            <Inline space={4} alignY="center">
              <Link href="#">bearbeiten</Link>
              <Link href="#" variant="master">
                verschieben
              </Link>
              <Link href="#" variant="master">
                TSE anbinden
              </Link>
              <Link href="#">löschen</Link>
            </Inline>
          </Table.Cell>
        </Table.Row>
        <Table.Row key="2">
          <Table.Cell>Freiburg Nord</Table.Cell>
          <Table.Cell>
            <Inline space={4} alignY="center">
              <Link href="#">bearbeiten</Link>
              <Link href="#" variant="admin">
                freigeben
              </Link>
            </Inline>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
});

export const MenuWithSections = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <ActionMenu aria-label="Filial-Aktionen">
      <ActionMenu.Item id="edit">Bearbeiten</ActionMenu.Item>
      <ActionMenu.Section title="Master-Aktionen">
        <ActionMenu.Item id="move" variant="master">
          Verschieben
        </ActionMenu.Item>
        <ActionMenu.Item id="tse" variant="master">
          TSE anbinden
        </ActionMenu.Item>
        <ActionMenu.Item id="delete" variant="master">
          Löschen
        </ActionMenu.Item>
      </ActionMenu.Section>
      <ActionMenu.Section title="Admin-Aktionen">
        <ActionMenu.Item id="release" variant="admin">
          Freigeben
        </ActionMenu.Item>
      </ActionMenu.Section>
    </ActionMenu>
  ),
});
