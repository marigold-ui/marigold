'use client';

import {
  Accordion,
  Button,
  Card,
  Form,
  Headline,
  Inline,
  NumberField,
  Select,
  Stack,
  Switch,
  Text,
  TextField,
  useToast,
} from '@marigold/components';

export const RegistrationCapacity = () => {
  const { addToast } = useToast();

  return (
    <Card p={4}>
      <Form
        onSubmit={e => {
          e.preventDefault();
          addToast({
            title: 'Settings saved',
            description: 'Registration & capacity updated.',
            variant: 'success',
            timeout: 5000,
          });
        }}
      >
        <Stack space="regular">
          <Stack space="tight">
            <Headline level={3}>Registration & capacity</Headline>
            <Text>Default registration behavior for new events.</Text>
          </Stack>
          <Stack space="regular">
            <Inline space="related">
              <NumberField
                label="Default Maximum Attendees"
                defaultValue={500}
                minValue={1}
                width={32}
                errorMessage="Must be at least 1 attendee."
              />
              <Select label="Default Currency" defaultValue="eur" width="fit">
                <Select.Option id="eur">EUR</Select.Option>
                <Select.Option id="usd">USD</Select.Option>
                <Select.Option id="chf">CHF</Select.Option>
                <Select.Option id="gbp">GBP</Select.Option>
              </Select>
            </Inline>
            <Switch label="Enable waitlist by default" />
            <Switch label="Require registration approval" />
            <Switch
              defaultSelected
              label="Send confirmation emails automatically"
            />
          </Stack>
          <Accordion>
            <Accordion.Item id="advanced-registration">
              <Accordion.Header>Advanced registration</Accordion.Header>
              <Accordion.Content>
                <Stack space="regular">
                  <TextField
                    label="Custom Confirmation Message"
                    description="Shown on the confirmation page after registration."
                  />
                  <NumberField
                    label="Registration Close (hours before start)"
                    defaultValue={2}
                    minValue={0}
                    description="Stop accepting registrations this many hours before the event."
                    errorMessage="Value cannot be negative."
                  />
                  <TextField
                    label="Terms & Conditions URL"
                    type="url"
                    description="Link shown during checkout."
                    errorMessage="Please enter a valid URL."
                  />
                </Stack>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Stack>
      </Form>
    </Card>
  );
};
