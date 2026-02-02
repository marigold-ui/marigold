import { venues } from '@/lib/data/venues';
import { NumericFormat, Table, Text } from '@marigold/components';

export default () => {
  return (
    <Table aria-label="Venues with descriptions">
      <Table.Header>
        <Table.Column width={250} isRowHeader>
          Venue
        </Table.Column>
        <Table.Column>Description</Table.Column>
        <Table.Column width={75} align="right">
          Rating
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {venues.slice(0, 5).map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>
              <Text weight="medium">{venue.name}</Text>
            </Table.Cell>
            <Table.Cell overflow="truncate">{venue.description}</Table.Cell>
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
  );
};
