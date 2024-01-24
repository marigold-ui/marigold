import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu label="Open Menu">
      <Menu.Section title="Food">
        <Menu.Item id="burger">🍔 Burger</Menu.Item>
        <Menu.Item id="pizza">🍕 Pizza</Menu.Item>
        <Menu.Item id="fries">🍟 Fries</Menu.Item>
      </Menu.Section>
      <Menu.Section title="Fruits">
        <Menu.Item id="apple">🍎 Apple</Menu.Item>
        <Menu.Item id="banana">🍌 Banana</Menu.Item>
        <Menu.Item id="strawberry">🍓 Strawberry</Menu.Item>
      </Menu.Section>
    </Menu>
  );
};
