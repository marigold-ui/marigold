import { useState } from 'react';
import { Button, Dialog, Menu, TextField } from '@marigold/components';

export default () => {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Menu label="Actions">
        <Menu.Item id="rename" onAction={() => setRenameOpen(true)}>
          Rename…
        </Menu.Item>
        <Menu.Item
          id="delete"
          variant="destructive"
          onAction={() => setDeleteOpen(true)}
        >
          Delete
        </Menu.Item>
      </Menu>

      {/* Collect input before acting */}
      <Dialog.Trigger open={renameOpen} onOpenChange={setRenameOpen}>
        <Dialog size="xsmall" closeButton>
          <Dialog.Title>Rename document</Dialog.Title>
          <Dialog.Content>
            <TextField label="Name" defaultValue="Untitled" />
          </Dialog.Content>
          <Dialog.Actions>
            <Button variant="secondary" slot="close">
              Cancel
            </Button>
            <Button variant="primary" slot="close">
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Dialog.Trigger>

      {/* Confirm a destructive action */}
      <Dialog.Trigger open={deleteOpen} onOpenChange={setDeleteOpen}>
        <Dialog role="alertdialog" closeButton>
          <Dialog.Title>Delete document</Dialog.Title>
          <Dialog.Content>
            Are you sure you want to delete this document? This action cannot be
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
