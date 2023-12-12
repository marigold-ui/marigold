import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu label="Open Menu">
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
  );
};
