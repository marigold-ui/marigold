import { venues } from '@/lib/data/venues';
import { NumericFormat, Table, Text } from '@marigold/components';

export default () => {
  return (
    <Table aria-label="Venue pricing">
      <Table.Header>
        <Table.Column align="left" rowHeader>
          Venue
        </Table.Column>
        <Table.Column align="right">Capacity</Table.Column>
        <Table.Column align="right">Price From</Table.Column>
      </Table.Header>
      <Table.Body>
        {venues.slice(0, 5).map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell align="left">
              <Text weight="medium">{venue.name}</Text>
            </Table.Cell>
            <Table.Cell align="right">
              <NumericFormat value={venue.capacity} />
            </Table.Cell>
            <Table.Cell align="right">
              <NumericFormat
                style="currency"
                currency="USD"
                value={venue.price.from}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
