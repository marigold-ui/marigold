import React from 'react';
import { Button, Menu } from '@marigold/components';

export default () => {
  return (
    <Menu.Trigger>
      <Button variant="menu" size="small">
        Menu
      </Button>
      <Menu onAction={action => alert(`Your action: ${action}`)}>
        <Menu.Item key="edit">Open in editor</Menu.Item>
        <Menu.Item key="settings">Settings</Menu.Item>
        <Menu.Item key="delete">Delete</Menu.Item>
      </Menu>
    </Menu.Trigger>
  );
};
