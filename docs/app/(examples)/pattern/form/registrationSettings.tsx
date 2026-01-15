'use client';

import {
  Accordion,
  Badge,
  Card,
  Checkbox,
  Headline,
  Inset,
  Link,
  NumberField,
  Stack,
  TextField,
} from '@marigold/components';

export const RegistrationSettings = () => (
  <Accordion variant="card">
    <Accordion.Item id="registration-settings">
      <Accordion.Header>
        <Headline level={3}>Registration Settings</Headline>
      </Accordion.Header>
      <Accordion.Content>
        <Stack space="fieldY">
          <Checkbox label="Require registration approval" />
          <Checkbox label="Send confirmation emails" />
          <TextField
            label="Contact Email"
            description="Email for event inquiries"
            type="email"
          />

          <Inset spaceY="group">
            <Stack space="group">
              <Checkbox label="Enable waitlist" />
              <Checkbox label="Limit registrations to specific domains" />
              <TextField
                label="Custom Registration Form URL"
                description="Link to an external registration form"
                type="url"
              />
            </Stack>
          </Inset>
          <Stack space={1}>
            <TextField type="file" label="Upload Registration Document" />
            <Link href="#" size="small">
              View PDF
            </Link>
          </Stack>
          <NumberField
            label="Registration Fee"
            description="Enter amount (leave empty if free)"
            hideStepper
            width={32}
          />
          <Card variant="master">
            <Checkbox
              label={
                <>
                  Enable early bird pricing{' '}
                  <Badge variant="master">Master</Badge>
                </>
              }
            />
          </Card>
        </Stack>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);
