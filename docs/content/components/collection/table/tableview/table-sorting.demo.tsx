import { useState } from 'react';
import { SortDescriptor } from '@react-types/shared';
import { Table } from '@marigold/components';

export default () => {
  const columns = [
    { name: 'Name', id: 'name', isRowHeader: true },
    { name: 'Height', id: 'height' },
    { name: 'Mass', id: 'mass' },
    { name: 'Birth Year', id: 'birth_year' },
  ] as const;

  const data = [
    {
      id: '1',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
    },
    { id: '2', name: 'C-3PO', height: '167', mass: '75', birth_year: '112BBY' },
    { id: '3', name: 'R2-D2', height: '96', mass: '32', birth_year: '33BBY' },
    {
      id: '4',
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      birth_year: '41.9BBY',
    },
    {
      id: '5',
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      birth_year: '19BBY',
    },
    {
      id: '6',
      name: 'Owen Lars',
      height: '178',
      mass: '120',
      birth_year: '52BBY',
    },
  ];

  const [list, setList] = useState(data);
  const [descriptor, setDescriptor] = useState<SortDescriptor>({
    column: '',
    direction: 'ascending',
  });

  const sort = ({ column, direction }: SortDescriptor) => {
    const result = [...list].sort((a: any, b: any) => {
      const first = a[column!];
      const second = b[column!];
      let cmp =
        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
      if (direction === 'descending') {
        cmp *= -1;
      }
      return cmp;
    });
    setDescriptor({ column, direction });
    setList(result);
  };

  return (
    <Table
      aria-label="Example table with sorting"
      sortDescriptor={descriptor}
      onSortChange={sort}
    >
      <Table.Header columns={columns}>
        {column => (
          <Table.Column
            isRowHeader={column.isRowHeader}
            id={column.id}
            allowsSorting
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={list}>
        {item => (
          <Table.Row columns={columns}>
            {column => <Table.Cell>{item[column.id]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
