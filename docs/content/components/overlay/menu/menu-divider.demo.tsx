import { Menu } from '@marigold/components';

export default () => (
  <Menu label="Document">
    <Menu.Item id="rename">Rename</Menu.Item>
    <Menu.Item id="duplicate">Duplicate</Menu.Item>
    <Menu.Divider />
    <Menu.Item id="download">Download</Menu.Item>
    <Menu.Item id="share">Share</Menu.Item>
    <Menu.Divider />
    <Menu.Item id="delete" variant="destructive">
      Delete
    </Menu.Item>
  </Menu>
);
