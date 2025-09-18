import {
  Button,
  Checkbox,
  DateField,
  Headline,
  Inline,
  Inset,
  NumberField,
  Select,
  Stack,
  TextArea,
  TextField,
} from '@marigold/components';

export default () => (
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
        <DateField label="Start Date" required />
        <DateField label="End Date" />
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
    </Stack>

    <Stack space={8}>
      <Headline level={2}>Location & Capacity</Headline>
      <TextField
        label="Venue Name"
        description="Enter the venue or platform name"
      />
      <Inset spaceY={4}>
        <Stack space={4}>
          <TextField label="Street Address" />
          <Inline space={5}>
            <TextField label="Postcode" width={20} />
            <TextField label="City" width={40} />
          </Inline>
          <Select label="Country" placeholder="Select country" width={'fit'}>
            <Select.Option id="us">United States</Select.Option>
            <Select.Option id="ca">Canada</Select.Option>
            <Select.Option id="uk">United Kingdom</Select.Option>
            <Select.Option id="de">Germany</Select.Option>
            <Select.Option id="fr">France</Select.Option>
            <Select.Option id="other">Other</Select.Option>
          </Select>
        </Stack>
      </Inset>
      <NumberField
        label="Maximum Attendees"
        description="Leave empty for unlimited capacity"
        hideStepper
        width={32}
      />
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
