import { Button, Dialog, Inline, Stack, TextField } from '@marigold/components';

export default () => (
  <Inline space={5} alignY="center" alignX="center">
    <Dialog.Trigger>
      <Button variant="primary">Change password</Button>
      <Dialog size="xsmall">
        <Dialog.Title>Change Password</Dialog.Title>
        <Dialog.Content>
          <Stack space={3}>
            <TextField label="Old password" type="password" autoFocus />
            <TextField label="New password" type="password" />
          </Stack>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="ghost" slot="close">
            Cancel
          </Button>
          <Button variant="secondary">Save and exit</Button>
          <Button variant="primary">Update</Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
    <Button variant="secondary">Save and exit</Button>
    <Button variant="ghost">Cancel</Button>
  </Inline>
);
