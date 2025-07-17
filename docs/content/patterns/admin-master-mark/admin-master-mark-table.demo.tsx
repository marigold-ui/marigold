import { Table } from '@marigold/components';

export default () => (
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
);
