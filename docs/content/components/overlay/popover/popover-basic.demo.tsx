import {
  Button,
  Description,
  Popover,
  Table,
  Text,
  Title,
} from '@marigold/components';

interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  sold: string;
  details: string;
}

const events: Event[] = [
  {
    id: 'open-air',
    name: 'Summer Open Air',
    date: 'Sat, 12 July',
    venue: 'Stadtgarten',
    sold: '1,840 / 2,000',
    details:
      'Doors open at 17:00. Seating is unreserved, so arrive early for a spot near the stage.',
  },
  {
    id: 'jazz-night',
    name: 'Jazz Night',
    date: 'Fri, 18 July',
    venue: 'Jazzhaus',
    sold: '212 / 250',
    details:
      'Doors open at 19:30. Table seating, the bar stays open until midnight.',
  },
  {
    id: 'season-preview',
    name: 'Season Preview',
    date: 'Sun, 27 July',
    venue: 'Konzerthaus',
    sold: '640 / 900',
    details:
      'Doors open at 10:30. Free entry for season ticket holders, bring your pass.',
  },
];

const EventDetails = ({ event }: { event: Event }) => (
  <Popover.Trigger>
    <Button
      variant="ghost"
      size="small"
      aria-label={`Details for ${event.name}`}
    >
      Details
    </Button>
    <Popover>
      <Title>{event.name}</Title>
      <Description>
        {event.date} · {event.venue}
      </Description>
      <Popover.Content>
        <Text>{event.details}</Text>
      </Popover.Content>
    </Popover>
  </Popover.Trigger>
);

export default () => (
  <Table aria-label="Upcoming events">
    <Table.Header>
      <Table.Column rowHeader>Event</Table.Column>
      <Table.Column>Date</Table.Column>
      <Table.Column>Venue</Table.Column>
      <Table.Column alignX="right">Tickets sold</Table.Column>
      <Table.Column alignX="right">Action</Table.Column>
    </Table.Header>
    <Table.Body>
      {events.map(event => (
        <Table.Row key={event.id} id={event.id}>
          <Table.Cell>{event.name}</Table.Cell>
          <Table.Cell>{event.date}</Table.Cell>
          <Table.Cell>{event.venue}</Table.Cell>
          <Table.Cell>{event.sold}</Table.Cell>
          <Table.Cell>
            <EventDetails event={event} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
