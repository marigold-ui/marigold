'use client';

import {
  Badge,
  Card,
  Checkbox,
  Headline,
  Inline,
  Link,
  NumberField,
  Select,
  Stack,
  Switch,
  Text,
  TextField,
} from '@marigold/components';

export const RegistrationSettings = () => (
  <Card p={4}>
    <Stack space="regular" stretch>
      <Stack space="tight">
        <Headline level={3}>Registration settings</Headline>
        <Text>
          Approval rules, confirmation emails, and pricing for this event.
        </Text>
      </Stack>
      <Stack space="group">
        <Stack space="regular">
          <Switch label="Require registration approval" />
          <Switch label="Send confirmation emails" defaultSelected />
          <Switch label="Enable waitlist" />
          <TextField
            label="Contact Email"
            type="email"
            description="Shown on the registration page for inquiries."
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
            <Select label="Currency" defaultValue="eur" width="fit">
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
          <Stack space={1}>
            <TextField type="file" label="Registration Document" />
            <Link href="#" size="small">
              View uploaded PDF
            </Link>
          </Stack>
          <TextField
            label="Terms & Conditions URL"
            type="url"
            description="Attendees must accept these before completing registration."
          />
        </Stack>
      </Stack>
    </Stack>
  </Card>
);
