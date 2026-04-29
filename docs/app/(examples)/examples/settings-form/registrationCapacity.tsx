'use client';

import {
  Button,
  Checkbox,
  Form,
  NumberField,
  Panel,
  Stack,
  TextField,
  useToast,
} from '@marigold/components';

export const RegistrationCapacity = () => {
  const { addToast } = useToast();

  return (
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
      <Panel size="form" headingLevel={3}>
        <Panel.Header>
          <Panel.Title>Registration & capacity</Panel.Title>
          <Panel.Description>
            Default registration behavior and attendee limits for new events.
          </Panel.Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <NumberField
              label="Default Maximum Attendees"
              defaultValue={500}
              minValue={1}
              description="When this limit is reached, new registrations are blocked unless a waitlist is enabled."
              width={32}
            />
            <Checkbox
              label="Enable waitlist by default"
              description="Automatically adds a waitlist when an event reaches capacity. Attendees who join the waitlist are notified in order as spots become available."
            />
            <Checkbox
              label="Require registration approval"
              description="Each registration must be manually approved by an organizer before the attendee receives a confirmation. Use this for invite-only events or when you need to verify attendee eligibility."
            />
            <Checkbox
              defaultChecked
              label="Send confirmation emails automatically"
              description="Sends a booking confirmation to attendees immediately after registration. When disabled, confirmations must be triggered manually from the attendee list."
            />
          </Stack>
        </Panel.Content>
        <Panel.Collapsible>
          <Panel.CollapsibleHeader>
            <Panel.CollapsibleTitle>Booking policies</Panel.CollapsibleTitle>
            <Panel.CollapsibleDescription>
              Registration windows, cancellation rules, and legal requirements.
            </Panel.CollapsibleDescription>
          </Panel.CollapsibleHeader>
          <Panel.CollapsibleContent>
            <Stack space="regular">
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
              <TextField
                label="Custom Confirmation Message"
                description="Shown on the confirmation page after a successful registration."
              />
            </Stack>
          </Panel.CollapsibleContent>
        </Panel.Collapsible>
        <Panel.Footer>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Panel.Footer>
      </Panel>
    </Form>
  );
};
