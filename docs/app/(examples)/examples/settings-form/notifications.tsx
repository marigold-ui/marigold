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
  Text,
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
          Choose which event activity triggers an email and how often updates
          are delivered. These defaults apply to all events unless overridden on
          an individual event.
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
              label="Delivery frequency"
              defaultValue="daily"
              description="Controls how non-urgent notifications are batched. Urgent alerts like failed payments are always sent immediately."
              width={64}
            >
              <Select.Option id="realtime" textValue="Immediately">
                <Text slot="label">Immediately</Text>
                <Text slot="description" fontSize="xs">
                  One email per event, sent as it happens
                </Text>
              </Select.Option>
              <Select.Option id="daily" textValue="Daily digest">
                <Text slot="label">Daily digest</Text>
                <Text slot="description" fontSize="xs">
                  All activity bundled into one morning email
                </Text>
              </Select.Option>
              <Select.Option id="weekly" textValue="Weekly digest">
                <Text slot="label">Weekly digest</Text>
                <Text slot="description" fontSize="xs">
                  A single summary sent every Monday
                </Text>
              </Select.Option>
            </Select>
            <Checkbox.Group
              label="Notify me about"
              defaultValue={['registrations', 'payments', 'capacity']}
            >
              <Checkbox
                value="registrations"
                label="New registrations"
                description="Sent each time an attendee completes a booking for one of your events."
              />
              <Checkbox
                value="cancellations"
                label="Cancellations and refunds"
                description="Triggered when an attendee cancels or a refund is issued, including the refunded amount."
              />
              <Checkbox
                value="waitlist"
                label="Waitlist movement"
                description="Notifies you when someone joins the waitlist or is automatically promoted to a confirmed spot."
              />
              <Checkbox
                value="payments"
                label="Payments received"
                description="Confirmation when a ticket payment clears. Includes amount, payment method, and order ID."
              />
              <Checkbox
                value="capacity"
                label="Capacity warnings"
                description="Alerts when an event reaches 90% capacity so you can decide whether to extend the limit or open a waitlist."
              />
              <Checkbox
                value="reviews"
                label="Attendee feedback"
                description="Sent when an attendee submits a rating or review after the event ends."
              />
            </Checkbox.Group>
            <TextField
              label="CC recipient"
              type="email"
              description="Send a copy of every notification to this address, e.g. a shared team inbox like events@riverside-events.de."
              width={80}
            />
            <Switch
              variant="settings"
              label="Pause all notifications"
              description="Temporarily stops all event notification emails. Useful during initial setup or bulk imports. Activity that occurs while paused is not queued and will not be sent retroactively."
            />
          </Stack>
        </Form>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Panel.CollapsibleTitle>Quiet hours</Panel.CollapsibleTitle>
          <Panel.CollapsibleDescription>
            Hold non-urgent digests during off-hours. Capacity warnings and
            payment failures are still delivered immediately.
          </Panel.CollapsibleDescription>
        </Panel.CollapsibleHeader>
        <Panel.CollapsibleContent>
          <Stack space="regular">
            <Switch
              variant="settings"
              label="Enable quiet hours"
              defaultSelected
              description="When active, digest emails are held until the quiet window ends and delivered as a single summary."
            />
            <Inline space="related">
              <Select
                label="From"
                defaultValue="22"
                width={24}
                description="Quiet window start."
              >
                <Select.Option id="20">20:00</Select.Option>
                <Select.Option id="21">21:00</Select.Option>
                <Select.Option id="22">22:00</Select.Option>
                <Select.Option id="23">23:00</Select.Option>
              </Select>
              <Select
                label="To"
                defaultValue="8"
                width={24}
                description="Quiet window end."
              >
                <Select.Option id="6">06:00</Select.Option>
                <Select.Option id="7">07:00</Select.Option>
                <Select.Option id="8">08:00</Select.Option>
                <Select.Option id="9">09:00</Select.Option>
              </Select>
            </Inline>
            <NumberField
              label="Urgent event threshold"
              defaultValue={50}
              minValue={1}
              description="Events with more registrations than this are considered high-traffic. Their capacity warnings and payment alerts bypass quiet hours."
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
