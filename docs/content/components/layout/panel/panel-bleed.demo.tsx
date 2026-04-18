import { useState } from 'react';
import {
  Badge,
  Inline,
  Pagination,
  Panel,
  Table,
  Text,
} from '@marigold/components';
import { NumericFormat } from '@marigold/system';

const bookings = [
  {
    id: 'BKG-2401',
    event: 'Summer Comedy Night',
    customer: 'Alice Chen',
    tickets: 2,
    amount: 48,
    status: 'Confirmed',
    variant: 'success',
  },
  {
    id: 'BKG-2402',
    event: 'Oak Ridge Wedding Showcase',
    customer: 'Bob Martinez',
    tickets: 4,
    amount: 96,
    status: 'Pending',
    variant: 'warning',
  },
  {
    id: 'BKG-2403',
    event: 'Harborfront Jazz Festival',
    customer: 'Charlie Park',
    tickets: 1,
    amount: 65,
    status: 'Confirmed',
    variant: 'success',
  },
  {
    id: 'BKG-2404',
    event: 'Grand Avenue Gala',
    customer: 'Diana Wong',
    tickets: 8,
    amount: 480,
    status: 'Refunded',
    variant: 'error',
  },
  {
    id: 'BKG-2405',
    event: 'Maple Court Film Night',
    customer: 'Eli Brown',
    tickets: 3,
    amount: 45,
    status: 'Confirmed',
    variant: 'success',
  },
] as const;

const pageSize = bookings.length;
const totalItems = pageSize * 162;

export default () => {
  const [page, setPage] = useState(1);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalItems);

  return (
    <Panel>
      <Panel.Header>
        <Panel.Title>Recent bookings</Panel.Title>
        <Panel.Description>Last 7 days, across all events.</Panel.Description>
      </Panel.Header>
      <Panel.Content bleed>
        <Table aria-label="Recent bookings">
          <Table.Header>
            <Table.Column rowHeader>Booking</Table.Column>
            <Table.Column minWidth={200}>Event</Table.Column>
            <Table.Column>Customer</Table.Column>
            <Table.Column alignX="right">Tickets</Table.Column>
            <Table.Column alignX="right">Amount</Table.Column>
            <Table.Column width={120}>Status</Table.Column>
          </Table.Header>
          <Table.Body items={bookings}>
            {booking => (
              <Table.Row id={booking.id}>
                <Table.Cell>{booking.id}</Table.Cell>
                <Table.Cell>{booking.event}</Table.Cell>
                <Table.Cell>{booking.customer}</Table.Cell>
                <Table.Cell>{booking.tickets}</Table.Cell>
                <Table.Cell>
                  <NumericFormat
                    style="currency"
                    currency="EUR"
                    value={booking.amount}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={booking.variant}>{booking.status}</Badge>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Panel.Content>
      <Panel.Content>
        <Inline alignY="center" alignX="between">
          <Text fontSize="sm">
            Showing {start} - {end} of {totalItems}
          </Text>
          <Pagination
            totalItems={totalItems}
            pageSize={pageSize}
            page={page}
            onChange={setPage}
          />
        </Inline>
      </Panel.Content>
    </Panel>
  );
};
