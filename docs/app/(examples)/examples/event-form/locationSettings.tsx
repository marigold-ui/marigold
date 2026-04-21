'use client';

import { venues } from '@/lib/data/venues';
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
  Split,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export const LocationSettings = () => {
  const uniqueCountries = Array.from(
    new Set(venues.map(venue => venue.country))
  );

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
              <Select label="Venue" required>
                {venues.map(venue => (
                  <Select.Option key={venue.id} id={venue.id}>
                    {venue.name}
                  </Select.Option>
                ))}
              </Select>
              <Split />
              <Button variant="secondary">Create new venue</Button>
            </Inline>
            <TextField label="Venue Name" />
            <TextField label="Street" />
            <Inline space="related">
              <TextField label="Postcode" width={20} />
              <TextField label="City" width={44} />
            </Inline>
            <Stack space={1}>
              <Select label="Country" placeholder="Select country" width={40}>
                {uniqueCountries.map(country => (
                  <Select.Option key={country} id={country}>
                    {country}
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
                <Stack space={1}>
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
