'use client';

import { Table } from '@marigold/components';

export default () => (
  <Table aria-label="Event List" stretch>
    <Table.Header>
      <Table.Column>Event Name</Table.Column>
      <Table.Column>Date</Table.Column>
      <Table.Column>Status</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row key="1">
        <Table.Cell>Spring Gala</Table.Cell>
        <Table.Cell>April 15, 2025</Table.Cell>
        <Table.Cell>Confirmed</Table.Cell>
      </Table.Row>
      <Table.Row key="2">
        <Table.Cell>Jazz Night</Table.Cell>
        <Table.Cell>May 2, 2025</Table.Cell>
        <Table.Cell>Sold Out</Table.Cell>
      </Table.Row>
      <Table.Row key="3" variant="admin">
        <Table.Cell>System Test Entry</Table.Cell>
        <Table.Cell>–</Table.Cell>
        <Table.Cell>Internal</Table.Cell>
      </Table.Row>
      <Table.Row key="4">
        <Table.Cell>Open Air Theater</Table.Cell>
        <Table.Cell>June 10, 2025</Table.Cell>
        <Table.Cell>On Sale</Table.Cell>
      </Table.Row>
      <Table.Row key="5" variant="admin">
        <Table.Cell>Flagged: Duplicate Listing</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>Review Needed</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
