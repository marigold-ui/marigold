'use client';

import {
  Badge,
  Inline,
  Panel,
  Select,
  Stack,
  Switch,
  TextArea,
  TextField,
} from '@marigold/components';

export const OrganizerInfo = () => (
  <Panel headingLevel={3} size="form">
    <Panel.Header>
      <Panel.Title>Organizer information</Panel.Title>
      <Panel.Description>
        Contact details for the person or team running this event. Pre-filled
        from your organization profile. Changes here only apply to this event.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <Inline space="related" noWrap>
          <TextField
            label="First Name"
            description="The primary contact for this event."
            width="1/2"
            required
            errorMessage="First name is required."
          />
          <TextField
            label="Last Name"
            width="1/2"
            required
            errorMessage="Last name is required."
          />
        </Inline>
        <TextField
          label="Organization"
          defaultValue="Riverside Events GmbH"
          description="Shown on the event page and tickets. Usually your company name."
        />
        <TextField
          label="Job Title"
          description="Displayed alongside the organizer name, e.g. 'Event Manager' or 'Head of Conferences'."
          width={64}
        />
        <Inline space="related" noWrap>
          <TextField
            label="Email"
            type="email"
            defaultValue="info@riverside-events.de"
            description="Used for attendee inquiries and order-related communication."
            width="1/2"
            required
            errorMessage="A valid email address is required."
          />
          <TextField
            label="Phone"
            type="tel"
            defaultValue="+49 761 555 0800"
            description="Optional. Shown on the event page for urgent questions."
            width="1/2"
          />
        </Inline>
        <TextArea
          label="Bio"
          defaultValue="Riverside Events produces conferences, workshops, and festivals across the DACH region since 2011."
          description="Shown on the event page if the organizer profile is public. Keep it short and relevant to attendees."
          rows={3}
        />
        <Switch
          label="Display organizer profile on event page"
          description="Shows the organizer name, bio, and contact details on the public event page."
        />
      </Stack>
    </Panel.Content>
    <Panel.Collapsible>
      <Panel.CollapsibleHeader>
        <Panel.CollapsibleTitle>Contact preferences</Panel.CollapsibleTitle>
        <Panel.CollapsibleDescription>
          Control how attendees can reach the organizer and what contact details
          appear in emails.
        </Panel.CollapsibleDescription>
      </Panel.CollapsibleHeader>
      <Panel.CollapsibleContent>
        <Stack space="regular">
          <Switch
            variant="settings"
            label="Allow attendees to contact organizer directly"
            description="Adds a 'Contact organizer' button to the event page. Messages are sent to the organizer email above."
          />
          <Switch
            variant="settings"
            label="Include organizer contact in confirmation emails"
            description="Adds the organizer name, email, and phone to every booking confirmation."
          />
          <Select
            label={
              <Inline space="related" alignY="center">
                Preferred contact method
                <Badge variant="admin">Admin</Badge>
              </Inline>
            }
            placeholder="Select preference"
            description="Controls which channel attendees see first when reaching out."
            width={56}
          >
            <Select.Option id="email">Email</Select.Option>
            <Select.Option id="phone">Phone</Select.Option>
            <Select.Option id="both">Both Email and Phone</Select.Option>
          </Select>
          <TextField
            label="Alternative Contact"
            description="Backup person or phone number if the primary organizer is unavailable, e.g. a day-of coordinator."
          />
        </Stack>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
);
