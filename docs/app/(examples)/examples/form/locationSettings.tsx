'use client';

import { venues } from '@/lib/data/venues';
import {
  Button,
  Checkbox,
  Inline,
  Link,
  NumberField,
  Panel,
  Select,
  Split,
  Stack,
  TextField,
} from '@marigold/components';

export const LocationSettings = () => {
  const uniqueCountries = Array.from(
    new Set(venues.map(venue => venue.country))
  );
  return (
    <Panel size="form">
      <Panel.Title>Location & Capacity</Panel.Title>
      <Panel.Content>
        <Stack space="group">
          <TextField
            label="Location Description"
            description="Provide additional details about the event location"
          />
          <Stack space="regular">
            <Inline alignY="input" space="related" noWrap>
              <Select label="Venue">
                {venues.map(venue => (
                  <Select.Option key={venue.id} id={venue.id}>
                    {venue.name}
                  </Select.Option>
                ))}
              </Select>
              <Split />
              <Button variant="secondary">Create new venue</Button>
            </Inline>
            <TextField label="Name" />
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
                id="wheelchair-accessible"
                label="Wheelchair accessible"
              />
              <Checkbox
                value="elevator-access"
                id="elevator-access"
                label="Elevator access available"
              />
              <Checkbox
                value="accessible-restrooms"
                id="accessible-restrooms"
                label="Accessible restrooms"
              />
              <Checkbox
                value="hearing-loop"
                id="hearing-loop"
                label="Hearing loop system"
              />
              <Checkbox
                id="sign-language-interpretation"
                label="Sign language interpretation available"
              />
            </Checkbox.Group>
            <TextField
              label="Additional Accessibility Notes"
              description="Any other accessibility information"
            />
          </Stack>
        </Stack>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Panel.CollapsibleTitle>
            Advanced Location Settings
          </Panel.CollapsibleTitle>
        </Panel.CollapsibleHeader>
        <Panel.CollapsibleContent>
          <Stack space="regular">
            <TextField
              label="Room"
              description="Specify room or area within the venue"
            />
            <Stack space={1}>
              <TextField label="Online Meeting Link" type="url" />
              <Link href="#" size="small">
                Open online meeting link
              </Link>
            </Stack>
            <NumberField
              label="Maximum Attendees"
              description="Leave empty for unlimited capacity"
              hideStepper
              width={32}
            />
          </Stack>
        </Panel.CollapsibleContent>
      </Panel.Collapsible>
    </Panel>
  );
};
