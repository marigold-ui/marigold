import { venues } from '@/lib/data/venues';
import { useState } from 'react';
import {
  Button,
  Inline,
  Link,
  Select,
  Split,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0].id);
  const selectedVenue =
    venues.find(venue => venue.id === selectedVenueId) || null;
  const uniqueCountries = Array.from(
    new Set(venues.map(venue => venue.country))
  );

  console.log(selectedVenue);

  return (
    <Stack space={4}>
      <Inline alignY="input" space={5}>
        <Select
          label="Venue"
          selectedKey={selectedVenueId}
          onChange={key => setSelectedVenueId(key as string)}
          width={80}
        >
          {venues.map(venue => (
            <Select.Option key={venue.id} id={venue.id}>
              {venue.name}
            </Select.Option>
          ))}
        </Select>
        <Split />
        <Button variant="secondary" onPress={() => setSelectedVenueId('')}>
          Add new venue
        </Button>
      </Inline>

      <TextField label="Name" value={selectedVenue?.name || ''} />
      <TextField label="Street" value={selectedVenue?.street || ''} />
      <Inline space={5}>
        <TextField
          label="Postcode"
          width={20}
          value={selectedVenue?.postcode || ''}
        />
        <TextField label="City" width={44} value={selectedVenue?.city || ''} />
      </Inline>
      <Stack>
        <Select
          label="Country"
          placeholder="Select country"
          width={40}
          selectedKey={selectedVenue?.country || ''}
        >
          {uniqueCountries.map(country => (
            <Select.Option key={country} id={country}>
              {country}
            </Select.Option>
          ))}
        </Select>
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${selectedVenue?.name || ''},${selectedVenue?.city || ''},${selectedVenue?.country || ''}`}
          target="_blank"
        >
          Open maps
        </Link>
      </Stack>
    </Stack>
  );
};
