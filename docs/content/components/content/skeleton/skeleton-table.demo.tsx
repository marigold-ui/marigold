import { Skeleton, Table } from '@marigold/components';

export default () => (
  <Table aria-label="Events" loading selectionMode="multiple">
    <Table.Header>
      <Table.Column rowHeader skeleton={<Skeleton width="3/4" />}>
        Event
      </Table.Column>
      <Table.Column>Venue</Table.Column>
      <Table.Column skeleton={<Skeleton width="1/2" />}>Date</Table.Column>
      <Table.Column
        skeleton={<Skeleton width={16} height={5} variant="rounded" />}
      >
        Status
      </Table.Column>
    </Table.Header>
    {/* Still loading, so the body has no rows yet. */}
    <Table.Body skeletonRows={5}>{[]}</Table.Body>
  </Table>
);
