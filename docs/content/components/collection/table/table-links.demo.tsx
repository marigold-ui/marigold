import { Table } from '@marigold/components';

export default () => (
  <Table aria-label="Bookmarks" selectionMode="multiple">
    <Table.Header>
      <Table.Column isRowHeader>Name</Table.Column>
      <Table.Column>URL</Table.Column>
      <Table.Column>Date added</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row href="https://reservix.de/" target="_blank">
        <Table.Cell>Reservix Ticket Portal</Table.Cell>
        <Table.Cell>https://reservix.de/</Table.Cell>
        <Table.Cell>January 28, 2023</Table.Cell>
      </Table.Row>
      <Table.Row href="https://reservix.net/" target="_blank">
        <Table.Cell>Reservix net</Table.Cell>
        <Table.Cell>https://reservix.net/</Table.Cell>
        <Table.Cell>April 5, 2023</Table.Cell>
      </Table.Row>
      <Table.Row href="https://adticket.de/" target="_blank">
        <Table.Cell>ADticket</Table.Cell>
        <Table.Cell>https://adticket.de/</Table.Cell>
        <Table.Cell>July 12, 2023</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
