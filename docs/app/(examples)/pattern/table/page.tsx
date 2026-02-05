'use client';

import { Table } from '@marigold/components';
import type { Booking } from './booking';
import { bookings } from './data';

const BookingTablePage = () => {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Booking Overview</h1>
      <Table
        aria-label="Booking table"
        variant="default"
        size="default"
        overflow="truncate"
        verticalAlign="top"
      >
        <Table.Header>
          <Table.Column id="id" width="8%">
            Booking ID
          </Table.Column>
          <Table.Column id="date" width="10%">
            Date
          </Table.Column>
          <Table.Column id="customer" width="22%">
            Customer
          </Table.Column>
          <Table.Column id="order" width="28%">
            Order
          </Table.Column>
          <Table.Column id="orderValue" width="7%">
            Order Value
          </Table.Column>
          <Table.Column id="payment" width="9%">
            Payment Status
          </Table.Column>
          <Table.Column id="invoice" width="9%">
            Invoice Status
          </Table.Column>
          <Table.Column id="ticketStatus" width="7%">
            Ticket Status
          </Table.Column>
        </Table.Header>
        <Table.Body items={bookings}>
          {(booking: Booking) => (
            <Table.Row key={booking.id}>
              <Table.Cell>{booking.id}</Table.Cell>
              <Table.Cell>{booking.date}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-col gap-0.5">
                  <div className="font-medium">
                    {booking.customer.firstName} {booking.customer.lastName}
                  </div>
                  <div className="text-xs text-gray-600">
                    #{booking.customer.number}
                  </div>
                  <div className="text-xs">{booking.customer.email}</div>
                  {booking.customer.phone && (
                    <div className="text-xs text-gray-600">
                      {booking.customer.phone}
                    </div>
                  )}
                  <div className="text-xs text-gray-600">
                    {booking.customer.address.street},{' '}
                    {booking.customer.address.postalCode}{' '}
                    {booking.customer.address.city}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                {booking.orderItems.length > 0 ? (
                  <div className="flex flex-col gap-0.5">
                    {booking.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-1 last:border-0 last:pb-0"
                      >
                        <div className="font-medium">{item.event.title}</div>
                        <div className="text-xs text-gray-600">
                          {item.event.date} • {item.event.time}
                        </div>
                        {item.event.venue && (
                          <div className="text-xs text-gray-600">
                            {item.event.venue}
                          </div>
                        )}
                        <div className="text-xs">
                          {item.event.category}
                          {item.event.subcategory &&
                            ` • ${item.event.subcategory}`}
                        </div>
                        <div className="text-xs text-gray-600">
                          Qty: {item.quantity} × {item.pricePerItem.toFixed(2)}{' '}
                          € = {item.price.toFixed(2)} €
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  '-'
                )}
              </Table.Cell>
              <Table.Cell>{booking.orderValue.toFixed(2)} €</Table.Cell>
              <Table.Cell>{booking.payment.status}</Table.Cell>
              <Table.Cell>
                {booking.payment.invoiceStatus ||
                  booking.invoice?.status ||
                  '-'}
              </Table.Cell>
              <Table.Cell>{booking.ticketPrint.status}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default BookingTablePage;
