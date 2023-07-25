import { Button, Menu } from '@marigold/components';

export default () => {
  return (
    <Menu.Trigger disabled>
      <Button variant="menu" size="small">
        Choose Menu
      </Button>
      <Menu>
        <Menu.Item key="burger">🍔 Burger</Menu.Item>
        <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
        <Menu.Item key="salad">🥗 Salad</Menu.Item>
        <Menu.Item key="fries">🍟 Fries</Menu.Item>
      </Menu>
    </Menu.Trigger>
  );
};
