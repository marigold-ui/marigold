import { Button, Dialog } from '@marigold/components';

const ValidDialog = () => (
  <Dialog.Trigger>
    <Button>Open</Button>
    <Dialog>
      <Dialog.Title>Confirm</Dialog.Title>
      <Dialog.Content>
        <p>Are you sure?</p>
      </Dialog.Content>
      <Dialog.Actions>
        <Button slot="close">Cancel</Button>
        <Button variant="primary">OK</Button>
      </Dialog.Actions>
    </Dialog>
  </Dialog.Trigger>
);

export default ValidDialog;
