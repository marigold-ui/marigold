import { venueTypes, venues } from '@/lib/data/venues';
import { Table, Text } from '@marigold/components';

export default () => {
  return (
    <Table aria-label="Event venues">
      <Table.Header>
        <Table.Column>Venue</Table.Column>
        <Table.Column>Type</Table.Column>
        <Table.Column>City</Table.Column>
      </Table.Header>
      <Table.Body>
        {venues.slice(0, 5).map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>
              <Text weight="medium">{venue.name}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="sm" color="muted-foreground">
                {venueTypes[venue.type]}
              </Text>
            </Table.Cell>
            <Table.Cell>
              {venue.city}, {venue.country}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
