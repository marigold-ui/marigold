import type RAC from 'react-aria-components';
import { MenuItem } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

// Props
// ---------------
type RemovedProps = 'style' | 'className';
export interface MenuItemProps extends Omit<RAC.MenuItemProps, RemovedProps> {
  variant?: 'destructive' | 'default' | (string & {});
  size?: string;
}

// Component
// ---------------
const MenuItemComp = ({ children, variant, size, ...props }: MenuItemProps) => {
  const classNames = useClassNames({ component: 'Menu', variant, size });
  return (
    <MenuItem {...props} className={classNames.item}>
      {children}
    </MenuItem>
  );
};

export { MenuItemComp as MenuItem };
