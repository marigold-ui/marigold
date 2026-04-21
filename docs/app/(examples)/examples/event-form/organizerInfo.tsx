'use client';

import {
  Accordion,
  Badge,
  Card,
  Headline,
  Inline,
  Select,
  Stack,
  Switch,
  Text,
  TextArea,
  TextField,
} from '@marigold/components';

export const OrganizerInfo = () => (
  <Card p={4} stretch>
    <Stack space="regular">
      <Stack space="tight">
        <Headline level={3}>Organizer information</Headline>
        <Text>Contact details for the person or team running this event.</Text>
      </Stack>
      <Stack space="regular">
        <Inline space="related" noWrap>
          <TextField label="First Name" width="1/2" required />
          <TextField label="Last Name" width="1/2" required />
        </Inline>
        <TextField label="Organization" />
        <TextField label="Job Title" />
        <Inline space="related" noWrap>
          <TextField label="Email" type="email" width="1/2" required />
          <TextField label="Phone" type="tel" width="1/2" />
        </Inline>
        <TextArea
          label="Bio"
          description="Shown on the event page if the profile is public."
          rows={3}
        />
        <Switch label="Display organizer profile on event page" />
      </Stack>
      <Accordion>
        <Accordion.Item id="contact-preferences">
          <Accordion.Header>Contact preferences</Accordion.Header>
          <Accordion.Content>
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
                width="fit"
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
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Stack>
  </Card>
);
