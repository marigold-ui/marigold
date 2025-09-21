import { useState } from 'react';
import { ConfirmationDialog, Menu } from '@marigold/components';

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
      <ConfirmationDialog
        title="Confirm delete"
        actionLabel="Delete"
        closeButton
        open={open}
        onOpenChange={setDialogOpen}
      >
        Are you sure you want to delete this event? This action cannot be
        undone.
      </ConfirmationDialog>
    </>
  );
};
