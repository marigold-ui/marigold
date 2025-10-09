import { Ellipsis } from 'packages/components/src/icons/Ellipsis';
import { Menu } from './Menu';
import type { MenuProps } from './Menu';

export type ActionMenuProps = Omit<MenuProps, 'label'>;

export const ActionMenu = ({ children, ...props }: ActionMenuProps) => (
  <Menu {...props} label={<Ellipsis />}>
    {children}
  </Menu>
);

ActionMenu.Item = Menu.Item;
ActionMenu.Section = Menu.Section;
