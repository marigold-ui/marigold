import React from 'react';
import { useState } from 'react';

import {
  ActionMenu,
  Checkbox,
  I18nProvider,
  Menu,
  Stack,
  Table,
} from '@marigold/components';
import { DateFormat, NumericFormat } from '@marigold/system';

const rows = [
  {
    event: 'Music Festival',
    date: '2023-08-25',
    price: 50,
    ticketnr: '123456789',
    id: 1,
  },
  {
    event: 'Red Carpet Theater',
    date: '2023-09-10',
    price: 150,
    ticketnr: '987654321',
    id: 2,
  },
  {
    event: 'Conference',
    date: '2023-10-05',
    price: 220.5,
    ticketnr: '246813579',
    id: 3,
  },
  {
    event: 'Sports Tournament',
    date: '2023-11-20',
    price: 75,
    ticketnr: '135792468',
    id: 4,
  },
  {
    event: 'Opera',
    date: '2023-05-15',
    price: 500,
    ticketnr: '128216789',
    id: 5,
  },
] as const;

const DataTable = ({ editable }: { editable: boolean }) => (
  <Table
    aria-label="Data Table"
    selectionMode="multiple"
    size="compact"
    variant="linedTable"
  >
    <Table.Header>
      <Table.Column>Event</Table.Column>
      <Table.Column>Date</Table.Column>
      <Table.Column align="right">Price</Table.Column>
      <Table.Column align="right">Ticket Number</Table.Column>
      <Table.Column>Action</Table.Column>
    </Table.Header>
    <Table.Body items={rows}>
      {rows.map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.event}</Table.Cell>
          <Table.Cell>
            <I18nProvider locale="de-DE">
              <DateFormat dateStyle="full" value={new Date(`${item.date}`)} />
            </I18nProvider>
          </Table.Cell>
          <Table.Cell>
            <I18nProvider locale="en-US">
              <NumericFormat
                style="currency"
                value={item.price}
                currency="USD"
              />
            </I18nProvider>
          </Table.Cell>
          <Table.Cell>{item.ticketnr}</Table.Cell>
          <Table.Cell>
            <ActionMenu
              disabled={!editable}
              onAction={action => alert(`Action: ${action}`)}
            >
              <Menu.Item id="edit">Open in editor</Menu.Item>
              <Menu.Item id="event">Go to event</Menu.Item>
              <Menu.Item id="delete">Delete</Menu.Item>
            </ActionMenu>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default () => {
  const [editable, setEditable] = useState(true);

  return (
    <Stack space={4}>
      <Checkbox checked={editable} onChange={setEditable}>
        Allow editing
      </Checkbox>
      <DataTable editable={editable} />
    </Stack>
  );
};
