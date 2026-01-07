import {
  Accordion,
  Button,
  Checkbox,
  DatePicker,
  Headline,
  Inline,
  NumberField,
  Select,
  Stack,
  TextArea,
  TextField,
} from '@marigold/components';

export default () => (
  <Stack space="section">
    <Stack space="peer">
      <Headline level={2}>Event Details</Headline>
      <TextField
        label="Event Name"
        description="Enter the event title"
        required
      />
      <TextArea
        label="Description"
        description="Describe what this event is about"
        rows={3}
        required
      />
      <Inline space="related">
        <DatePicker label="Start Date" width="fit" required />
        <DatePicker label="End Date" width="fit" />
      </Inline>
    </Stack>
    <Accordion variant="card">
      <Accordion.Item id="advanced-settings">
        <Accordion.Header>Advanced Event Settings</Accordion.Header>
        <Accordion.Content>
          <Stack space="peer">
            <Select
              label="Event Category"
              placeholder="Select category"
              width="fit"
            >
              <Select.Option id="conference">Conference</Select.Option>
              <Select.Option id="workshop">Workshop</Select.Option>
              <Select.Option id="meetup">Meetup</Select.Option>
              <Select.Option id="webinar">Webinar</Select.Option>
            </Select>
            <NumberField
              label="Maximum Attendees"
              description="Leave empty for unlimited capacity"
              width={32}
            />
            <TextField
              label="Event Code"
              description="Optional registration code"
              width="fit"
            />
            <Checkbox label="Require registration approval" />
            <Checkbox label="Send confirmation emails" />
          </Stack>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
    <Stack space="peer">
      <Headline level={2}>Location & Capacity</Headline>
      <TextField
        label="Venue Name"
        description="Name of the venue or location"
        required
      />
      <TextField
        label="Address"
        description="Street address of the venue"
        required
      />
      <Inline space="related">
        <TextField label="City" required />
        <TextField label="Postal Code" width={20} />
      </Inline>
      <Accordion variant="card">
        <Accordion.Item id="location-details">
          <Accordion.Header>Additional Location Details</Accordion.Header>
          <Accordion.Content>
            <Stack space="peer">
              <TextField
                label="Room Number"
                description="Specific room or area within venue"
              />
              <TextField
                label="Floor"
                description="Which floor of the building"
                width={20}
              />
              <TextArea
                label="Directions"
                description="Specific directions to find the venue"
                rows={3}
              />
              <Checkbox label="Wheelchair accessible" />
              <Checkbox label="Parking available" />
              <TextField
                label="Parking Instructions"
                description="Where to park and any costs"
              />
            </Stack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Stack>
    <Stack space="group">
      <Accordion variant="card">
        <Accordion.Item id="contact-info">
          <Accordion.Header>Contact Information</Accordion.Header>
          <Accordion.Content>
            <Stack space="peer">
              <TextField
                label="Organizer Name"
                description="Main contact person"
              />
              <TextField
                label="Email"
                type="email"
                description="Contact email for inquiries"
              />
              <TextField
                label="Phone"
                type="tel"
                description="Optional phone number"
              />
              <Checkbox label="Display contact info publicly" />
            </Stack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Accordion variant="card">
        <Accordion.Item id="special-requirements">
          <Accordion.Header>Special Requirements</Accordion.Header>
          <Accordion.Content>
            <Stack space="peer">
              <Checkbox label="Catering required" />
              <Checkbox label="Audio/Visual equipment needed" />
              <Checkbox label="Security required" />
              <TextArea
                label="Additional Notes"
                description="Any other special requirements or notes"
                rows={3}
              />
            </Stack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Stack>
    <Inline space="related">
      <Button variant="primary">Create Event</Button>
      <Button variant="secondary">Save as Draft</Button>
    </Inline>
  </Stack>
);
