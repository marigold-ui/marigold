import { Divider, Menu } from '@marigold/components';

export default () => (
  <Menu label="Only a Menu">
    <Menu.Item id={1}>
      Item 1<Divider variant="section" />
    </Menu.Item>
    <Menu.Item id={2}>
      Item 2 <Divider variant="section" />
    </Menu.Item>
    <Menu.Item id={3}>
      Item 3<Divider variant="section" />
    </Menu.Item>
  </Menu>
);
