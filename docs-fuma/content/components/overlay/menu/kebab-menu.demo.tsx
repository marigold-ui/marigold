'use client';

import { ActionMenu } from '@marigold/components';

export default () => (
  <ActionMenu onAction={action => alert(`Action: ${action}`)}>
    <ActionMenu.Item id="edit">Open in editor</ActionMenu.Item>
    <ActionMenu.Item id="settings">Settings</ActionMenu.Item>
    <ActionMenu.Item id="delete" variant="destructive">
      Delete
    </ActionMenu.Item>
  </ActionMenu>
);
