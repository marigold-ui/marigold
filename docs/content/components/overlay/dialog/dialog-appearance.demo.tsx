import type { DialogProps } from '@marigold/components';
import { Button, Dialog } from '@marigold/components';

export default (props: DialogProps) => (
  <Dialog.Trigger>
    <Button variant="primary">Duplicate</Button>
    <Dialog {...props}>
      <Dialog.Title>Duplicate event</Dialog.Title>
      <Dialog.Content>
        Duplicating this event will create a new event with all the original
        details pre-filled, except for the date.
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Duplicate</Button>
      </Dialog.Actions>
    </Dialog>
  </Dialog.Trigger>
);
