'use client';

import {
  Button,
  Checkbox,
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

export const Notifications = () => {
  const { addToast } = useToast();

  return (
    <Panel size="form" headingLevel={3}>
      <Panel.Header>
        <Panel.Title>Notifications</Panel.Title>
        <Panel.Description>
          Choose which updates you receive and how they are delivered.
        </Panel.Description>
      </Panel.Header>
      <Panel.Content>
        <Form
          id="notifications"
          onSubmit={e => {
            e.preventDefault();
            addToast({
              title: 'Settings saved',
              description: 'Notification preferences updated.',
              variant: 'success',
              timeout: 5000,
            });
          }}
        >
          <Stack space="regular">
            <Select
              label="Email Digest Frequency"
              defaultValue="daily"
              description="Bundles multiple notifications into a single email."
              width={40}
            >
              <Select.Option id="realtime">Immediately</Select.Option>
              <Select.Option id="daily">Daily summary</Select.Option>
              <Select.Option id="weekly">Weekly summary</Select.Option>
            </Select>
            <Checkbox.Group
              label="Notify me about"
              defaultValue={['registrations', 'payments', 'capacity']}
            >
              <Checkbox value="registrations" label="New registrations" />
              <Checkbox
                value="cancellations"
                label="Cancellations and refunds"
              />
              <Checkbox value="waitlist" label="Waitlist changes" />
              <Checkbox value="payments" label="Payments received" />
              <Checkbox
                value="capacity"
                label="Event reaching capacity (90%)"
              />
              <Checkbox value="reviews" label="Attendee feedback and reviews" />
            </Checkbox.Group>
            <TextField
              label="Additional Recipients"
              type="email"
              description="Send a copy of all notifications to this address, e.g. a shared team inbox."
              width={80}
            />
            <Switch
              variant="settings"
              label="Pause all notifications"
              description="Temporarily stops all email notifications. Useful during setup or maintenance. Notifications generated while paused are silently discarded and will not be sent retroactively."
            />
          </Stack>
        </Form>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Panel.CollapsibleTitle>Quiet hours</Panel.CollapsibleTitle>
          <Panel.CollapsibleDescription>
            Suppress non-urgent notifications during specific hours.
          </Panel.CollapsibleDescription>
        </Panel.CollapsibleHeader>
        <Panel.CollapsibleContent>
          <Stack space="regular">
            <Switch
              variant="settings"
              label="Enable quiet hours"
              defaultSelected
            />
            <Inline space="related">
              <Select label="From" defaultValue="22" width={24}>
                <Select.Option id="20">20:00</Select.Option>
                <Select.Option id="21">21:00</Select.Option>
                <Select.Option id="22">22:00</Select.Option>
                <Select.Option id="23">23:00</Select.Option>
              </Select>
              <Select label="To" defaultValue="8" width={24}>
                <Select.Option id="6">06:00</Select.Option>
                <Select.Option id="7">07:00</Select.Option>
                <Select.Option id="8">08:00</Select.Option>
                <Select.Option id="9">09:00</Select.Option>
              </Select>
            </Inline>
            <NumberField
              label="Urgent threshold"
              defaultValue={50}
              minValue={1}
              description="Notifications about events with more registrations than this still come through during quiet hours."
              width={32}
            />
          </Stack>
        </Panel.CollapsibleContent>
      </Panel.Collapsible>
      <Panel.Footer>
        <Button variant="primary" type="submit" form="notifications">
          Save changes
        </Button>
      </Panel.Footer>
    </Panel>
  );
};
