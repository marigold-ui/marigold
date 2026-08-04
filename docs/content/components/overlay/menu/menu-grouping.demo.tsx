import { Divider, Menu } from '@marigold/components';

export default () => (
  <Menu label="Document">
    <Menu.Section title="Edit">
      <Menu.Item id="rename">Rename</Menu.Item>
      <Menu.Item id="duplicate">Duplicate</Menu.Item>
    </Menu.Section>
    <Menu.Section title="Share">
      <Menu.Item id="invite">Invite people</Menu.Item>
      <Menu.Item id="copy-link">Copy link</Menu.Item>
    </Menu.Section>
    <Divider />
    <Menu.Item id="delete" variant="destructive">
      Delete
    </Menu.Item>
  </Menu>
);
