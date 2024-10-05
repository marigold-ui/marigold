import {
  Button,
  Center,
  Checkbox,
  Dialog,
  Headline,
  Inline,
  Stack,
} from '@marigold/components';

export default () => (
  <Center>
    <Dialog.Trigger>
      <Button variant="primary">Open notification settings</Button>
      <Dialog closeButton>
        {({ close }) => (
          <>
            <Headline id="dialog-headline" level={2}>
              Notification settings
            </Headline>
            <Stack space={4}>
              <Checkbox.Group aria-labelledby="dialog-headline">
                <Checkbox value="newsletter" defaultChecked>
                  Email Newsletter
                </Checkbox>
                <Checkbox value="reminder">Event Reminders</Checkbox>
                <Checkbox value="promo">Promo Notifications</Checkbox>
              </Checkbox.Group>
              <Inline space={4}>
                <Button variant="primary" onPress={close}>
                  Update
                </Button>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
              </Inline>
            </Stack>
          </>
        )}
      </Dialog>
    </Dialog.Trigger>
  </Center>
);
