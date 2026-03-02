'use client';

import {
  amenitiesOptions,
  parkingOptions,
  venueTypes,
  venues,
} from '@/lib/data/venues';
import {
  Badge,
  EmptyState,
  Inline,
  Stack,
  Table,
  Text,
} from '@marigold/components';
import { Star } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import { useFilter, useSearch } from './utils';

const VenuesEmptyState = () => (
  <EmptyState
    title="No venues match your criteria"
    description="Try adjusting your filters or search to find the right venue."
  />
);

export const VenuesView = () => {
  const [search] = useSearch();
  const { filter } = useFilter();

  const result = venues.filter(venue => {
    // Search
    if (search && !venue.name.toLowerCase().includes(search.toLowerCase()))
      return false;

    // Filter
    if (filter.type !== null && filter.type !== venue.type) return false;
    if (filter.capacity && venue.capacity < filter.capacity) return false;
    if (filter.price && filter.price < venue.price.to) return false;
    if (filter.rating && filter.rating > venue.rating) return false;
    if (
      Array.isArray(filter.traits) &&
      !venue.traits.some(t => filter.traits.includes(t))
    )
      return false;

    return true;
  });

  return (
    <Table aria-label="Venue List">
      <Table.Header sticky>
        <Table.Column rowHeader>Name</Table.Column>
        <Table.Column>Type</Table.Column>
        <Table.Column>Address</Table.Column>
        <Table.Column alignX="right" width={80}>
          Capacity
        </Table.Column>
        <Table.Column alignX="right" maxWidth={180}>
          Price
        </Table.Column>
        <Table.Column maxWidth={200}>Traits</Table.Column>
        <Table.Column>Amenities</Table.Column>
        <Table.Column maxWidth={200}>Parking</Table.Column>
        <Table.Column alignX="right" width={60}>
          Rating
        </Table.Column>
      </Table.Header>
      <Table.Body emptyState={VenuesEmptyState}>
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
              <Inline space="0.5">
                {venue.traits.map(trait => (
                  <Badge key={trait}>{trait}</Badge>
                ))}
              </Inline>
            </Table.Cell>
            <Table.Cell>
              <Inline space="0.5">
                {venue.amenities.map(amenity => (
                  <Badge key={amenity}>{amenitiesOptions[amenity]}</Badge>
                ))}
              </Inline>
            </Table.Cell>
            <Table.Cell>
              <Inline space="0.5">
                {venue.parking.map(space => (
                  <Badge key={space}>{parkingOptions[space]}</Badge>
                ))}
              </Inline>
            </Table.Cell>
            <Table.Cell>
              <Inline space="0.5" alignY="center" alignX="right">
                <NumericFormat value={venue.rating} minimumFractionDigits={1} />{' '}
                <Star className="self-center" size={14} />
              </Inline>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
