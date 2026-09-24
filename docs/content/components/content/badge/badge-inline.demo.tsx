import { Badge, Checkbox, Stack, Table, Text } from '@marigold/components';

const events = [
  { id: 1, name: 'Sommernachts-Konzert', status: 'success', label: 'On sale' },
  { id: 2, name: 'Hafenlichter Festival', status: 'warning', label: 'Pending' },
  { id: 3, name: 'Winterzauber Gala', status: 'error', label: 'Cancelled' },
];

export default () => (
  <Stack space="group">
    <Stack space="tight">
      <Text fontSize="xs" color="text-secondary-muted">
        Default, next to the text: in a table cell the badge is taller than the
        line it sits beside, and the row simply makes room for it.
      </Text>
      <Table aria-label="Events">
        <Table.Header>
          <Table.Column rowHeader>Event</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          {events.map(event => (
            <Table.Row key={event.id}>
              <Table.Cell>{event.name}</Table.Cell>
              <Table.Cell>
                <Badge variant={event.status}>{event.label}</Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
    <Stack space="tight">
      <Text fontSize="xs" color="text-secondary-muted">
        Inline, inside the text: in a checkbox label the badge is drawn to the
        height of the line, so the checkbox stays level with the words. The
        badge slot sets the size here, so no size prop is needed.
      </Text>
      <Checkbox
        label="Enable early bird pricing"
        badge={<Badge variant="master">Master</Badge>}
        description="Sells a limited contingent at a reduced price before regular sales open."
      />
    </Stack>
  </Stack>
);
