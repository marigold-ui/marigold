import { venues } from '@/lib/data/venues';
import { Button, TableView } from '@marigold/components';

export default () => (
  <TableView aria-label="Venue List">
    <TableView.Header>
      <TableView.Column>Venue</TableView.Column>
      <TableView.Column>Address</TableView.Column>
      <TableView.Column align="right">Rating</TableView.Column>
      <TableView.Column>Action</TableView.Column>
    </TableView.Header>
    <TableView.Body>
      {venues.slice(0, 3).map(item => (
        <TableView.Row key={item.id}>
          <TableView.Cell>{item.name}</TableView.Cell>
          <TableView.Cell>
            {item.street}, {item.city}
          </TableView.Cell>
          <TableView.Cell>{item.rating}</TableView.Cell>
          <TableView.Cell>
            <Button size="small">View Details</Button>
          </TableView.Cell>
        </TableView.Row>
      ))}
    </TableView.Body>
  </TableView>
);
