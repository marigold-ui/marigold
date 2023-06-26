import { Menu, Button, Stack } from '@marigold/components';
import { useState } from 'react';

export const OpenMenuRemotely = () => {
  const [open, setOpen] = useState(false);
  const handleAction = () => {
    setOpen(!open);
  };

  return (
    <Stack space="medium">
      <Button variant="primary" onPress={() => setOpen(!open)}>
        Open Menu with me
      </Button>
      <hr />
      <Menu.Trigger open={open}>
        <Button variant="menu" size="small">
          Menu
        </Button>
        <Menu onAction={handleAction}>
          <Menu.Item key="one">Settings</Menu.Item>
          <Menu.Item key="two">Preferences</Menu.Item>
          <Menu.Item key="three">Save</Menu.Item>
        </Menu>
      </Menu.Trigger>
    </Stack>
  );
};
