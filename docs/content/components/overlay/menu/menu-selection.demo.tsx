import React from 'react';
import { Menu } from '@marigold/components';

export default () => {
  return (
    <Menu
      label="Choose Your Stand"
      selectionMode="single"
      selectedKeys={['north_stand']}
    >
      <Menu.Item id="north_stand">📣 North Stand (Home Fans)</Menu.Item>
      <Menu.Item id="south_stand">🎶 South Stand (Away Fans)</Menu.Item>
      <Menu.Item id="east_stand">🌅 East Stand (Family Section)</Menu.Item>
      <Menu.Item id="west_stand">🌇 West Stand (VIP Section)</Menu.Item>
    </Menu>
  );
};
