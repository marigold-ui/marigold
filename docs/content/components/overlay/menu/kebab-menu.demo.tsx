import { ActionMenu, Menu } from '@marigold/components';
import React from 'react';

export default () => {
  return (
    <ActionMenu onAction={action => alert(`Action: ${action}`)}>
      <Menu.Item key="edit">Open in editor</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </ActionMenu>
  );
};
