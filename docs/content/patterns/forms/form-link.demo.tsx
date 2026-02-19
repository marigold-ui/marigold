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
  const [name, setName] = useState<string>(venues[0].name);
  const [street, setStreet] = useState<string>(venues[0].street);
  const [postcode, setPostcode] = useState<string>(venues[0].postcode);
  const [city, setCity] = useState<string>(venues[0].city);
  const [country, setCountry] = useState<string>(venues[0].country);

  const uniqueCountries = Array.from(
    new Set(venues.map(venue => venue.country))
  );

  const handleVenueChange = (venueId: string) => {
    setSelectedVenueId(venueId);
    const venue = venues.find(v => v.id === venueId);
    if (venue) {
      setName(venue.name);
      setStreet(venue.street);
      setPostcode(venue.postcode);
      setCity(venue.city);
      setCountry(venue.country);
    }
  };

  const handleReset = () => {
    setSelectedVenueId('');
    setName('');
    setStreet('');
    setPostcode('');
    setCity('');
    setCountry('');
  };

  return (
    <Stack space="group">
      <Inline alignY="input" space="related" noWrap>
        <Select
          label="Venue"
          value={selectedVenueId}
          onChange={handleVenueChange}
          width={96}
        >
          {venues.map(venue => (
            <Select.Option key={venue.id} id={venue.id}>
              {venue.name}
            </Select.Option>
          ))}
        </Select>
        <Split />
        <Button variant="secondary" onPress={handleReset}>
          Create new venue
        </Button>
      </Inline>
      <TextField label="Name" value={name} onChange={setName} />
      <TextField label="Street" value={street} onChange={setStreet} />
      <Inline space={5}>
        <TextField
          label="Postcode"
          width={20}
          value={postcode}
          onChange={setPostcode}
        />
        <TextField label="City" width={44} value={city} onChange={setCity} />
      </Inline>
      <Stack space="group">
        <Select
          label="Country"
          placeholder="Select country"
          width={40}
          value={country}
          onChange={key => setCountry(key as string)}
        >
          {uniqueCountries.map(country => (
            <Select.Option key={country} id={country}>
              {country}
            </Select.Option>
          ))}
        </Select>
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${name},${city},${country}`}
          target="_blank"
          size="small"
        >
          Open in maps
        </Link>
      </Stack>
    </Stack>
  );
};
