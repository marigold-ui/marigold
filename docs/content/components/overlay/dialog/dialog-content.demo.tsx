import {
  Button,
  Dialog,
  FieldGroup,
  Stack,
  TextField,
} from '@marigold/components';
import { User } from '@marigold/icons';

export default () => (
  <Dialog.Trigger>
    <Button variant="primary">
      <User /> Edit
    </Button>
    <Dialog>
      <FieldGroup labelWidth="50px">
        <Dialog.Title>Edit user info</Dialog.Title>
        <Dialog.Content>
          <Stack space={3}>
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
      </FieldGroup>
    </Dialog>
  </Dialog.Trigger>
);
