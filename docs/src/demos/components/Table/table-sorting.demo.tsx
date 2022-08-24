import React, { useState } from 'react';
import { SortDescriptor } from '@react-types/shared';
import { Table } from '@marigold/components';

export const SortedTable = () => {
  const data = [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
    },
    {
      name: 'C-3PO',
      height: '167',
      mass: '75',
      birth_year: '112BBY',
    },
    {
      name: 'R2-D2',
      height: '96',
      mass: '32',
      birth_year: '33BBY',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      birth_year: '41.9BBY',
    },
    {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      birth_year: '19BBY',
    },
    {
      name: 'Owen Lars',
      height: '178',
      mass: '120',
      birth_year: '52BBY',
    },
    {
      name: 'Beru Whitesun lars',
      height: '165',
      mass: '75',
      birth_year: '47BBY',
    },
    {
      name: 'R5-D4',
      height: '97',
      mass: '32',
      birth_year: 'unknown',
    },
    {
      name: 'Biggs Darklighter',
      height: '183',
      mass: '84',
      birth_year: '24BBY',
    },
    {
      name: 'Obi-Wan Kenobi',
      height: '182',
      mass: '77',
      birth_year: '57BBY',
    },
  ];
  const [list, setList] = useState(data);
  const [descriptor, setDescriptor] = useState<SortDescriptor>({});
  const sort = ({ column, direction }: SortDescriptor) => {
    const result = list.sort((a: any, b: any) => {
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
    <>
      <Table
        aria-label="Example table with client side sorting"
        sortDescriptor={descriptor}
        onSortChange={sort}
      >
        <Table.Header>
          <Table.Column key="name" allowsSorting>
            Name
          </Table.Column>
          <Table.Column key="height" allowsSorting>
            Height
          </Table.Column>
          <Table.Column key="mass" allowsSorting>
            Mass
          </Table.Column>
          <Table.Column key="birth_year" allowsSorting>
            Birth Year
          </Table.Column>
        </Table.Header>
        <Table.Body items={list}>
          {item => (
            <Table.Row key={item.name}>
              {columnKey => <Table.Cell>{(item as any)[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <br />
      <pre>
        Sort: {descriptor.column} / {descriptor.direction}
      </pre>
    </>
  );
};
