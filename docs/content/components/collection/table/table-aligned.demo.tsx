import { Table } from '@marigold/components';

export default () => (
  <Table aria-label="Events Ticketing">
    <Table.Header>
      <Table.Column>Event</Table.Column>
      <Table.Column>Date</Table.Column>
      <Table.Column>Location</Table.Column>
      <Table.Column align="right">Price</Table.Column>
      <Table.Column align="right">Ticket Number</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row key={1}>
        <Table.Cell>Music Festival</Table.Cell>
        <Table.Cell>2023-08-25</Table.Cell>
        <Table.Cell>Central Park</Table.Cell>
        <Table.Cell>$50</Table.Cell>
        <Table.Cell>123456789</Table.Cell>
      </Table.Row>
      <Table.Row key={2}>
        <Table.Cell>Movie Premiere</Table.Cell>
        <Table.Cell>2023-09-10</Table.Cell>
        <Table.Cell>Red Carpet Theater</Table.Cell>
        <Table.Cell>$100</Table.Cell>
        <Table.Cell>987654321</Table.Cell>
      </Table.Row>
      <Table.Row key={3}>
        <Table.Cell>Conference</Table.Cell>
        <Table.Cell>2023-10-05</Table.Cell>
        <Table.Cell>Convention Center</Table.Cell>
        <Table.Cell>$200</Table.Cell>
        <Table.Cell>246813579</Table.Cell>
      </Table.Row>
      <Table.Row key={4}>
        <Table.Cell>Sports Tournament</Table.Cell>
        <Table.Cell>2023-11-20</Table.Cell>
        <Table.Cell>Stadium</Table.Cell>
        <Table.Cell>$75</Table.Cell>
        <Table.Cell>135792468</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
