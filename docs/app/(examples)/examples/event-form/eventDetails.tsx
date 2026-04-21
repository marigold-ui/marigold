'use client';

import {
  Accordion,
  Card,
  DatePicker,
  Headline,
  Inline,
  Radio,
  Select,
  Stack,
  Text,
  TextArea,
  TextField,
} from '@marigold/components';

export const EventDetails = () => (
  <Card p={4}>
    <Stack space="regular">
      <Stack space="tight">
        <Headline level={3}>Event details</Headline>
        <Text>
          Information shown on the event page, confirmations, and tickets.
        </Text>
      </Stack>
      <Stack space="regular">
        <TextField
          label="Event Name"
          required
          errorMessage="Please enter a name for your event."
        />
        <TextArea
          label="Description"
          description="A short summary for listings and social shares."
          rows={4}
        />
        <Inline space="related">
          <DatePicker
            label="Start Date"
            width="fit"
            required
            errorMessage="A start date is required."
          />
          <DatePicker label="End Date" width="fit" />
        </Inline>
        <Select
          label="Event Type"
          placeholder="Select event type"
          width={40}
          required
          errorMessage="Please select an event type."
        >
          <Select.Option id="conference">Conference</Select.Option>
          <Select.Option id="workshop">Workshop</Select.Option>
          <Select.Option id="meetup">Meetup</Select.Option>
          <Select.Option id="webinar">Webinar</Select.Option>
          <Select.Option id="networking">Networking</Select.Option>
          <Select.Option id="other">Other</Select.Option>
        </Select>
      </Stack>
      <Accordion>
        <Accordion.Item id="advanced-event-settings">
          <Accordion.Header>Advanced event settings</Accordion.Header>
          <Accordion.Content>
            <Stack space="regular">
              <TextField
                label="Event Code"
                description="Internal reference, not shown to attendees."
              />
              <Radio.Group label="Event Visibility" defaultValue="public">
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
                <Radio value="unlisted">Unlisted</Radio>
              </Radio.Group>
              <TextArea
                label="Internal Notes"
                description="Only visible to organizers."
                rows={3}
              />
            </Stack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Stack>
  </Card>
);
