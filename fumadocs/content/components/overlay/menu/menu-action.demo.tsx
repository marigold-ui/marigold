import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu
      label="Actions"
      onAction={action => alert(`Your action: ${String(action)}`)}
    >
      <Menu.Item id="edit">Open in editor</Menu.Item>
      <Menu.Item id="settings">Settings</Menu.Item>
      <Menu.Item id="delete" variant="destructive">
        Delete
      </Menu.Item>
    </Menu>
  );
};
