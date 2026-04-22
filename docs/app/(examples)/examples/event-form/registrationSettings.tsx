'use client';

import {
  Badge,
  Checkbox,
  FileField,
  Headline,
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
      <Panel.Title>Registration settings</Panel.Title>
      <Panel.Description>
        Approval rules, confirmation emails, and pricing for this event.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="group">
        <Stack space="regular">
          <Switch label="Require registration approval" />
          <Switch label="Send confirmation emails" defaultSelected />
          <Switch label="Enable waitlist" />
          <TextField
            label="Contact Email"
            type="email"
            description="Shown on the registration page for inquiries."
            errorMessage="Please enter a valid email address."
            width={80}
          />
        </Stack>
        <Stack space="regular">
          <Headline level={4}>Pricing</Headline>
          <Inline space="related">
            <NumberField
              label="Registration Fee"
              description="Leave empty if free."
              hideStepper
              width={32}
            />
            <Select label="Currency" defaultValue="eur" width={24}>
              <Select.Option id="eur">EUR</Select.Option>
              <Select.Option id="usd">USD</Select.Option>
              <Select.Option id="chf">CHF</Select.Option>
              <Select.Option id="gbp">GBP</Select.Option>
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
        </Stack>
        <Stack space="regular">
          <Headline level={4}>Documents</Headline>
          <Stack space="tight">
            <FileField label="Registration Document" accept={['.pdf']} />
            <Link href="#" size="small">
              View uploaded PDF
            </Link>
          </Stack>
          <TextField
            label="Terms & Conditions URL"
            type="url"
            description="Attendees must accept these before completing registration."
            errorMessage="Please enter a valid URL (e.g. https://example.com/terms)."
          />
        </Stack>
      </Stack>
    </Panel.Content>
  </Panel>
);
