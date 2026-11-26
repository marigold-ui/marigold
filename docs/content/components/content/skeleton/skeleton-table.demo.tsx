import { Table } from '@marigold/components';

export default () => (
  <Table aria-label="Events" loading selectionMode="multiple">
    <Table.Header>
      <Table.Column rowHeader>Event</Table.Column>
      <Table.Column>Venue</Table.Column>
      <Table.Column>Date</Table.Column>
      <Table.Column>Status</Table.Column>
    </Table.Header>
    {/* Still loading, so the body has no rows yet. */}
    <Table.Body skeletonRows={5}>{[]}</Table.Body>
  </Table>
);
