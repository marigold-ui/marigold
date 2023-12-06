import { useState } from 'react';

import { Button, Menu, Stack } from '@marigold/components';

export default () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Stack space={4}>
      <Button variant="primary" onPress={() => setOpen(!open)}>
        Open Menu with me
      </Button>
      <hr />
      <Menu label="Menu" onOpenChange={handleOpen} open={open}>
        <Menu.Item id="one">Settings</Menu.Item>
        <Menu.Item id="two">Preferences</Menu.Item>
        <Menu.Item id="three">Save</Menu.Item>
      </Menu>
    </Stack>
  );
};
