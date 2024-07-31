import React from 'react';

import { Stack, Table, TextField } from '@marigold/components';

export default () => {
  const columns = [
    { name: 'Name', key: 'name' },
    { name: 'Firstname', key: 'firstname' },
    { name: 'House', key: 'house' },
    { name: 'Year of birth', key: 'year' },
  ];

  const rowData: { [key: string]: string }[] = [
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
  const [data, setData] = React.useState(rowData);

  function handleChange(id: string, newValue: string, key: string): void {
    const changedData = data.map(item => {
      if (item.id === id) {
        return { ...item, [key]: newValue };
      }
      return { ...item };
    });
    setData(changedData);
  }

  return (
    <Stack space={3}>
      <Table aria-label="Example dynamic collection table">
        <Table.Header columns={columns}>
          {column => <Table.Column>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={data}>
          {item => (
            <Table.Row key={item.id}>
              {columnKey =>
                columnKey !== 'house' ? (
                  <Table.Cell>{item[columnKey]}</Table.Cell>
                ) : (
                  <Table.Cell>
                    <TextField
                      value={item.house}
                      disabled={false}
                      onChange={(value: string) =>
                        handleChange(item.id, value, 'house')
                      }
                      aria-label={'house'}
                    />
                  </Table.Cell>
                )
              }
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Stack>
  );
};
