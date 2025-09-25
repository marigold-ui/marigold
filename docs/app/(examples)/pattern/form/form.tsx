'use client';

import { venues } from '@/lib/data/venues';
import {
  Accordion,
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Headline,
  Inline,
  Inset,
  Link,
  NumberField,
  Select,
  Split,
  Stack,
  TextArea,
  TextField,
} from '@marigold/components';

export const Form = () => {
  const uniqueCountries = Array.from(
    new Set(venues.map(venue => venue.country))
  );
  return (
    <Stack space={14}>
      <Stack space={8}>
        <Headline level={2}>Event Details</Headline>
        <TextField
          label="Event Name"
          description="Enter the event title"
          required
        />
        <TextArea
          label="Description"
          description="Describe what this event is about"
          rows={4}
        />
        <Inline space={5}>
          <DatePicker label="Start Date" width="fit" required />
          <DatePicker label="End Date" width="fit" />
        </Inline>
        <Select
          label="Event Type"
          placeholder="Select event type"
          width={'fit'}
          required
        >
          <Select.Option id="conference">Conference</Select.Option>
          <Select.Option id="workshop">Workshop</Select.Option>
          <Select.Option id="meetup">Meetup</Select.Option>
          <Select.Option id="webinar">Webinar</Select.Option>
          <Select.Option id="networking">Networking</Select.Option>
          <Select.Option id="other">Other</Select.Option>
        </Select>
        <Accordion variant="card">
          <Accordion.Item id="1">
            <Accordion.Header>Extended event settings</Accordion.Header>
            <Accordion.Content>
              <Stack space={8}>
                <TextField
                  label="Event Code"
                  description="Optional event code"
                />
                <Select
                  label="Event Visibility"
                  placeholder="Select visibility"
                  width={'fit'}
                >
                  <Select.Option id="public">Public</Select.Option>
                  <Select.Option id="private">Private</Select.Option>
                  <Select.Option id="unlisted">Unlisted</Select.Option>
                </Select>
                <TextArea
                  label="Additional Notes"
                  description="Any extra information about the event"
                  rows={3}
                />
              </Stack>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Stack>

      <Stack space={8}>
        <Headline level={2}>Location & Capacity</Headline>
        <TextField
          label="Location Description"
          description="Provide additional details about the event location"
        />
        <Inset spaceY={4}>
          <Stack space={4}>
            <Inline alignY="input" space={5}>
              <Select label="Venue" width={96}>
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
            <Inline space={5}>
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
        </Inset>

        <Accordion variant="card">
          <Accordion.Item id="2">
            <Accordion.Header>Extended location settings</Accordion.Header>
            <Accordion.Content>
              <Stack space={8}>
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
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Stack>

      <Stack space={8}>
        <Headline level={2}>Registration Settings</Headline>
        <Checkbox label="Require registration approval" />
        <Checkbox label="Send confirmation emails" />
        <TextField
          label="Contact Email"
          description="Email for event inquiries"
          type="email"
          required
        />
        <Stack space={1}>
          <TextField type="file" label="Upload Registration Document" />
          <Link href="#" size="small">
            View PDF
          </Link>
        </Stack>
        <NumberField
          label="Registration Fee"
          description="Enter amount (leave empty if free)"
          hideStepper
          width={32}
        />
        <div className="bg-access-master rounded-md p-4">
          <Checkbox
            label={
              <>
                Enable early bird pricing <Badge variant="master">Master</Badge>
              </>
            }
          />
        </div>
      </Stack>

      <Inline space={4}>
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Inline>
    </Stack>
  );
};
