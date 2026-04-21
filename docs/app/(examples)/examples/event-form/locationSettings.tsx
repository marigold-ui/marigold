'use client';

import { venues } from '@/lib/data/venues';
import { useState } from 'react';
import type { Key } from 'react-aria-components';
import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Headline,
  Inline,
  Link,
  NumberField,
  Select,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export const LocationSettings = () => {
  const uniqueCountries = Array.from(
    new Set(venues.map(venue => venue.country))
  );

  const [selectedVenue, setSelectedVenue] = useState<Key | null>(null);
  const [venueName, setVenueName] = useState('');
  const [street, setStreet] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState<Key | null>(null);

  const handleVenueSelect = (key: Key | null) => {
    setSelectedVenue(key);
    const venue = venues.find(v => v.id === key);
    if (venue) {
      setVenueName(venue.name);
      setStreet(venue.street);
      setPostcode(venue.postcode);
      setCity(venue.city);
      setCountry(venue.country);
    }
  };

  const handleCreateNewVenue = () => {
    setSelectedVenue(null);
    setVenueName('');
    setStreet('');
    setPostcode('');
    setCity('');
    setCountry(null);
  };

  return (
    <Card p={4} stretch>
      <Stack space="regular">
        <Stack space="tight">
          <Headline level={3}>Location & capacity</Headline>
          <Text>Venue, address, and accessibility information.</Text>
        </Stack>
        <Stack space="group">
          <Stack space="regular">
            <Inline alignY="input" space="related" noWrap>
              <Select
                label="Venue"
                required
                errorMessage="Please select or create a venue."
                width={64}
                selectedKey={selectedVenue}
                onSelectionChange={handleVenueSelect}
              >
                {venues.map(venue => (
                  <Select.Option key={venue.id} id={venue.id}>
                    {venue.name}
                  </Select.Option>
                ))}
              </Select>
              <Button variant="secondary" onPress={handleCreateNewVenue}>
                Create new venue
              </Button>
            </Inline>
            <TextField
              label="Venue Name"
              value={venueName}
              onChange={setVenueName}
            />
            <TextField label="Street" value={street} onChange={setStreet} />
            <Inline space="related">
              <TextField
                label="Postcode"
                width={20}
                value={postcode}
                onChange={setPostcode}
              />
              <TextField
                label="City"
                width={44}
                value={city}
                onChange={setCity}
              />
            </Inline>
            <Stack space="tight">
              <Select
                label="Country"
                placeholder="Select country"
                width={40}
                value={country}
                onChange={setCountry}
              >
                {uniqueCountries.map(c => (
                  <Select.Option key={c} id={c}>
                    {c}
                  </Select.Option>
                ))}
              </Select>
              <Link href="https://maps.google.com" target="_blank" size="small">
                Open in maps
              </Link>
            </Stack>
          </Stack>
          <Stack space="regular">
            <Checkbox.Group label="Accessibility Features">
              <Checkbox
                value="wheelchair-accessible"
                label="Wheelchair accessible"
              />
              <Checkbox value="elevator-access" label="Elevator available" />
              <Checkbox
                value="accessible-restrooms"
                label="Accessible restrooms"
              />
              <Checkbox value="hearing-loop" label="Hearing loop system" />
              <Checkbox
                value="sign-language"
                label="Sign language interpretation"
              />
            </Checkbox.Group>
            <TextField
              label="Additional Accessibility Notes"
              description="Anything not covered above, e.g. parking or entrance details."
            />
          </Stack>
        </Stack>
        <Accordion>
          <Accordion.Item id="advanced-location-settings">
            <Accordion.Header>Advanced location settings</Accordion.Header>
            <Accordion.Content>
              <Stack space="regular">
                <TextField
                  label="Room or Area"
                  description="Specific room, hall, or outdoor area within the venue."
                />
                <Stack space="tight">
                  <TextField
                    label="Online Meeting Link"
                    type="url"
                    description="For hybrid or fully remote events."
                  />
                  <Link href="#" size="small">
                    Test meeting link
                  </Link>
                </Stack>
                <NumberField
                  label="Maximum Attendees"
                  description="Leave empty for unlimited."
                  hideStepper
                  width={32}
                />
              </Stack>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Card>
  );
};
