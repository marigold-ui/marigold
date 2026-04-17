import { Badge, Button, Panel, Table } from '@marigold/components';
import { NumericFormat } from '@marigold/system';

const bookings = [
  {
    id: 'BKG-2401',
    event: 'Summer Comedy Night',
    customer: 'Alice Chen',
    tickets: 2,
    amount: 48,
    status: 'Confirmed',
    variant: 'success' as const,
  },
  {
    id: 'BKG-2402',
    event: 'Oak Ridge Wedding Showcase',
    customer: 'Bob Martinez',
    tickets: 4,
    amount: 96,
    status: 'Pending',
    variant: 'warning' as const,
  },
  {
    id: 'BKG-2403',
    event: 'Harborfront Jazz Festival',
    customer: 'Charlie Park',
    tickets: 1,
    amount: 65,
    status: 'Confirmed',
    variant: 'success' as const,
  },
  {
    id: 'BKG-2404',
    event: 'Grand Avenue Gala',
    customer: 'Diana Wong',
    tickets: 8,
    amount: 480,
    status: 'Refunded',
    variant: 'error' as const,
  },
  {
    id: 'BKG-2405',
    event: 'Maple Court Film Night',
    customer: 'Eli Brown',
    tickets: 3,
    amount: 45,
    status: 'Confirmed',
    variant: 'success' as const,
  },
];

export default () => (
  <Panel>
    <Panel.Header>
      <Panel.Title>Recent bookings</Panel.Title>
      <Panel.Description>Last 30 days, across all events.</Panel.Description>
      <Panel.HeaderActions>
        <Button variant="ghost">View all</Button>
      </Panel.HeaderActions>
    </Panel.Header>
    <Panel.Content bleed>
      <Table aria-label="Recent bookings">
        <Table.Header>
          <Table.Column rowHeader>Booking</Table.Column>
          <Table.Column>Event</Table.Column>
          <Table.Column>Customer</Table.Column>
          <Table.Column alignX="right">Tickets</Table.Column>
          <Table.Column alignX="right">Amount</Table.Column>
          <Table.Column>Status</Table.Column>
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
  </Panel>
);
