import { Button, Dialog } from '@marigold/components';

const DialogOpen = () => (
  <Dialog.Trigger defaultOpen>
    <Button>Open</Button>
    <Dialog>
      <Dialog.Title>Portal Test</Dialog.Title>
      <Dialog.Content>
        <p>
          This content should be detected even though it renders in a portal.
        </p>
      </Dialog.Content>
      <Dialog.Actions>
        <Button slot="close">Close</Button>
      </Dialog.Actions>
    </Dialog>
  </Dialog.Trigger>
);

export default DialogOpen;
