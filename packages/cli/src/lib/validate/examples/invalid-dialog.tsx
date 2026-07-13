import { Button, Dialog } from '@marigold/components';

const InvalidDialog = () => (
  <Dialog.Trigger>
    <Button>Open</Button>
    <Dialog>
      <p>No sub-components at all!</p>
    </Dialog>
  </Dialog.Trigger>
);

export default InvalidDialog;
