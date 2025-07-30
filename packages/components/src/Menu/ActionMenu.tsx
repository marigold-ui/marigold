import { Menu } from './Menu';
import type { MenuProps } from './Menu';

export type ActionMenuProps = Omit<MenuProps, 'label'>;

export const ActionMenu = ({ children, ...props }: ActionMenuProps) => (
  <Menu
    {...props}
    label={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={12} cy={12} r={1} />
        <circle cx={12} cy={5} r={1} />
        <circle cx={12} cy={19} r={1} />
      </svg>
    }
  >
    {children}
  </Menu>
);

ActionMenu.Item = Menu.Item;
ActionMenu.Section = Menu.Section;
