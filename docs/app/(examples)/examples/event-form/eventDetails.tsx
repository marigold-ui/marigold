'use client';

import {
  DatePicker,
  Inline,
  Panel,
  Radio,
  Select,
  Stack,
  TextArea,
  TextField,
} from '@marigold/components';

export const EventDetails = () => (
  <Panel headingLevel={3} size="form">
    <Panel.Header>
      <Panel.Title>Event details</Panel.Title>
      <Panel.Description>
        Information shown on the event page, confirmations, and tickets.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
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
          width={44}
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
    </Panel.Content>
    <Panel.Collapsible>
      <Panel.CollapsibleHeader>
        <Panel.CollapsibleTitle>Advanced event settings</Panel.CollapsibleTitle>
      </Panel.CollapsibleHeader>
      <Panel.CollapsibleContent>
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
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
);
