import { useState } from 'react';
import { Button, Dialog, Menu, TextArea } from '@marigold/components';

export default () => {
  const [open, setDialogOpen] = useState(false);

  const handleAction = (action: 'profile' | 'feedback') => {
    switch (action) {
      case 'profile':
        alert('Profile opened!');
        break;
      case 'feedback':
        setDialogOpen(true);
        break;
      default:
        throw new Error(`Unhandled action "${action}"!`);
    }
  };

  return (
    <>
      <Menu onAction={handleAction} label="User Menu">
        <Menu.Item id="profile">View Profile</Menu.Item>
        <Menu.Item id="feedback">Send Feedback</Menu.Item>
      </Menu>
      <Dialog
        size="xsmall"
        closeButton
        open={open}
        onOpenChange={setDialogOpen}
      >
        {({ close }) => (
          <>
            <Dialog.Title>Send Feedback</Dialog.Title>
            <Dialog.Content>
              <TextArea placeholder="Your feedback..." rows={4} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={close}>Cancel</Button>
              <Button variant="primary" onPress={close}>
                Submit
              </Button>
            </Dialog.Actions>
          </>
        )}
      </Dialog>
    </>
  );
};
