'use client';

import { Button, Dialog, Stack, Text, TextField } from '@marigold/components';
import { User } from '@marigold/icons';

export default () => (
  <Dialog.Trigger>
    <Button variant="primary">
      <User /> Edit
    </Button>
    <Dialog size="xsmall">
      <Dialog.Title>Edit User</Dialog.Title>
      <Dialog.Content>
        <Stack space={3}>
          <Text>Update your account information.</Text>
          <TextField label="Name" autoFocus />
          <TextField label="Email" type="email" />
        </Stack>
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary" slot="close">
          Cancel
        </Button>
        <Button variant="primary">Update</Button>
      </Dialog.Actions>
    </Dialog>
  </Dialog.Trigger>
);
