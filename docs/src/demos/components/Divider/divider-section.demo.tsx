import { Divider, Menu } from '@marigold/components';

export const DividerSection = () => (
  <Menu aria-label="Only a Menu">
    <Menu.Item key={1}>
      Item 1
      <Divider variant="section" />
    </Menu.Item>
    <Menu.Item key={2}>
      Item 2
      <Divider variant="section" />
    </Menu.Item>
    <Menu.Item key={3}>Item 3</Menu.Item>
  </Menu>
);
