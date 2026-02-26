import { useState } from 'react';
import { ActionMenu, Menu, Table } from '@marigold/components';

const rows = [
  {
    ticketId: 'TCK-001',
    eventName: 'Champions League Final',
    status: 'Confirmed',
  },
  {
    ticketId: 'TCK-002',
    eventName: 'Rock Concert',
    status: 'Pending',
  },
  {
    ticketId: 'TCK-003',
    eventName: 'Broadway Show',
    status: 'Cancelled',
  },
];

interface Ticket {
  ticketId: string;
  eventName: string;
  status: 'Cancelled' | 'Pending' | 'Confirmed';
}

export default () => {
  const [tickets, setTickets] = useState(rows);

  const handleViewDetails = (ticket: Ticket) => {
    alert(
      `Ticket ID: ${ticket.ticketId}\nEvent: ${ticket.eventName}\nStatus: ${ticket.status}`
    );
  };

  return (
    <Table aria-label="Data Table" size="compact">
      <Table.Header>
        <Table.Column rowHeader>ID</Table.Column>
        <Table.Column>Event Name</Table.Column>
        <Table.Column>Status</Table.Column>
        <Table.Column>Action</Table.Column>
      </Table.Header>
      <Table.Body items={rows}>
        {tickets.map((ticket: Ticket) => (
          <Table.Row key={ticket.ticketId}>
            <Table.Cell>{ticket.ticketId}</Table.Cell>
            <Table.Cell>{ticket.eventName}</Table.Cell>
            <Table.Cell>{ticket.status}</Table.Cell>
            <Table.Cell>
              <ActionMenu>
                <Menu.Item
                  onAction={() => handleViewDetails(ticket)}
                  id="view-details"
                >
                  View Details
                </Menu.Item>
                <Menu.Item
                  variant="destructive"
                  onAction={() =>
                    setTickets(
                      tickets.filter(
                        ticketItem => ticketItem.ticketId !== ticket.ticketId
                      )
                    )
                  }
                  id="delete"
                >
                  Delete
                </Menu.Item>
              </ActionMenu>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
