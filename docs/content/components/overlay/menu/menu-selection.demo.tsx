import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu
      label="Hogwarts Houses"
      selectionMode="single"
      selectedKeys={['gryffindor']}
    >
      <Menu.Item id="gryffindor">🦁 Gryffindor</Menu.Item>
      <Menu.Item id="hufflepuff">🦡 Hufflepuff</Menu.Item>
      <Menu.Item id="ravenclaw">🐦‍⬛ Ravenclaw</Menu.Item>
      <Menu.Item id="slytherin">🐍 Slytherin</Menu.Item>
    </Menu>
  );
};
