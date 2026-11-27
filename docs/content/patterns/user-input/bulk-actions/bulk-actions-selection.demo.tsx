import { ActionBar, Badge, Button, Table } from '@marigold/components';
import { Archive, Tag } from '@marigold/icons';

const events = [
  {
    id: '1',
    name: 'Jazz Night',
    date: 'Aug 12, 2026',
    venue: 'Cellar Lounge',
    status: 'On sale',
  },
  {
    id: '2',
    name: 'Film Club',
    date: 'Aug 15, 2026',
    venue: 'Bloomfield Garden Lawn',
    status: 'On sale',
  },
  {
    id: '3',
    name: 'Poetry Slam',
    date: 'Aug 21, 2026',
    venue: 'Maple Court Theatre',
    status: 'Draft',
  },
  {
    id: '4',
    name: "Makers' Market",
    date: 'Sep 5, 2026',
    venue: 'Broadway Community Center',
    status: 'Draft',
  },
  {
    id: '5',
    name: 'Wine Tasting',
    date: 'Sep 12, 2026',
    venue: 'Oak Ridge Barn',
    status: 'On sale',
  },
  {
    id: '6',
    name: 'Strings by Candlelight',
    date: 'Sep 19, 2026',
    venue: 'Main Street Park Amphitheater',
    status: 'On sale',
  },
];

export default () => (
  <Table
    aria-label="Events"
    // These two props are the whole mechanism: the Table owns selection,
    // and the bar with the actions rides along in the actionBar prop.
    selectionMode="multiple" // [!code highlight]
    // [!code highlight:1]
    actionBar={() => (
      <ActionBar>
        <Button onPress={() => alert('Assign category')}>
          <Tag />
          Assign category
        </Button>
        <Button onPress={() => alert('Archive')}>
          <Archive />
          Archive
        </Button>
      </ActionBar>
    )}
  >
    <Table.Header>
      <Table.Column rowHeader>Event</Table.Column>
      <Table.Column>Date</Table.Column>
      <Table.Column>Venue</Table.Column>
      <Table.Column>Status</Table.Column>
    </Table.Header>
    <Table.Body>
      {events.map(event => (
        <Table.Row key={event.id} id={event.id}>
          <Table.Cell>{event.name}</Table.Cell>
          <Table.Cell>{event.date}</Table.Cell>
          <Table.Cell>{event.venue}</Table.Cell>
          <Table.Cell>
            <Badge variant={event.status === 'On sale' ? 'success' : 'info'}>
              {event.status}
            </Badge>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
