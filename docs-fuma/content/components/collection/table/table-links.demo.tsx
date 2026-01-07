'use client';

import { venues } from '@/lib/data/venues';
import { Link, Table } from '@marigold/components';

export default () => (
  <Table aria-label="Event Links Table" stretch>
    <Table.Header>
      <Table.Column>Venue</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column>Rating</Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(0, 4).map(venue => (
        <Table.Row key={venue.id}>
          <Table.Cell>
            <Link href={`#`}>{venue.name}</Link>
          </Table.Cell>
          <Table.Cell>
            {venue.street}, {venue.city}
          </Table.Cell>
          <Table.Cell>{venue.rating}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
