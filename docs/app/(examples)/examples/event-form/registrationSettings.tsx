'use client';

import {
  Badge,
  Checkbox,
  FileField,
  Inline,
  Link,
  NumberField,
  Panel,
  Select,
  Stack,
  Switch,
  TextField,
} from '@marigold/components';

export const RegistrationSettings = () => (
  <Panel headingLevel={3} size="form">
    <Panel.Header>
      <Panel.Title>Pricing & tickets</Panel.Title>
      <Panel.Description>
        Set the ticket price, upload documents, and attach legal terms for this
        event.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <Inline space="related">
          <NumberField
            label="Ticket price"
            description="Leave empty for free events."
            hideStepper
            width={32}
          />
          <Select label="Currency" defaultValue="EUR" width={24}>
            <Select.Option id="EUR">EUR</Select.Option>
            <Select.Option id="CHF">CHF</Select.Option>
            <Select.Option id="GBP">GBP</Select.Option>
            <Select.Option id="USD">USD</Select.Option>
          </Select>
        </Inline>
        <Checkbox
          label={
            <Inline space={2} alignY="center">
              Enable early bird pricing
              <Badge variant="master">Master</Badge>
            </Inline>
          }
        />
        <Stack space="tight">
          <FileField label="Registration document" accept={['.pdf']} />
          <Link href="#" size="small">
            View uploaded PDF
          </Link>
        </Stack>
        <TextField
          label="Terms & Conditions URL"
          type="url"
          defaultValue="https://riverside-events.de/agb"
          description="Pre-filled from your event settings. Override it if this event needs different terms."
          errorMessage="Please enter a valid URL (e.g. https://example.com/terms)."
        />
      </Stack>
    </Panel.Content>
    <Panel.Collapsible>
      <Panel.CollapsibleHeader>
        <Panel.CollapsibleTitle>
          Override registration defaults
        </Panel.CollapsibleTitle>
        <Panel.CollapsibleDescription>
          These are inherited from your event settings. Only change them if this
          event needs different behavior.
        </Panel.CollapsibleDescription>
      </Panel.CollapsibleHeader>
      <Panel.CollapsibleContent>
        <Stack space="regular">
          <Switch
            variant="settings"
            label="Require registration approval"
            description="Each registration must be manually approved before the attendee is confirmed."
          />
          <Switch
            variant="settings"
            label="Send confirmation emails"
            defaultSelected
            description="Emails attendees immediately after registration."
          />
          <Switch
            variant="settings"
            label="Enable waitlist"
            description="Accepts sign-ups beyond capacity and notifies in order as spots open."
          />
          <TextField
            label="Contact email"
            type="email"
            defaultValue="info@riverside-events.de"
            description="Shown on the registration page for inquiries."
            errorMessage="Please enter a valid email address."
            width={80}
          />
        </Stack>
      </Panel.CollapsibleContent>
    </Panel.Collapsible>
  </Panel>
);
