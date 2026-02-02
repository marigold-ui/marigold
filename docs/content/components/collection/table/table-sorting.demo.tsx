import { venues } from '@/lib/data/venues';
import { useState } from 'react';
import type { SortDescriptor } from '@react-types/shared';
import { Table, Text } from '@marigold/components';

export default () => {
  const data = venues.slice(0, 9);
  const [list, setList] = useState(data);
  const [descriptor, setDescriptor] = useState<SortDescriptor>({
    column: '',
    direction: 'ascending',
  });

  const sort = ({ column, direction }: SortDescriptor) => {
    const sorted = [...list].sort((a: any, b: any) => {
      const first = a[column!];
      const second = b[column!];
      let cmp = first < second ? -1 : 1;
      if (direction === 'descending') {
        cmp *= -1;
      }
      return cmp;
    });
    setDescriptor({ column, direction });
    setList(sorted);
  };

  return (
    <Table
      aria-label="Sortable venues"
      sortDescriptor={descriptor}
      onSortChange={sort}
    >
      <Table.Header>
        <Table.Column id="name" allowsSorting isRowHeader>
          Venue
        </Table.Column>
        <Table.Column id="capacity" align="right" width={120} allowsSorting>
          Capacity
        </Table.Column>
        <Table.Column id="rating" align="right" width={90} allowsSorting>
          Rating
        </Table.Column>
        <Table.Column>Description</Table.Column>
      </Table.Header>
      <Table.Body>
        {list.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <Text weight="medium">{item.name}</Text>
            </Table.Cell>
            <Table.Cell align="right">{item.capacity}</Table.Cell>
            <Table.Cell align="right">{item.rating}</Table.Cell>
            <Table.Cell overflow="truncate">{item.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
