import { useState } from 'react';
import { Button, Dialog, Menu } from '@marigold/components';

export default () => {
  const [open, setDialogOpen] = useState(false);

  return (
    <>
      <Menu label="Settings">
        <Menu.Item id="save">Save</Menu.Item>
        <Menu.Item
          id="delete"
          variant="destructive"
          onAction={() => setDialogOpen(true)}
        >
          Delete
        </Menu.Item>
      </Menu>
      <Dialog.Trigger open={open} onOpenChange={setDialogOpen}>
        <Dialog role="alertdialog" closeButton>
          <Dialog.Title>Confirm delete</Dialog.Title>
          <Dialog.Content>
            Are you sure you want to delete this event? This action cannot be
            undone.
          </Dialog.Content>
          <Dialog.Actions>
            <Button variant="secondary" slot="close">
              Cancel
            </Button>
            <Button variant="destructive" slot="close">
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Dialog.Trigger>
    </>
  );
};
