import { Menu, TextValue } from '@marigold/components';

export default () => (
  <Menu label="Actions">
    <Menu.Item id="view">
      <TextValue>View details</TextValue>
    </Menu.Item>
    <Menu.Item id="edit">
      <TextValue>Edit</TextValue>
    </Menu.Item>
    <Menu.Item id="duplicate">
      <TextValue>Duplicate</TextValue>
    </Menu.Item>
  </Menu>
);
