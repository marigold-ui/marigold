import { venues } from '@/lib/data/venues';
import { NumericFormat, Scrollable, Table, Text } from '@marigold/components';

export default () => {
  return (
    <Scrollable>
      <Table aria-label="Venues by capacity">
        <Table.Header>
          <Table.Column rowHeader width="2fr" minWidth={220}>
            Venue
          </Table.Column>
          <Table.Column width="1fr" minWidth={180}>
            Address
          </Table.Column>
          <Table.Column width={140}>City</Table.Column>
          <Table.Column width={120} alignX="right">
            Capacity
          </Table.Column>
          <Table.Column width={120} alignX="right">
            Rating
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {venues.slice(0, 5).map(venue => (
            <Table.Row key={venue.id}>
              <Table.Cell>
                <Text weight="medium">{venue.name}</Text>
              </Table.Cell>
              <Table.Cell>
                {venue.street}, {venue.postcode}
              </Table.Cell>
              <Table.Cell>{venue.city}</Table.Cell>
              <Table.Cell>
                <NumericFormat value={venue.capacity} />
              </Table.Cell>
              <Table.Cell>
                <NumericFormat
                  value={venue.rating}
                  minimumFractionDigits={1}
                  maximumFractionDigits={1}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Scrollable>
  );
};
