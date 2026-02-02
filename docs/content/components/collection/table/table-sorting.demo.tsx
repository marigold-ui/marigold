import { useState } from 'react';
import type { SortDescriptor } from '@react-types/shared';
import { Table, Text } from '@marigold/components';

export default () => {
  const data = [
    { id: '1', name: 'Luke Skywalker', height: '172', mass: '77' },
    { id: '2', name: 'C-3PO', height: '167', mass: '75' },
    { id: '3', name: 'R2-D2', height: '96', mass: '32' },
    { id: '4', name: 'Darth Vader', height: '202', mass: '136' },
    { id: '5', name: 'Leia Organa', height: '150', mass: '49' },
  ];

  const [list, setList] = useState(data);
  const [descriptor, setDescriptor] = useState<SortDescriptor>({
    column: '',
    direction: 'ascending',
  });

  const sort = ({ column, direction }: SortDescriptor) => {
    const sorted = [...list].sort((a: any, b: any) => {
      const first = parseInt(a[column!]) || a[column!];
      const second = parseInt(b[column!]) || b[column!];
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
      aria-label="Sortable characters"
      sortDescriptor={descriptor}
      onSortChange={sort}
    >
      <Table.Header>
        <Table.Column id="name" allowsSorting>
          Name
        </Table.Column>
        <Table.Column id="height" align="right" allowsSorting>
          Height (cm)
        </Table.Column>
        <Table.Column id="mass" align="right" allowsSorting>
          Mass (kg)
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {list.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <Text weight="medium">{item.name}</Text>
            </Table.Cell>
            <Table.Cell align="right">{item.height}</Table.Cell>
            <Table.Cell align="right">{item.mass}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
