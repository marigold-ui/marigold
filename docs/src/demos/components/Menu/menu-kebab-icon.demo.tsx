import { Button, Menu } from '@marigold/components';
import { SettingDots } from '@marigold/icons';

export const MenuKebab = () => {
  return (
    <>
      <Menu.Trigger>
        <Button variant="menu" size="small">
          <SettingDots />
        </Button>
        <Menu>
          <Menu.Item key="edit">Edit</Menu.Item>
          <Menu.Item key="duplicate">Duplicate</Menu.Item>
          <Menu.Item key="delete">Delete</Menu.Item>
        </Menu>
      </Menu.Trigger>
    </>
  );
};
