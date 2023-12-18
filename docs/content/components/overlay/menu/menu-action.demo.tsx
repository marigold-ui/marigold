import React from 'react';

import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu label="Choose" onAction={action => alert(`Your action: ${action}`)}>
      <Menu.Item id="edit">Open in editor</Menu.Item>
      <Menu.Item id="settings">Settings</Menu.Item>
      <Menu.Item id="delete">Delete</Menu.Item>
    </Menu>
  );
};
