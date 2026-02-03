import { venues } from '@/lib/data/venues';
import { NumericFormat, Stack, Table, Text } from '@marigold/components';

export default () => {
  const bookings = venues.slice(0, 4).map(venue => ({
    ...venue,
    nights: Math.floor(Math.random() * 3) + 1,
    guests: Math.floor(Math.random() * 50) + 10,
  }));

  const total = bookings.reduce(
    (sum, booking) => sum + booking.price.from * booking.nights,
    0
  );

  return (
    <Table aria-label="Venue bookings" verticalAlign="top">
      <Table.Header>
        <Table.Column isRowHeader width={220}>
          Venue
        </Table.Column>
        <Table.Column align="right">Nights</Table.Column>
        <Table.Column align="right">Guests</Table.Column>
        <Table.Column align="right">Price/Night</Table.Column>
        <Table.Column align="right">Subtotal</Table.Column>
      </Table.Header>
      <Table.Body>
        {bookings.map(booking => (
          <Table.Row key={booking.id}>
            <Table.Cell>
              <Stack space={1}>
                <Text weight="semibold">{booking.name}</Text>
                <Text fontSize="xs" color="text-secondary-muted">
                  {booking.city}, {booking.country}
                </Text>
              </Stack>
            </Table.Cell>
            <Table.Cell align="right">{booking.nights}</Table.Cell>
            <Table.Cell align="right">{booking.guests}</Table.Cell>
            <Table.Cell align="right">
              <NumericFormat
                style="currency"
                currency="USD"
                value={booking.price.from}
              />
            </Table.Cell>
            <Table.Cell align="right">
              <NumericFormat
                style="currency"
                currency="USD"
                value={booking.price.from * booking.nights}
              />
            </Table.Cell>
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell colSpan={4} align="right">
            <Text weight="semibold">Total</Text>
          </Table.Cell>
          <Table.Cell align="right">
            <Text weight="semibold">
              <NumericFormat style="currency" currency="USD" value={total} />
            </Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
