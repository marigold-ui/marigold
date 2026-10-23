import { events } from '@/lib/data/events';
import {
  DateFormat,
  Link,
  NumericFormat,
  Table,
  Text,
} from '@marigold/components';

export default () => (
  <Table aria-label="Events with links to event, venue and reservations">
    <Table.Header>
      <Table.Column rowHeader minWidth={180}>
        Event
      </Table.Column>
      <Table.Column width={120}>Date</Table.Column>
      <Table.Column minWidth={140}>Venue</Table.Column>
      <Table.Column width={110}>Category</Table.Column>
      <Table.Column alignX="right" width={130}>
        Reservations
      </Table.Column>
    </Table.Header>
    <Table.Body>
      {events.slice(0, 8).map(event => (
        <Table.Row key={event.id}>
          <Table.Cell textValue={event.name}>
            <Link variant="secondary" href="#">
              {event.name}
            </Link>
          </Table.Cell>
          <Table.Cell>
            <DateFormat value={new Date(event.date)} dateStyle="medium" />
          </Table.Cell>
          <Table.Cell>
            {event.venue ? (
              <Link variant="secondary" href="#">
                {event.venue}
              </Link>
            ) : (
              <Text variant="muted">No venue</Text>
            )}
          </Table.Cell>
          <Table.Cell>{event.category}</Table.Cell>
          <Table.Cell>
            <Link
              variant="secondary"
              href="#"
              aria-label={`${event.reservations} reservations for ${event.name}`}
            >
              <NumericFormat value={event.reservations} />
            </Link>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
