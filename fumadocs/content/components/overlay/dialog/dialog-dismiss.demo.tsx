import { Button, Dialog } from '@marigold/components';

export default () => (
  <Dialog.Trigger dismissable>
    <Button variant="primary">Duplicate</Button>
    <Dialog closeButton size="small">
      <Dialog.Title>Duplicate event</Dialog.Title>
      <Dialog.Content>
        Duplicating this event will create a new event with all the original
        details pre-filled, except for the date.
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary" slot="close">
          Cancel
        </Button>
        <Button variant="primary">Duplicate</Button>
      </Dialog.Actions>
    </Dialog>
  </Dialog.Trigger>
);
