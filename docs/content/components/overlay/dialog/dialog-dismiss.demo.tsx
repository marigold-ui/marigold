import { Button, Dialog } from '@marigold/components';

export default () => (
  <Dialog.Trigger dismissable={false}>
    <Button variant="primary">Duplicate</Button>
    <Dialog closeButton size="small">
      <Dialog.Title>Duplicate event</Dialog.Title>
      <Dialog.Content>
        Duplicating this event will create a new event with all the original
        details pre-filled, except for the date.
      </Dialog.Content>
      <Dialog.Actions>
        <Dialog.Cancel />
        <Button variant="primary">Duplicate</Button>
      </Dialog.Actions>
    </Dialog>
  </Dialog.Trigger>
);
