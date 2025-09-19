import { venues } from '@/lib/data/venues';
import { useState } from 'react';
import {
  Accordion,
  Button,
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
            <Accordion.Header>Extended Settings</Accordion.Header>
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
          label="Venue Name"
          description="Enter the venue or platform name"
        />
        <Inset spaceY={4}>
          <Stack space={4}>
            <Inline alignY="input" space={5}>
              <Select
                label="Venue"
                selectedKey={selectedVenueId}
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
              <TextField
                label="City"
                width={44}
                value={city}
                onChange={setCity}
              />
            </Inline>
            <Stack>
              <Select
                label="Country"
                placeholder="Select country"
                width={40}
                selectedKey={country}
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
              >
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
                <Stack>
                  <TextField
                    label="Online Meeting Link"
                    description="URL for virtual events"
                    type="url"
                  />
                  <Link href="#">Open online meeting link</Link>
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
        <Checkbox.Group>
          <Checkbox label="Require registration approval" />
          <Checkbox label="Send confirmation emails" />
        </Checkbox.Group>
        <TextField
          label="Contact Email"
          description="Email for event inquiries"
          type="email"
          required
        />
        <NumberField
          label="Registration Fee"
          description="Enter amount (leave empty if free)"
          hideStepper
          width={32}
        />
      </Stack>

      <Inline space={4}>
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Inline>
    </Stack>
  );
};
