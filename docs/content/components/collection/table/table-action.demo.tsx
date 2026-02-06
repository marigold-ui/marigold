import { venues } from '@/lib/data/venues';
import { Button, Table } from '@marigold/components';

export default () => (
  <Table aria-label="Venue List">
    <Table.Header>
      <Table.Column rowHeader>Venue</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column align="right">Rating</Table.Column>
      <Table.Column>Action</Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(0, 3).map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>
            {item.street}, {item.city}
          </Table.Cell>
          <Table.Cell>{item.rating}</Table.Cell>
          <Table.Cell>
            <Button size="small">View Details</Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
