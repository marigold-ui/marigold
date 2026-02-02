import { venueTypes, venues } from '@/lib/data/venues';
import type { TableProps } from '@marigold/components';
import { Table, Text } from '@marigold/components';

const columns = [
  { name: 'Venue', key: 'name', width: '1fr', align: 'left' },
  { name: 'Type', key: 'type', width: '1fr', align: 'left' },
  { name: 'City', key: 'city', width: '1fr', align: 'left' },
  { name: 'Capacity', key: 'capacity', width: 100, align: 'right' },
] as const;

export default (props: TableProps) => (
  <Table {...props}>
    <Table.Header columns={columns}>
      {column => (
        <Table.Column width={column.width} align={column.align}>
          {column.name}
        </Table.Column>
      )}
    </Table.Header>
    <Table.Body items={venues.slice(2, 5)}>
      {item => (
        <Table.Row key={item.id}>
          <Table.Cell>
            <Text weight="medium">{item.name}</Text>
          </Table.Cell>
          <Table.Cell>{venueTypes[item.type]}</Table.Cell>
          <Table.Cell>
            {item.city}, {item.country}
          </Table.Cell>
          <Table.Cell>{item.capacity}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
);
