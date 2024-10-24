import { Button, Dialog, Stack, TextField } from '@marigold/components';

export default () => (
  <Dialog.Trigger>
    <Button variant="primary">Login</Button>
    <Dialog>
      {({ close }) => (
        <>
          <Dialog.Title level={2}>Please log into account</Dialog.Title>
          <Dialog.Content>
            <Stack space={3}>
              <TextField label="Username" autoFocus />
              <TextField label="Password" type="password" />
            </Stack>
          </Dialog.Content>
          <Dialog.Actions>
            <Button variant="ghost" onPress={close}>
              Cancel
            </Button>
            <Button variant="primary">Login</Button>
          </Dialog.Actions>
        </>
      )}
    </Dialog>
  </Dialog.Trigger>
);
