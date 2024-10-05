import {
  Button,
  Center,
  Checkbox,
  Dialog,
  Header,
  Stack,
} from '@marigold/components';

export default () => (
  <Center>
    <Dialog.Trigger>
      <Button variant="primary">Open notification settings</Button>
      <Dialog closeButton>
        <Header>Notification settings</Header>
        <Stack space={4}>
          <Checkbox>Email Notifications</Checkbox>
          <Checkbox>Event Reminders</Checkbox>
          <Checkbox>Promotional Notifications</Checkbox>
        </Stack>
      </Dialog>
    </Dialog.Trigger>
  </Center>
);
