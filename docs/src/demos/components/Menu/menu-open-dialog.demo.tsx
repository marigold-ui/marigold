import { useState } from 'react';
import {
  Body,
  Button,
  Dialog,
  Footer,
  Header,
  Headline,
  Inline,
  Menu,
  Stack,
  Text,
} from '@marigold/components';

export const OpenDialogFromMenu = () => {
  const [open, setOpen] = useState(false);
  const handleAction = (action: string) => {
    switch (action) {
      case 'two':
        setOpen(!open);
        break;
      case 'one':
        break;
      default:
        throw new Error(`Unhandled action "${action}"!`);
    }
  };
  return (
    <>
      <Menu.Trigger>
        <Button variant="menu" size="small">
          Settings
        </Button>
        <Menu onAction={handleAction}>
          <Menu.Item key="one">Save</Menu.Item>
          <Menu.Item key="two">Delete</Menu.Item>
        </Menu>
      </Menu.Trigger>
      <Dialog.Controller onOpenChange={o => setOpen(o)}>
        {open && (
          <Dialog closeButton>
            {({ close, titleProps }) => (
              <Stack space="medium">
                <Header>
                  <Headline {...titleProps}>Confirm delete</Headline>
                </Header>
                <Body>
                  <Text>Do you really wanna delete this?</Text>
                </Body>
                <Footer>
                  <Inline space="medium">
                    <Button size="small" variant="ghost" onPress={close}>
                      Abbrechen
                    </Button>
                    <Button size="small" variant="primary">
                      Delete
                    </Button>
                  </Inline>
                </Footer>
              </Stack>
            )}
          </Dialog>
        )}
      </Dialog.Controller>
    </>
  );
};
