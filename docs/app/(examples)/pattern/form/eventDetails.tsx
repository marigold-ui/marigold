'use client';

import {
  Accordion,
  DatePicker,
  Headline,
  Inline,
  Select,
  Stack,
  TextArea,
  TextField,
} from '@marigold/components';

export const EventDetails = () => {
  return (
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
        rows={4}
      />
      <Inline space="fieldX">
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
        <Accordion.Item id="advanced-event-settings">
          <Accordion.Header>Advanced Event Settings</Accordion.Header>
          <Accordion.Content>
            <Stack space="peer">
              <TextField label="Event Code" description="Optional event code" />
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
  );
};
