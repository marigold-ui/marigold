'use client';

import { venueTypes, venues } from '@/lib/data/venues';
import { Stack, Table, Text } from '@marigold/components';
import { NumericFormat } from '@marigold/system';
import { useFilter, useSearch } from './utils';

export const VenuesView = () => {
  const [search] = useSearch();
  const [filter] = useFilter();

  const result = venues.filter(venue => {
    // if (venue.name === 'Guffaw Gardens') {
    console.log(
      venue.name,
      venue.rating,
      filter.rating && filter.rating >= venue.rating
    );
    // }

    // Search
    if (search && !venue.name.toLowerCase().includes(search.toLowerCase()))
      return false;

    // Filter
    if (filter.type && filter.type !== venue.type) return false;
    if (filter.capacity && filter.capacity <= venue.capacity) return false;
    if (filter.price && filter.price <= venue.price.to) return false;
    if (filter.rating && filter.rating >= venue.rating) return false;
    return true;
  });

  return (
    <Table>
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Type</Table.Column>
        <Table.Column>Address</Table.Column>
        <Table.Column align="right">Capacity</Table.Column>
        <Table.Column align="right">Price</Table.Column>
        <Table.Column align="right">Rating</Table.Column>
      </Table.Header>
      <Table.Body>
        {result.map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>
              <Text weight="medium">{venue.name}</Text>
            </Table.Cell>
            <Table.Cell>{venueTypes[venue.type]}</Table.Cell>
            <Table.Cell>
              <Stack>
                <Text>{venue.street}</Text>
                <Text>{venue.city}</Text>
              </Stack>
            </Table.Cell>
            <Table.Cell>{venue.capacity}</Table.Cell>
            <Table.Cell>
              <NumericFormat value={venue.price.from} /> -{' '}
              <NumericFormat
                style="currency"
                value={venue.price.to}
                currency="EUR"
                maximumFractionDigits={0}
              />
            </Table.Cell>
            <Table.Cell>
              <NumericFormat value={venue.rating} minimumFractionDigits={1} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
