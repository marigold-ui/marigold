import { venues } from '@/lib/data/venues';
import { NumericFormat, Scrollable, Table } from '@marigold/components';

export default () => {
  const totalCapacity = venues.reduce((sum, venue) => sum + venue.capacity, 0);

  return (
    <Scrollable height="300px">
      <Table aria-label="Long scrollable table with sticky totals">
        <Table.Header sticky>
          <Table.Column rowHeader>Venue</Table.Column>
          <Table.Column>City</Table.Column>
          <Table.Column alignX="right">Capacity</Table.Column>
        </Table.Header>
        <Table.Body>
          {venues.map(venue => (
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
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell colSpan={2}>Total</Table.Cell>
            <Table.Cell>
              <NumericFormat value={totalCapacity} />
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Scrollable>
  );
};
