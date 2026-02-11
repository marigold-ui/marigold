import { venueTypes, venues } from '@/lib/data/venues';
import { useState } from 'react';
import {
  Aside,
  Button,
  Columns,
  Form,
  Inline,
  Select,
  Stack,
  Text,
} from '@marigold/components';
import { NumericFormat } from '@marigold/system';

export default () => {
  const [selectedVenue, setSelectedVenue] = useState<string>(venues[0].id);
  const current = venues.find(venue => venue.id === selectedVenue)!;

  return (
    <Stack space={8}>
      <Form
        onSubmit={e => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const venue = form.get('venue')!;
          setSelectedVenue(venue.toString());
        }}
      >
        <Inline space={2}>
          <Select
            aria-label="Select a venue:"
            name="venue"
            width={64}
            defaultSelectedKey={selectedVenue}
          >
            {venues.slice(0, 10).map(venue => (
              <Select.Option key={venue.id} id={venue.id}>
                {venue.name}
              </Select.Option>
            ))}
          </Select>
          <Button variant="primary" type="submit" aria-controls="venueDetails">
            View details
          </Button>
        </Inline>
      </Form>
      <Aside sideWidth="160px" space={8}>
        <img alt="" className="rounded" src={current.image} />
        <Stack space={6} id="venueDetails" role="region" aria-live="polite">
          <Stack>
            <Text weight="extrabold" fontSize="2xl">
              {current.name}
            </Text>
            <Text fontStyle="italic" variant="muted">
              {venueTypes[current.type]}
            </Text>
          </Stack>
          <Stack>
            <Text weight="bold">Description</Text>
            <Text variant="muted">{current.description}</Text>
          </Stack>
          <Columns columns={[1, 1, 1]} space={4}>
            <Stack>
              <Text weight="bold">Address</Text>
              <Text variant="muted">{current.street}</Text>
              <Text variant="muted">{current.city}</Text>
            </Stack>
            <Stack>
              <Text weight="bold">Capacity</Text>
              <Text variant="muted">{current.capacity}</Text>
            </Stack>
            <Stack>
              <Text weight="bold">Price</Text>
              <Text variant="muted">
                <NumericFormat
                  style="currency"
                  value={[current.price.from, current.price.to]}
                  currency="EUR"
                  notation="compact"
                />
              </Text>
            </Stack>
          </Columns>
        </Stack>
      </Aside>
    </Stack>
  );
};
