import { useState } from 'react';
import { Button, Dialog, Menu } from '@marigold/components';

export default () => {
  const [open, setDialogOpen] = useState(false);
  const handleAction = (action: 'save' | 'delete') => {
    switch (action) {
      case 'save':
        alert('saved!');
        break;
      case 'delete':
        setDialogOpen(true);
        break;
      default:
        throw new Error(`Unhandled action "${action}"!`);
    }
  };

  return (
    <>
      <Menu onAction={handleAction} label="Settings">
        <Menu.Item id="save">Save</Menu.Item>
        <Menu.Item id="delete">Delete</Menu.Item>
      </Menu>
      <Dialog.Trigger open={open} onOpenChange={setDialogOpen}>
        <Dialog role="alertdialog" closeButton>
          {({ close }) => (
            <>
              <Dialog.Title>Confirm delete</Dialog.Title>
              <Dialog.Content>
                Are you sure you want to delete this event? This action cannot
                be undone.
              </Dialog.Content>
              <Dialog.Actions>
                <Dialog.Cancel />
                <Button variant="primary" onPress={close}>
                  Delete
                </Button>
              </Dialog.Actions>
            </>
          )}
        </Dialog>
      </Dialog.Trigger>
    </>
  );
};
