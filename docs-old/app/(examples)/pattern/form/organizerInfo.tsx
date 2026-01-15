'use client';

import {
  Accordion,
  Badge,
  Button,
  Card,
  Checkbox,
  Headline,
  Inline,
  Select,
  Stack,
  TextArea,
  TextField,
} from '@marigold/components';

export const OrganizerInfo = () => (
  <Accordion variant="card">
    <Accordion.Item id="organizer-details">
      <Accordion.Header>
        <Headline level={3}>Organizer Information</Headline>
      </Accordion.Header>
      <Accordion.Content>
        <Stack space="fieldY">
          <Inline space="fieldX" noWrap>
            <TextField label="First Name" width={'1/2'} />
            <TextField label="Last Name" width={'1/2'} />
          </Inline>
          <TextField
            label="Organization"
            description="Company or organization name"
          />
          <TextField
            label="Job Title"
            description="Position within the organization"
          />
          <Inline space="fieldX" noWrap>
            <TextField
              label="Email"
              type="email"
              width={'1/2'}
              description="Primary contact email"
            />
            <TextField
              label="Phone"
              type="tel"
              width={'1/2'}
              description="Contact phone number"
            />
          </Inline>
          <TextArea
            label="Bio"
            description="Brief biography or description of the organizer"
            rows={3}
          />
          <Checkbox label="Display organizer information publicly" />
          <Card variant="master">
            <Stack space="fieldY" alignX="left">
              <Inline space={2}>
                <Headline level={3}>Co-Organizer</Headline>
                <Badge variant="master">Master</Badge>
              </Inline>
              <Checkbox label="This event has co-organizers" />
              <TextField label="Name" />
              <TextField label="Email" type="email" />
              <TextField
                label="Role"
                description="Their role in organizing this event"
              />
              <Button variant="secondary">Add another co-organizer</Button>
            </Stack>
          </Card>
          <Stack space="fieldY">
            <Headline level={3}>Contact Preferences</Headline>
            <Checkbox label="Allow attendees to contact organizer directly" />
            <Checkbox label="Include organizer contact in confirmation emails" />
            <Card variant="admin">
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
            </Card>
            <TextField
              label="Alternative Contact"
              description="Optional alternative contact person or method"
            />
          </Stack>
        </Stack>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);
