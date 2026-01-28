import { venues } from '@/lib/data/venues';
import { Link, TableView } from '@marigold/components';

export default () => (
  <TableView aria-label="Event Links Table">
    <TableView.Header>
      <TableView.Column>Venue</TableView.Column>
      <TableView.Column>Address</TableView.Column>
      <TableView.Column>Rating</TableView.Column>
    </TableView.Header>
    <TableView.Body>
      {venues.slice(0, 4).map(venue => (
        <TableView.Row key={venue.id}>
          <TableView.Cell>
            <Link href={`#`}>{venue.name}</Link>
          </TableView.Cell>
          <TableView.Cell>
            {venue.street}, {venue.city}
          </TableView.Cell>
          <TableView.Cell>{venue.rating}</TableView.Cell>
        </TableView.Row>
      ))}
    </TableView.Body>
  </TableView>
);
