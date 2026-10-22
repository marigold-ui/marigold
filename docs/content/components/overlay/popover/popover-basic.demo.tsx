import {
  Button,
  Description,
  Divider,
  Inline,
  Link,
  Popover,
  Split,
  Stack,
  Table,
  Text,
  Title,
  VisuallyHidden,
} from '@marigold/components';

interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  sold: number;
  capacity: number;
  categories: { name: string; sold: number; capacity: number }[];
}

const events: Event[] = [
  {
    id: 'open-air',
    name: 'Summer Open Air',
    date: 'Sat, 12 July',
    venue: 'Stadtgarten',
    sold: 1840,
    capacity: 2000,
    categories: [
      { name: 'Standing', sold: 1500, capacity: 1500 },
      { name: 'Seated', sold: 300, capacity: 400 },
      { name: 'VIP', sold: 40, capacity: 100 },
    ],
  },
  {
    id: 'jazz-night',
    name: 'Jazz Night',
    date: 'Fri, 18 July',
    venue: 'Jazzhaus',
    sold: 212,
    capacity: 250,
    categories: [
      { name: 'Table seat', sold: 120, capacity: 120 },
      { name: 'Bar', sold: 92, capacity: 130 },
    ],
  },
  {
    id: 'season-preview',
    name: 'Season Preview',
    date: 'Sun, 27 July',
    venue: 'Konzerthaus',
    sold: 640,
    capacity: 900,
    categories: [
      { name: 'Parquet', sold: 420, capacity: 500 },
      { name: 'Balcony', sold: 180, capacity: 300 },
      { name: 'Season pass', sold: 40, capacity: 100 },
    ],
  },
];

const format = new Intl.NumberFormat('en-US');

const TicketSales = ({ event }: { event: Event }) => (
  <Popover.Trigger>
    <Button variant="link" size="small">
      {format.format(event.sold)} / {format.format(event.capacity)}
      <VisuallyHidden> tickets sold for {event.name}</VisuallyHidden>
    </Button>
    <Popover placement="bottom end">
      <Title>{event.name}</Title>
      <Description>Ticket sales by category</Description>
      <Popover.Content>
        <Stack space="tight">
          {event.categories.map(category => (
            <Inline key={category.name} space="related">
              <Text>{category.name}</Text>
              <Split />
              <Text
                variant={
                  category.sold === category.capacity ? 'default' : 'muted'
                }
              >
                {category.sold === category.capacity
                  ? 'Sold out'
                  : `${format.format(category.sold)} / ${format.format(category.capacity)}`}
              </Text>
            </Inline>
          ))}
        </Stack>
        <Divider />
        <Link href="#">View all orders</Link>
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
    </Table.Header>
    <Table.Body>
      {events.map(event => (
        <Table.Row key={event.id} id={event.id}>
          <Table.Cell>{event.name}</Table.Cell>
          <Table.Cell>{event.date}</Table.Cell>
          <Table.Cell>{event.venue}</Table.Cell>
          <Table.Cell>
            <TicketSales event={event} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
