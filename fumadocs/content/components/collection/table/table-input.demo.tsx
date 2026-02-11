import { useState } from 'react';
import { Stack, Table, TextArea } from '@marigold/components';

export default () => {
  const rowData: { [key: string]: string }[] = [
    {
      id: '1234',
      event: 'Concert',
      date: '2024-01-10',
      description: 'Live concert of the worlds best band.',
    },
    {
      id: '82374',
      event: 'Open Air Festival',
      date: '2024-07-09',
      description: 'The best summer event of the year.',
    },
    {
      id: '724423',
      event: 'Live on Stage',
      date: '2024-11-25',
      description: 'All live',
    },
    {
      id: '23497',
      event: 'Open Air Summertime',
      date: '2024-06-01',
      description: 'Summer is calling.',
    },
  ];
  const [data, setData] = useState(rowData);

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
      <Table aria-label="Example how to not use the table">
        <Table.Header>
          <Table.Column rowHeader>Id</Table.Column>
          <Table.Column>Event</Table.Column>
          <Table.Column>Description</Table.Column>
          <Table.Column>Date</Table.Column>
        </Table.Header>
        <Table.Body items={data}>
          {item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.event}</Table.Cell>
              <Table.Cell>
                <TextArea
                  value={item.description}
                  disabled={false}
                  onChange={(value: string) =>
                    handleChange(item.id, value, 'description')
                  }
                  aria-label={'description'}
                />
              </Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Stack>
  );
};
