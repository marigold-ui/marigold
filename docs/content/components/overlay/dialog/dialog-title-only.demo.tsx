import { Button, Dialog } from '@marigold/components';

export default () => (
  <Dialog aria-label="delete event">
    <Dialog.Title>Are you sure you want to delete this event?</Dialog.Title>
    <Dialog.Actions>
      <Dialog.Cancel />
      <Button variant="primary">Delete</Button>
    </Dialog.Actions>
  </Dialog>
);
