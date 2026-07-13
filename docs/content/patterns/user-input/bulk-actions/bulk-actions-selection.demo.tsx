import {
  ActionBar,
  Badge,
  Button,
  Scrollable,
  Table,
} from '@marigold/components';
import { Archive, Tag } from '@marigold/icons';

const events = [
  {
    id: '1',
    name: 'Jazz Night',
    date: 'Aug 12, 2026',
    venue: 'Jazzhaus Freiburg',
    status: 'On sale',
  },
  {
    id: '2',
    name: 'Open Air Kino',
    date: 'Aug 15, 2026',
    venue: 'Mensagarten',
    status: 'On sale',
  },
  {
    id: '3',
    name: 'Poetry Slam',
    date: 'Aug 21, 2026',
    venue: 'Vorderhaus',
    status: 'Draft',
  },
  {
    id: '4',
    name: 'Herbstmarkt',
    date: 'Sep 5, 2026',
    venue: 'Messe Freiburg',
    status: 'Draft',
  },
  {
    id: '5',
    name: 'Wine Tasting',
    date: 'Sep 12, 2026',
    venue: 'Alte Wache',
    status: 'On sale',
  },
  {
    id: '6',
    name: 'Klassik im Park',
    date: 'Sep 19, 2026',
    venue: 'Stadtgarten',
    status: 'On sale',
  },
];

export default () => (
  <Scrollable height="320px">
    <Table
      aria-label="Events"
      selectionMode="multiple"
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
      <Table.Header sticky>
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
  </Scrollable>
);
