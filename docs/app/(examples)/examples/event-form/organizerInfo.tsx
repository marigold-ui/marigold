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
        from your organization profile.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <Inline space="related" noWrap>
          <TextField
            label="First Name"
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
        <TextField label="Organization" defaultValue="Riverside Events GmbH" />
        <TextField label="Job Title" width={64} />
        <Inline space="related" noWrap>
          <TextField
            label="Email"
            type="email"
            defaultValue="info@riverside-events.de"
            width="1/2"
            required
            errorMessage="A valid email address is required."
          />
          <TextField
            label="Phone"
            type="tel"
            defaultValue="+49 761 555 0800"
            width="1/2"
          />
        </Inline>
        <TextArea
          label="Bio"
          defaultValue="Riverside Events produces conferences, workshops, and festivals across the DACH region since 2011."
          description="Shown on the event page if the profile is public."
          rows={3}
        />
        <Switch label="Display organizer profile on event page" />
      </Stack>
    </Panel.Content>
    <Panel.Collapsible>
      <Panel.CollapsibleHeader>
        <Panel.CollapsibleTitle>Contact preferences</Panel.CollapsibleTitle>
      </Panel.CollapsibleHeader>
      <Panel.CollapsibleContent>
        <Stack space="regular">
          <Switch label="Allow attendees to contact organizer directly" />
          <Switch label="Include organizer contact in confirmation emails" />
          <Select
            label={
              <Inline space={2} alignY="center">
                Preferred contact method
                <Badge variant="admin">Admin</Badge>
              </Inline>
            }
            placeholder="Select preference"
            width={56}
          >
            <Select.Option id="email">Email</Select.Option>
            <Select.Option id="phone">Phone</Select.Option>
            <Select.Option id="both">Both Email and Phone</Select.Option>
          </Select>
          <TextField
            label="Alternative Contact"
            description="Backup person or method if the organizer is unavailable."
          />
        </Stack>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
);
