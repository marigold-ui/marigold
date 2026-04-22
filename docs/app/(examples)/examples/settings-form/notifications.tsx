'use client';

import {
  Button,
  Checkbox,
  Form,
  Panel,
  Select,
  Stack,
  Switch,
  useToast,
} from '@marigold/components';

export const Notifications = () => {
  const { addToast } = useToast();

  return (
    <Panel size="form" headingLevel={3}>
      <Panel.Header>
        <Panel.Title>Notifications</Panel.Title>
        <Panel.Description>
          Configure when and how you receive notifications.
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
              width={40}
            >
              <Select.Option id="immediately">Immediately</Select.Option>
              <Select.Option id="daily">Daily</Select.Option>
              <Select.Option id="weekly">Weekly</Select.Option>
            </Select>
            <Checkbox.Group
              label="Notify me about"
              defaultValue={['registrations', 'payments']}
            >
              <Checkbox value="registrations" label="New registrations" />
              <Checkbox value="cancellations" label="Cancellations" />
              <Checkbox value="waitlist" label="Waitlist changes" />
              <Checkbox value="payments" label="Payment received" />
            </Checkbox.Group>
            <Switch label="Pause all notifications" />
          </Stack>
        </Form>
      </Panel.Content>
      <Panel.Footer>
        <Button variant="primary" type="submit" form="notifications">
          Save changes
        </Button>
      </Panel.Footer>
    </Panel>
  );
};
