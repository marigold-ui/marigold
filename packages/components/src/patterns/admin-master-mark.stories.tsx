import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Checkbox } from '../Checkbox/Checkbox';
import { Radio } from '../Radio/Radio';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { TextField } from '../TextField/TextField';

const meta = {
  title: 'Patterns/Master- & Admin-Mark',
} satisfies Meta<never>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BadgeVariants: Story = {
  render: () => (
    <Stack space={2} alignX="left">
      <Badge variant="admin">Admin</Badge>
      <Badge variant="master">Master</Badge>
    </Stack>
  ),
};

export const TableRows: Story = {
  render: () => (
    <Table aria-label="Settings Table">
      <Table.Header>
        <Table.Column>Setting</Table.Column>
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
};

export const Form: Story = {
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
};
