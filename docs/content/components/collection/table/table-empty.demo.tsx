import { Button, EmptyState, Table } from '@marigold/components';

export default () => (
  <Table aria-label="Empty table">
    <Table.Header>
      <Table.Column rowHeader>Name</Table.Column>
      <Table.Column>Email</Table.Column>
      <Table.Column>Status</Table.Column>
    </Table.Header>
    <Table.Body
      emptyState={() => (
        <EmptyState
          title="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={
            <Button size="small" variant="primary">
              Reset search and filter
            </Button>
          }
        />
      )}
    >
      {[]}
    </Table.Body>
  </Table>
);
