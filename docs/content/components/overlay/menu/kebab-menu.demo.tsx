import { ActionMenu, Menu } from '@marigold/components';

export default () => {
  return (
    <ActionMenu onAction={action => alert(`Action: ${action}`)}>
      <Menu.Item id="edit">Open in editor</Menu.Item>
      <Menu.Item id="settings">Settings</Menu.Item>
      <Menu.Item id="delete">Delete</Menu.Item>
    </ActionMenu>
  );
};
