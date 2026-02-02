import { venues } from '@/lib/data/venues';
import { Table, Text } from '@marigold/components';

export default () => {
  return (
    <Table aria-label="Venues with descriptions">
      <Table.Header>
        <Table.Column width={200}>Venue</Table.Column>
        <Table.Column>Description</Table.Column>
        <Table.Column width={150}>City</Table.Column>
      </Table.Header>
      <Table.Body>
        {venues.slice(0, 5).map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>
              <Text weight="medium">{venue.name}</Text>
            </Table.Cell>
            <Table.Cell>{venue.description}</Table.Cell>
            <Table.Cell>
              {venue.city}, {venue.country}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
