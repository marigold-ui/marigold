'use client';

import { useState } from 'react';
import { Table } from '@marigold/components';

export default () => {
  const columns = [
    { name: 'Id', key: 'id' },
    { name: 'Event', key: 'event' },
    { name: 'Date', key: 'date' },
    { name: 'Status', key: 'status' },
  ];

  const rows: { [key: string]: string }[] = [
    {
      id: '16382462873',
      event: 'Concert',
      date: '2024-01-10',
      status: 'updated',
    },
    {
      id: '383262736',
      event: 'Open Air Festival',
      date: '2024-07-09',
      status: 'new',
    },
    {
      id: '62836432',
      event: 'Live on Stage',
      date: '2024-11-25',
      status: '',
    },
    {
      id: '82742834',
      event: 'Open Air Summertime',
      date: '2024-06-01',
      status: 'updated',
    },
    {
      id: '78263482',
      event: 'Opera',
      date: '2024-12-12',
      status: 'new',
    },
    {
      id: '9823742',
      event: 'Musical',
      date: '2024-08-19',
      status: 'updated',
    },
  ];
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const selected = Array.from(selectedKeys);
  return (
    <>
      <Table
        aria-label="Example dynamic collection table"
        selectionMode="multiple"
        stretch
        onSelectionChange={key => setSelectedKeys(new Set(key))}
      >
        <Table.Header columns={columns}>
          {column => <Table.Column>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={rows}>
          {item => (
            <Table.Row>
              {columnKey => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div className="pt-1">Selected rows: {selected.join(', ')}</div>
    </>
  );
};
