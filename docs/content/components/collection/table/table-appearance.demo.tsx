import { venueTypes, venues } from '@/lib/data/venues';
import type { TableProps } from '@marigold/components';
import { NumericFormat, Table, Text } from '@marigold/components';

const columns = [
  {
    name: 'Venue',
    key: 'name',
    width: '1fr',
    alignX: 'left',
    rowHeader: true,
  },
  {
    name: 'Type',
    key: 'type',
    width: '1fr',
    alignX: 'left',
    rowHeader: false,
  },
  {
    name: 'City',
    key: 'city',
    width: '1fr',
    alignX: 'left',
    rowHeader: false,
  },
  {
    name: 'Capacity',
    key: 'capacity',
    width: 100,
    alignX: 'right',
    rowHeader: false,
  },
] as const;

export default (props: TableProps) => (
  <Table {...props}>
    <Table.Header columns={columns}>
      {column => (
        <Table.Column
          width={column.width}
          alignX={column.alignX}
          rowHeader={column.rowHeader}
        >
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
          <Table.Cell>
            <NumericFormat value={item.capacity} />
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
);
