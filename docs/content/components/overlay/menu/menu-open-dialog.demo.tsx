import { useState } from 'react';

import {
  Body,
  Button,
  Dialog,
  Footer,
  Header,
  Inline,
  Menu,
  Stack,
  Text,
} from '@marigold/components';

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
        <Dialog closeButton>
          {({ close }) => (
            <Stack space={2}>
              <Header>
                <Dialog.Headline>Confirm delete</Dialog.Headline>
              </Header>
              <Body>
                <Text>Do you really wanna delete this?</Text>
              </Body>
              <Footer>
                <Inline space={4}>
                  <Button size="small" variant="ghost" onPress={close}>
                    Cancel
                  </Button>
                  <Button size="small" variant="primary" onPress={close}>
                    Delete
                  </Button>
                </Inline>
              </Footer>
            </Stack>
          )}
        </Dialog>
      </Dialog.Trigger>
    </>
  );
};
