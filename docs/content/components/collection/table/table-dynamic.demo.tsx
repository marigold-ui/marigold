import React from 'react';

import { Table } from '@marigold/components';

export default () => {
  const columns = [
    { name: 'Name', key: 'name' },
    { name: 'Firstname', key: 'firstname' },
    { name: 'House', key: 'house' },
    { name: 'Year of birth', key: 'year' },
  ];

  const rows: { [key: string]: string }[] = [
    {
      id: '1',
      name: 'Potter',
      firstname: 'Harry',
      house: 'Gryffindor',
      year: '1980',
    },
    {
      id: '2',
      name: 'Malfoy',
      firstname: 'Draco',
      house: 'Slytherin',
      year: '1980',
    },
    {
      id: '3',
      name: 'Diggory',
      firstname: 'Cedric',
      house: 'Hufflepuff',
      year: '1977',
    },
    {
      id: '4',
      name: 'Lovegood',
      firstname: 'Luna',
      house: 'Ravenclaw',
      year: '1981',
    },
  ];
  const [selectedKeys, setSelectedKeys] = React.useState(new Set());
  const selected = Array.from(selectedKeys);
  return (
    <>
      <Table
        aria-label="Example dynamic collection table"
        selectionMode="multiple"
        onSelectionChange={key => setSelectedKeys(new Set(key))}
      >
        <Table.Header columns={columns}>
          {column => (
            <Table.Column isRowHeader>{(column as any).name}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row>
              <Table.Cell>{(item as any).name}</Table.Cell>
              <Table.Cell>{(item as any).firstname}</Table.Cell>
              <Table.Cell>{(item as any).house}</Table.Cell>
              <Table.Cell>{(item as any).year}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div>Selected rows: {selected.join(', ')}</div>
    </>
  );
};
