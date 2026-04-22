'use client';

import {
  Button,
  Form,
  Inline,
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
          Default registration behavior for new events.
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
            <Inline space="related">
              <NumberField
                label="Default Maximum Attendees"
                defaultValue={500}
                minValue={1}
                width={32}
                errorMessage="Must be at least 1 attendee."
              />
              <Select label="Default Currency" defaultValue="eur" width={24}>
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
        </Form>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Panel.CollapsibleTitle>Advanced registration</Panel.CollapsibleTitle>
        </Panel.CollapsibleHeader>
        <Panel.CollapsibleContent>
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
              width={32}
            />
            <TextField
              label="Terms & Conditions URL"
              type="url"
              description="Link shown during checkout."
              errorMessage="Please enter a valid URL."
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
