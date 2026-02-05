import { venues } from '@/lib/data/venues';
import { NumericFormat, Scrollable, Table, Text } from '@marigold/components';

export default () => {
  return (
    <Scrollable height="300px">
      <Table aria-label="Long scrollable table">
        <Table.Header sticky>
          <Table.Column isRowHeader>Venue</Table.Column>
          <Table.Column>City</Table.Column>
          <Table.Column>Capacity</Table.Column>
        </Table.Header>
        <Table.Body>
          {venues.map(venue => (
            <Table.Row key={venue.id}>
              <Table.Cell>
                <Text weight="medium">{venue.name}</Text>
              </Table.Cell>
              <Table.Cell>
                {venue.city}, {venue.country}
              </Table.Cell>
              <Table.Cell>
                <NumericFormat value={venue.capacity} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Scrollable>
  );
};
