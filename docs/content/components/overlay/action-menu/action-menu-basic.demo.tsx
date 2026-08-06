import { ActionMenu } from '@marigold/components';

export default () => (
  <ActionMenu
    aria-label="Item actions"
    onAction={action => alert(`Action: ${String(action)}`)}
  >
    <ActionMenu.Item id="edit">Edit</ActionMenu.Item>
    <ActionMenu.Item id="duplicate">Duplicate</ActionMenu.Item>
    <ActionMenu.Item id="archive">Archive</ActionMenu.Item>
    <ActionMenu.Item id="delete" variant="destructive">
      Delete
    </ActionMenu.Item>
  </ActionMenu>
);
