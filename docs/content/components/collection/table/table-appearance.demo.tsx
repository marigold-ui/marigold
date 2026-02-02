import { venueTypes, venues } from '@/lib/data/venues';
import type { TableProps } from '@marigold/components';
import { Table, Text } from '@marigold/components';

const columns = [
  { name: 'Venue', key: 'name' },
  { name: 'Type', key: 'type' },
  { name: 'City', key: 'city' },
  { name: 'Capacity', key: 'capacity' },
];

export default (props: TableProps) => (
  <Table {...props}>
    <Table.Header columns={columns}>
      {column => <Table.Column>{column.name}</Table.Column>}
    </Table.Header>
    <Table.Body items={venues.slice(0, 5)}>
      {item => (
        <Table.Row key={item.id}>
          <Table.Cell>
            <Text weight="medium">{item.name}</Text>
          </Table.Cell>
          <Table.Cell>{venueTypes[item.type]}</Table.Cell>
          <Table.Cell>
            {item.city}, {item.country}
          </Table.Cell>
          <Table.Cell>{item.capacity.toLocaleString()}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
);
