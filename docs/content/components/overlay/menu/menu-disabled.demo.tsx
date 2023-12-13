import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu label="Choose" disabledKeys={['salad', 'pizza']}>
      <Menu.Item id="burger">🍔 Burger</Menu.Item>
      <Menu.Item id="pizza">🍕 Pizza</Menu.Item>
      <Menu.Item id="salad">🥗 Salad</Menu.Item>
      <Menu.Item id="fries">🍟 Fries</Menu.Item>
    </Menu>
  );
};
