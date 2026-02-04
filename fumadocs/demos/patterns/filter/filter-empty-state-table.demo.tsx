import { Button, EmptyState, Table } from '@marigold/components';

const Empty = () => (
  <EmptyState
    title="No results found."
    description="Try adjusting your search or filters."
    action={<Button>Clear all filters</Button>}
  />
);

export default () => (
  <Table aria-label="Empty table">
    <Table.Header>
      <Table.Column isRowHeader>Name</Table.Column>
      <Table.Column>Type</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column>Capacity</Table.Column>
      <Table.Column>Price</Table.Column>
    </Table.Header>
    <Table.Body emptyState={Empty}>{[]}</Table.Body>
  </Table>
);
