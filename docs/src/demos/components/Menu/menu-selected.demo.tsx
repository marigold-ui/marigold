import React, { useState } from 'react';
import { Button, Menu, Text } from '@marigold/components';

export const MenuSelected = () => {
  const [selected, setSelected] = useState<string | number>('');
  return (
    <>
      <Menu.Trigger>
        <Button variant="menu" size="small">
          Choose Menu
        </Button>
        <Menu onSelect={setSelected}>
          <Menu.Item key="burger">🍔 Burger</Menu.Item>
          <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
          <Menu.Item key="salad">🥗 Salad</Menu.Item>
          <Menu.Item key="fries">🍟 Fries</Menu.Item>
        </Menu>
      </Menu.Trigger>
      <hr />
      <Text>selected: {selected}</Text>
    </>
  );
};
