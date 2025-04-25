import { venueTypes, venues } from '@/lib/data/venues';
import { Table } from '@marigold/components';
import { NumericFormat } from '@marigold/system';

export const Venues = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Type</Table.Column>
        <Table.Column>Address</Table.Column>
        <Table.Column>Capacity</Table.Column>
        <Table.Column align="right">Price</Table.Column>
      </Table.Header>
      <Table.Body>
        {venues.map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>{venue.name}</Table.Cell>
            <Table.Cell>{venueTypes[venue.type]}</Table.Cell>
            <Table.Cell>{`${venue.street}, ${venue.city}`}</Table.Cell>
            <Table.Cell>{venue.capacity}</Table.Cell>
            <Table.Cell>
              <NumericFormat
                style="currency"
                value={venue.price.from}
                currency="EUR"
              />{' '}
              -{' '}
              <NumericFormat
                style="currency"
                value={venue.price.to}
                currency="EUR"
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
