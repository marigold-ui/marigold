'use client';

import {
  Button,
  Form,
  NumberField,
  Panel,
  Select,
  Stack,
  Switch,
  TextField,
  useToast,
} from '@marigold/components';

export const RegistrationCapacity = () => {
  const { addToast } = useToast();

  return (
    <Panel size="form" headingLevel={3}>
      <Panel.Header>
        <Panel.Title>Registration & capacity</Panel.Title>
        <Panel.Description>
          Default registration behavior, pricing, and attendee limits for new
          events.
        </Panel.Description>
      </Panel.Header>
      <Panel.Content>
        <Form
          id="registration-capacity"
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
            <NumberField
              label="Default Maximum Attendees"
              defaultValue={500}
              minValue={1}
              width={32}
            />
            <Select label="Default Currency" defaultValue="eur" width={24}>
              <Select.Option id="eur">EUR</Select.Option>
              <Select.Option id="usd">USD</Select.Option>
              <Select.Option id="chf">CHF</Select.Option>
              <Select.Option id="gbp">GBP</Select.Option>
            </Select>
            <Switch
              label="Enable waitlist by default"
              description="Automatically adds a waitlist when an event reaches capacity. Attendees who join the waitlist are notified in order as spots become available."
            />
            <Switch
              label="Require registration approval"
              description="Each registration must be manually approved by an organizer before the attendee receives a confirmation. Use this for invite-only events or when you need to verify attendee eligibility."
            />
            <Switch
              defaultSelected
              label="Send confirmation emails automatically"
              description="Sends a booking confirmation to attendees immediately after registration. When disabled, confirmations must be triggered manually from the attendee list."
            />
            <TextField
              label="Confirmation Reply-To"
              type="email"
              defaultValue="tickets@riverside-events.de"
              description="Attendees can reply to confirmation emails at this address."
              width={80}
            />
          </Stack>
        </Form>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Panel.CollapsibleTitle>Advanced registration</Panel.CollapsibleTitle>
          <Panel.CollapsibleDescription>
            Booking windows, terms of service, and custom messages.
          </Panel.CollapsibleDescription>
        </Panel.CollapsibleHeader>
        <Panel.CollapsibleContent>
          <Stack space="regular">
            <TextField
              label="Custom Confirmation Message"
              description="Shown on the confirmation page after a successful registration."
            />
            <NumberField
              label="Registration Close (hours before start)"
              defaultValue={2}
              minValue={0}
              description="Stop accepting registrations this many hours before the event begins."
              width={32}
            />
            <NumberField
              label="Cancellation Deadline (days before start)"
              defaultValue={7}
              minValue={0}
              description="Attendees can cancel without penalty up to this many days before the event."
              width={32}
            />
            <TextField
              label="Terms & Conditions URL"
              type="url"
              defaultValue="https://riverside-events.de/agb"
              description="Attendees must accept these before completing registration."
            />
          </Stack>
        </Panel.CollapsibleContent>
      </Panel.Collapsible>
      <Panel.Footer>
        <Button variant="primary" type="submit" form="registration-capacity">
          Save changes
        </Button>
      </Panel.Footer>
    </Panel>
  );
};
