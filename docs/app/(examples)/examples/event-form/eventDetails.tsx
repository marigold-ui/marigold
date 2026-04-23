'use client';

import {
  DatePicker,
  Inline,
  Panel,
  Radio,
  Select,
  Stack,
  Text,
  TextArea,
  TextField,
} from '@marigold/components';

export const EventDetails = () => (
  <Panel headingLevel={3} size="form">
    <Panel.Header>
      <Panel.Title>Event details</Panel.Title>
      <Panel.Description>
        Information shown on the event page, confirmations, and tickets. Some
        fields are pre-filled from your organization settings.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <TextField
          label="Event Name"
          defaultValue="Riverside "
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
            description="When the event begins. Displayed on tickets and the event page."
            width="fit"
            required
            errorMessage="A start date is required."
          />
          <DatePicker
            label="End Date"
            description="Optional. Leave empty for single-day events."
            width="fit"
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
          <Select.Option id="conference" textValue="Conference">
            <Text slot="label">Conference</Text>
            <Text slot="description" fontSize="xs">
              Multi-track sessions with speakers and schedules
            </Text>
          </Select.Option>
          <Select.Option id="workshop" textValue="Workshop">
            <Text slot="label">Workshop</Text>
            <Text slot="description" fontSize="xs">
              Hands-on, limited capacity with registration
            </Text>
          </Select.Option>
          <Select.Option id="meetup" textValue="Meetup">
            <Text slot="label">Meetup</Text>
            <Text slot="description" fontSize="xs">
              Casual gathering, free or low-cost entry
            </Text>
          </Select.Option>
          <Select.Option id="festival" textValue="Festival">
            <Text slot="label">Festival</Text>
            <Text slot="description" fontSize="xs">
              Multi-day event with multiple stages and vendors
            </Text>
          </Select.Option>
          <Select.Option id="concert" textValue="Concert">
            <Text slot="label">Concert</Text>
            <Text slot="description" fontSize="xs">
              Single performance with seated or standing tickets
            </Text>
          </Select.Option>
        </Select>
      </Stack>
    </Panel.Content>
    <Panel.Collapsible>
      <Panel.CollapsibleHeader>
        <Panel.CollapsibleTitle>Additional details</Panel.CollapsibleTitle>
        <Panel.CollapsibleDescription>
          Optional fields for visibility, internal tracking, and organizer
          notes.
        </Panel.CollapsibleDescription>
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
