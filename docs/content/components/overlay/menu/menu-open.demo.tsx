import { useState } from 'react';

import { Button, Menu, Stack } from '@marigold/components';

export default () => {
  const [open, setOpen] = useState(false);
  const handleAction = () => {
    setOpen(!open);
  };

  return (
    <Stack space={4}>
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
