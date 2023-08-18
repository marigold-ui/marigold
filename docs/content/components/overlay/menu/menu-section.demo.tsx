import React from 'react';

import { Button, Menu } from '@marigold/components';

export default () => {
  return (
    <Menu.Trigger>
      <Button variant="menu" size="small">
        Open Menu
      </Button>
      <Menu aria-label="Menu with sections">
        <Menu.Section title="Food">
          <Menu.Item key="burger">🍔 Burger</Menu.Item>
          <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
          <Menu.Item key="fries">🍟 Fries</Menu.Item>
        </Menu.Section>
        <Menu.Section title="Fruits">
          <Menu.Item key="apple">🍎 Apple</Menu.Item>
          <Menu.Item key="banana">🍌 Banana</Menu.Item>
          <Menu.Item key="strawberry">🍓 Strawberry</Menu.Item>
        </Menu.Section>
      </Menu>
    </Menu.Trigger>
  );
};
