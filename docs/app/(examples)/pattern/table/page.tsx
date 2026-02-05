'use client';

import { Button, Table } from '@marigold/components';
import type { Booking } from './booking';
import { bookings } from './data';

const BookingTablePage = () => {
  return (
    <div className="mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Booking Overview</h1>
      <Table aria-label="Booking table" verticalAlign="top">
        <Table.Header>
          <Table.Column id="id" width="7%">
            Booking ID
          </Table.Column>
          <Table.Column id="date" width="9%">
            Date
          </Table.Column>
          <Table.Column id="customer" width="20%">
            Customer
          </Table.Column>
          <Table.Column id="order" width="26%">
            Order
          </Table.Column>
          <Table.Column id="orderValue" width="6%">
            Order Value
          </Table.Column>
          <Table.Column id="payment" width="8%">
            Payment Status
          </Table.Column>
          <Table.Column id="invoice" width="8%">
            Invoice Status
          </Table.Column>
          <Table.Column id="ticketStatus" width="6%">
            Ticket Status
          </Table.Column>
          <Table.Column id="actions" width="10%">
            Actions
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
                        className={`border-b border-gray-200 pb-1 last:border-0 last:pb-0 ${item.cancelled ? 'text-red-600 line-through opacity-75' : ''}`}
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
                        {item.cancelled && (
                          <div className="text-xs font-semibold uppercase">
                            Cancelled
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  '-'
                )}
              </Table.Cell>
              <Table.Cell>{booking.orderValue.toFixed(2)} €</Table.Cell>
              <Table.Cell>
                <span
                  className={
                    booking.payment.status === 'storniert'
                      ? 'font-semibold text-red-600'
                      : ''
                  }
                >
                  {booking.payment.status}
                </span>
              </Table.Cell>
              <Table.Cell>
                <span
                  className={
                    booking.payment.invoiceStatus === 'storniert' ||
                    booking.invoice?.status === 'storniert' ||
                    booking.payment.invoiceStatus === 'teilweise' ||
                    booking.invoice?.status === 'teilweise'
                      ? 'font-semibold text-red-600'
                      : ''
                  }
                >
                  {booking.payment.invoiceStatus ||
                    booking.invoice?.status ||
                    '-'}
                </span>
              </Table.Cell>
              <Table.Cell>{booking.ticketPrint.status}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-1">
                  <Button
                    size="small"
                    variant="secondary"
                    onPress={() => console.log('View booking', booking.id)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="destructive"
                    onPress={() => console.log('Cancel booking', booking.id)}
                    disabled={
                      booking.payment.status === 'storniert' ||
                      booking.payment.invoiceStatus === 'storniert'
                    }
                  >
                    Cancel
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default BookingTablePage;
