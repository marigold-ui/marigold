'use client';

import {
  Badge,
  Card,
  Checkbox,
  Inset,
  Link,
  NumberField,
  Panel,
  Stack,
  TextField,
} from '@marigold/components';

export const RegistrationSettings = () => (
  <Panel size="form">
    <Panel.Title>Registration Settings</Panel.Title>
    <Panel.Content>
      <Stack space="regular">
        <Checkbox label="Require registration approval" />
        <Checkbox label="Send confirmation emails" />
        <TextField
          label="Contact Email"
          description="Email for event inquiries"
          type="email"
        />

        <Inset spaceY={12}>
          <Stack space="regular">
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
                Enable early bird pricing <Badge variant="master">Master</Badge>
              </>
            }
          />
        </Card>
      </Stack>
    </Panel.Content>
  </Panel>
);
