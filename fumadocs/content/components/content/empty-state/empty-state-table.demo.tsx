import { Button, EmptyState, Table } from '@marigold/components';

export default () => (
  <Table aria-label="Events Table">
    <Table.Header>
      <Table.Column rowHeader>Event Name</Table.Column>
      <Table.Column>Date</Table.Column>
      <Table.Column>Venue</Table.Column>
      <Table.Column>Status</Table.Column>
    </Table.Header>
    <Table.Body
      emptyState={() => (
        <EmptyState
          title="No events found"
          description="There are currently no events to display. Add new events to see them here."
          action={
            <Button size="small" variant="primary">
              Add New Event
            </Button>
          }
        />
      )}
    >
      {[]}
    </Table.Body>
  </Table>
);
