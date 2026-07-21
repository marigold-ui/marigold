'use client';

import { eventTypes } from '@/lib/data/eventTypes';
import {
  DatePicker,
  Description,
  Inline,
  Panel,
  Radio,
  Select,
  Stack,
  TextArea,
  TextField,
  TextValue,
  Title,
} from '@marigold/components';

export const EventDetails = () => {
  return (
    <Panel size="form">
      <Panel.Header>
        <Title>Event details</Title>
        <Description>
          Information shown on the event page, confirmations, and tickets. Some
          fields are pre-filled from your organization settings.
        </Description>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <TextField
            label="Event Name"
            defaultValue="Riverside"
            description="Pre-filled with your event name prefix from organization settings."
            required
            errorMessage="Please enter a name for your event."
          />
          <TextArea
            label="Description"
            description="Shown on the event listing, social share previews, and search results. Keep it under 300 characters for best display."
            rows={4}
          />
          <Inline space="related">
            <DatePicker
              label="Start Date"
              description="Displayed on tickets and the event page."
              width="1/4"
              required
              errorMessage="A start date is required."
            />
            <DatePicker
              label="End Date"
              description="Optional. Leave empty for single-day events."
              width="1/4"
            />
          </Inline>
          <Select
            label="Event Type"
            defaultValue="conference"
            description="Inherited from your default event type. Change it for this event if needed."
            width={64}
            required
            errorMessage="Please select an event type."
          >
            {eventTypes.map(type => (
              <Select.Option key={type.id} id={type.id} textValue={type.label}>
                <TextValue>{type.label}</TextValue>
                <Description>{type.description}</Description>
              </Select.Option>
            ))}
          </Select>
        </Stack>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Title>Additional details</Title>
          <Description>
            Optional fields for visibility, internal tracking, and organizer
            notes.
          </Description>
        </Panel.CollapsibleHeader>
        <Panel.CollapsibleContent>
          <Stack space="regular">
            <TextField
              label="Event Code"
              description="Used for internal tracking, e.g. in reports and exports. Not shown to attendees."
            />
            <Radio.Group
              label="Event Visibility"
              defaultValue="public"
              description="Inherited from your organization default. Public events appear in search and on your organizer page, private events require a direct link, unlisted events are accessible via link but hidden from listings."
            >
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
              <Radio value="unlisted">Unlisted</Radio>
            </Radio.Group>
            <TextArea
              label="Internal Notes"
              description="Only visible to your team. Use this for logistics, reminders, or coordination notes."
              rows={3}
            />
          </Stack>
        </Panel.CollapsibleContent>
      </Panel.Collapsible>
    </Panel>
  );
};
