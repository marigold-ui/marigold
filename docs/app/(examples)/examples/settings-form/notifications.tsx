'use client';

import {
  Button,
  Card,
  Checkbox,
  Form,
  Headline,
  Select,
  Stack,
  Switch,
  Text,
  useToast,
} from '@marigold/components';

export const Notifications = () => {
  const { addToast } = useToast();

  return (
    <Card p={4}>
      <Form
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
          <Stack space="tight">
            <Headline level={3}>Notifications</Headline>
            <Text>Configure when and how you receive notifications.</Text>
          </Stack>
          <Stack space="regular">
            <Select label="Email Digest Frequency" defaultValue="daily">
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
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Stack>
      </Form>
    </Card>
  );
};
