import { venueTypes, venues } from '@/lib/data/venues';
import { useState } from 'react';
import {
  Aside,
  Button,
  Card,
  Columns,
  Form,
  Image,
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
    <Stack space={4}>
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
            width={48}
            defaultSelectedKey={selectedVenue}
          >
            {venues.map(venue => (
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
      <Card px={4} py={6}>
        <Aside sideWidth="160px" space={8}>
          <Image alt="" src={current.image} />
          <Stack space={6} id="venueDetails" role="region" aria-live="polite">
            <Stack>
              <Text weight="extrabold" fontSize="2xl">
                {current.name}
              </Text>
              <Text fontStyle="italic">{venueTypes[current.type]}</Text>
            </Stack>
            <Stack>
              <Text weight="bold">Description</Text>
              <Text>{current.description}</Text>
            </Stack>
            <Columns columns={[1, 1, 1]} space={4}>
              <Stack>
                <Text weight="bold">Address</Text>
                <Text>{current.street}</Text>
                <Text>{current.city}</Text>
              </Stack>
              <Stack>
                <Text weight="bold">Capacity</Text>
                <Text>{current.capacity}</Text>
              </Stack>
              <Stack>
                <Text weight="bold">Price</Text>
                <Text>
                  <NumericFormat
                    style="currency"
                    value={current.price.from}
                    currency="EUR"
                    notation="compact"
                  />{' '}
                  to{' '}
                  <NumericFormat
                    style="currency"
                    value={current.price.to}
                    currency="EUR"
                    notation="compact"
                  />
                </Text>
              </Stack>
            </Columns>
          </Stack>
        </Aside>
      </Card>
    </Stack>
  );
};
