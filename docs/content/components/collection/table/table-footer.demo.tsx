import { venues } from '@/lib/data/venues';
import { NumericFormat, Table } from '@marigold/components';

const data = venues.slice(0, 5);

export default () => {
  const totalCapacity = data.reduce((sum, venue) => sum + venue.capacity, 0);

  return (
    <Table aria-label="Venues with total capacity">
      <Table.Header>
        <Table.Column rowHeader>Venue</Table.Column>
        <Table.Column>City</Table.Column>
        <Table.Column alignX="right">Capacity</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>{venue.name}</Table.Cell>
            <Table.Cell>
              {venue.city}, {venue.country}
            </Table.Cell>
            <Table.Cell>
              <NumericFormat value={venue.capacity} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={2}>Total</Table.Cell>
          <Table.Cell>
            <NumericFormat value={totalCapacity} />
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};
